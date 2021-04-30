import {
  ClientsTable,
  LinksTable,
  OrdersTable,
  FeaturedTable,
} from '../../modules/db-adapter';
import {
  createDeliveryTemplate,
  createOnboardingTemplate,
  createReminderTemplate,
  filterClientFields,
  filterFeaturedClientFields,
  translateClientFields,
} from './utils';
import { deliveryEmail, onboardingEmail } from '../../modules/email';
import { sendSmsNotifications } from '../../utils/phone';

async function createClient(clientDetails: {}) {
  const clientInfo = translateClientFields(clientDetails);

  try {
    const clientRecord = await ClientsTable.createRow(clientInfo);
    const client = filterClientFields(clientRecord);

    return client;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't create a new client\n ${error.message}`;
    return { errorMessage, code: 500 };
  }
}

enum Format {
  sms = 'SMS',
  email = 'EMAIL',
}

enum Intent {
  onboarding = 'ONBOARDING',
  reminder = 'REMINDER',
  delivery = 'DELIVERY',
}

// We send a message for each step of the process as follows
// - Order confirmation when the order has been processed
// - Reminder the evening before the shooting
// - Photos and link to the edited photos
async function notifyClient(
  clientId,
  notificationOpts: { format: Format; type: Intent },
) {
  const { format = Format.email, type = Intent.onboarding } = notificationOpts;

  try {
    const { fields: client } = await ClientsTable.getRow(clientId);
    const [orderId] = client['Order'];
    const { fields: order } = await OrdersTable.getRow(orderId);

    switch (format) {
      case Format.email:
        {
          // send email message with the right template
          if (type === Intent.onboarding) {
            const emailTemplate = createOnboardingTemplate(client, order);
            await onboardingEmail.send(emailTemplate);
          } else if (type === Intent.delivery) {
            // Get the url for the photos to be sent
            const [linksId] = order['Links'];
            const { fields: links } = await LinksTable.getRow(linksId);

            const emailTemplate = createDeliveryTemplate(client, links);
            await deliveryEmail.send(emailTemplate);
          }
        }
        break;

      case Format.sms:
        {
          // Send sms with the right template
          if (type === Intent.reminder) {
            const smsTemplate = createReminderTemplate(client, order);
            await sendSmsNotifications([smsTemplate]);
          }
        }
        break;
      default: {
        throw { errorMessage: `${format} is not a valid messaging format` };
      }
    }
    return undefined;
  } catch (error) {
    console.error(error);
    const errorMessage = `Coulnd't send notification to client ${clientId}\n ${error.message}`;
    throw { errorMessage, code: 500 };
  }
}

async function getAllClients() {
  try {
    const clientRecords = await ClientsTable.all();
    const clients = clientRecords.map(filterClientFields);
    return clients;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't retrieve clients \n ${error.message}`;
    throw { errorMessage, code: 500 };
  }
}

async function getFeaturedClients(): Promise<Array<any>> {
  try {
    const featuredClientRecords = await FeaturedTable.all();
    const featuredClients = featuredClientRecords.map(
      filterFeaturedClientFields,
    );
    return featuredClients;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't retrieve featured clients \n ${error.message}`;
    throw { errorMessage, code: 500 };
  }
}

async function getClient(clientId) {
  try {
    const clientRecord = await ClientsTable.getRow(clientId);
    const client = filterClientFields(clientRecord);
    return client;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't retrieve client ${clientId} \n ${error.message}`;
    throw { errorMessage, code: 500 };
  }
}

async function updateClient(clientId: string, changes) {
  const update = { id: clientId, fields: translateClientFields(changes) };

  try {
    const [updatedClient] = await ClientsTable.updateRow([update]);
    const client = filterClientFields(updatedClient);
    return client;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't update client ${clientId}\n ${error.message}`;
    throw { errorMessage };
  }
}

async function deleteClients(ids: string[]) {
  try {
    await ClientsTable.deleteRow(...ids);
    return undefined;
  } catch (error) {
    console.error(error);
    throw { errorMessage: error.message, code: 500 };
  }
}

export {
  createClient,
  notifyClient,
  getAllClients,
  getFeaturedClients,
  getClient,
  updateClient,
  deleteClients,
};
