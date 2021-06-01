import type { NextApiRequest, NextApiResponse } from 'next';
import type { Fields } from '@srcTypes/api.types';
import type { MessageSendingResponse } from 'postmark/dist/client/models';
import { success, failure } from './utils/request';
import { LinksTable, ClientsTable, OrdersTable } from './modules/db-adapter';
import Email, { EmailOptions } from './modules/email';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const fulfill = success(res);
  const reject = failure(res);

  switch (method) {
    case 'POST': {
      return sendEmailsWithPhotos().then(fulfill, reject);
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}

interface OutboundEmailInfo {
  id: string;
  name: string;
  email: string;
  fileUrl: string;
  locale: string;
}

interface FailedEmailInfo {
  recipient: string | undefined;
  errorCode: number;
  errorMessage: string;
}

async function sendEmailsWithPhotos() {
  try {
    const linkRecords = await LinksTable.all();
    const photosToSendPromise = await linkRecords.map(getClientInfo);
    const photosToSend = await Promise.all(photosToSendPromise);

    await sendEmails(photosToSend);

    return { message: 'Send Emails to Clients' };
  } catch (error) {
    console.error(error);
    throw { errorMessage: '', code: 500 };
  }
}

async function sendEmails(emails: OutboundEmailInfo[]) {
  // Save ids, emails for verifying sent status later
  const emailCache = new Map(emails.map((row) => [row.email, row.id]));
  const templatedEmails = emails.map(constructTemplate) as EmailOptions[];

  const email = new Email('admin', 'sendoff', 'sendoffs');
  const response = (await email.send(
    templatedEmails,
  )) as MessageSendingResponse[];
  const allSent = !response.find((res) => res.ErrorCode !== 0);

  if (allSent) {
    const fieldsToUpdate = emails.map((row) => row.id).map(setMessageAsSent);
    await LinksTable.updateRow(fieldsToUpdate);
    return {
      error: null,
      success: true,
    };
  } else {
    // Update only fields of succeeded emails
    const sentEmails = response.filter(emailDelivered);
    const fieldsToUpdate = sentEmails.map(getId).map(setMessageAsSent);
    await LinksTable.updateRow(fieldsToUpdate);

    const failedEmails = response.filter(emailFailed).map(getErrorInfo);

    return {
      error: createErrorReport(failedEmails),
      success: null,
    };
  }

  function getId({ To }: MessageSendingResponse) {
    if (!To) throw 'Couldn‘t get ID, recipient is not defined';

    const id = emailCache.get(To);
    return id as string;
  }
}

async function getClientInfo(record: Airtable.Record<Fields['Links']>) {
  const [orderId] = record.fields['Order'];

  // Get order Info
  const orderInfo = await OrdersTable.getRow(orderId);
  const [clientId] = orderInfo.fields['Clients'];

  const clientInfo = await ClientsTable.getRow(clientId);
  return {
    id: record.id,
    name: clientInfo.fields['Client'],
    email: clientInfo.fields['Email'],
    locale: clientInfo.fields['Language'],
    fileUrl: record.fields['Photos'],
  };
}

function createErrorReport(errorList: FailedEmailInfo[]) {
  // Save the range of error codes
  const errorCodes = new Set<number>();
  errorList.forEach(({ errorCode }) => {
    errorCodes.add(errorCode);
  });

  // Create a report for each error code
  Array.from(errorCodes).forEach((code: number) => {
    const matchedErrors = errorList.filter(
      ({ errorCode }) => errorCode === code,
    );
    const errorCount = matchedErrors.length;
    const { recipient, errorMessage } = matchedErrors[0];

    const error = `${code} | Email to ${recipient}${
      errorCount > 1 ? ` and ${errorCount}` : ''
    } failed: ${errorMessage}.`;

    console.error(error);
  });

  return errorList.length + 'failed emails';
}

function emailDelivered(response: MessageSendingResponse) {
  return response.ErrorCode === 0;
}

function emailFailed(response: MessageSendingResponse) {
  return response.ErrorCode !== 0;
}

function getErrorInfo({
  ErrorCode,
  Message,
  To,
}: MessageSendingResponse): FailedEmailInfo {
  return {
    recipient: To,
    errorCode: ErrorCode,
    errorMessage: Message,
  };
}

function constructTemplate({
  email,
  name,
  fileUrl,
  locale,
}: OutboundEmailInfo): EmailOptions {
  return {
    To: email,
    TemplateModel: {
      name: name,
      fileUrl: fileUrl,
    },
    locale: locale || 'fr',
  };
}

function setMessageAsSent(id: string) {
  return {
    id,
    fields: {
      Status: 'Sent',
    },
  };
}
