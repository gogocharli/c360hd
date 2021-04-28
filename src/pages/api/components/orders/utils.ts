import { camelCase, capitalCase } from 'change-case';
import { ClientsTable, OrdersTable, RepsTable } from '../../modules/db-adapter';
import {
  filterRecordInfo,
  recordFilterOpts,
  RecordMap,
  requestTranslateOpts,
  translateRequest,
} from '../../utils/filter-record';
import { filterAgentInfo } from '../agents/utils';
import { filterClientInfo } from '../clients/utils';

async function getRepInfo(number: string) {
  const repsRecords = await RepsTable.all();
  const matchedRep = repsRecords
    .filter((rep) => {
      return rep.fields['RepID'] === number;
    })
    .map((rep) => {
      return {
        key: rep.id,
        name: rep.fields['Name'],
        phoneNumber: rep.fields['Number'],
      };
    });
  return matchedRep[0];
}

function createClientInfo(order) {
  return {
    Client: order.businessName,
    Decider: order.decisionMaker,
    Address: order.address,
    'Primary Contact': order.primaryNumber,
    'Secondary Contact': order.secondaryNumber,
    Email: order.email,
    Language: order.lang.toUpperCase(),
  };
}

function createOrderInfo(order, clientId: string, repInfo) {
  return {
    'Order Number': order.orderNumber,
    Date: order.date,
    Time: order.humanTime,
    'Product Name': order.product.toUpperCase(),
    'Rep ID': [repInfo.key],
    'Additional Info': order.addInfo,
    Clients: [clientId],
    Status: order.paid ? 'Confirmed' : 'Waiting Payment',
    Deposit: order.paid,
    'Payment Method': 'Card',
  };
}

function createEmailTemplate(order, repInfo) {
  return {
    To: order.email,
    TemplateModel: {
      name: order.decisionMaker,
      company: order.company,
      orderNumber: order.orderNumber,
      time: order.humanTime,
      date: order.date,
      storeURL: `https://c360hd.com/${order.lang.toLowerCase()}-ca/store`,
      repInfo,
    },
    locale: order.lang,
  };
}

interface orderDateTime {
  Date: string;
  Time: string;
  appointment?: {};
}

/**
 * Aggregates order date and time into a single object
 *
 * @param fields
 * @param apiReturnValues
 * @see 'functions/utils/filter-record'
 */
function reduceOrderResponse(fields: {}, apiReturnValues: RecordMap) {
  return function <T extends orderDateTime>(obj: T, oldPropName: string) {
    const newPropName =
      apiReturnValues?.[oldPropName] ?? camelCase(oldPropName);

    if (['Date', 'Time'].includes(oldPropName)) {
      obj.appointment = obj.appointment ? obj.appointment : {};
      obj.appointment[newPropName] = fields[oldPropName];
    } else {
      obj[newPropName] = fields[oldPropName];
    }
    return obj;
  };
}

function reduceOrderRequest(fields: {}, apiReturnValues: RecordMap) {
  return function <T extends orderDateTime>(obj: T, oldPropName: string) {
    if (oldPropName === 'appointment') {
      obj['Date'] = fields['appointment'].date;
      obj['Time'] = fields['appointment'].time;
      return obj;
    }

    const newPropName =
      apiReturnValues?.[oldPropName] ?? capitalCase(oldPropName);
    obj[newPropName] = fields[oldPropName];

    return obj;
  };
}

// Represents a map between the current values returned by the DB
// and the ones we want to present to the API consumers
const orderAliasMap: RecordMap = {
  'Order Number': 'number',
  'Rep ID': 'AgentID',
};

const defaultOrderFields = [
  'Order Number',
  'Date',
  'Time',
  'Payment',
  'Product Name',
  'Status',
];

/**
 * Alias the names of the api return values and filter the selected fields
 * @param filterOpts
 */
function filterOrderInfo(filterOpts?: recordFilterOpts) {
  return filterRecordInfo({
    aliasMap: orderAliasMap,
    reducerFn: reduceOrderResponse,
    selectedFields: defaultOrderFields,
    ...filterOpts,
  });
}

const filterOrderFields = filterOrderInfo();

/**
 * Alias the names of the API consumer requests to the DB Schema
 */
function translateOrderRequest(options?: requestTranslateOpts) {
  return translateRequest({
    aliasMap: orderAliasMap,
    reducerFn: reduceOrderRequest,
    ...options,
  });
}

const translateOrderFields = translateOrderRequest();

/**
 * Gets relevant info for the agent who made the sale
 */
function getAgentFromOrder({ fields }: Airtable.Record<{}>): Promise<{}> {
  const [agentId] = fields['Rep ID'];
  const selectedFields = ['RepID', 'Name'];
  const agent = RepsTable.getRow(agentId).then(
    filterAgentInfo({ selectedFields }),
  );
  return agent;
}

/**
 * Retrieves relevant info for the client who passed the order
 */
function getClientFromOrder({ fields }: Airtable.Record<{}>): Promise<{}> {
  const [clientId] = fields['Clients'];
  const selectedFields = [
    'Client',
    'Address',
    'Primary Contact',
    'Secondary Contact',
    'Email',
  ];
  const client = ClientsTable.getRow(clientId).then(
    filterClientInfo({ selectedFields }),
  );
  return client;
}

function fetchLinkedRecords(orderRecord: Airtable.Record<{}>) {
  const clientPromise = getClientFromOrder(orderRecord);
  const agentPromise = getAgentFromOrder(orderRecord);

  return Promise.all([clientPromise, agentPromise]);
}

async function includeLinkedRecords(order, orderRecord: Airtable.Record<{}>) {
  const [Client, Agent] = await fetchLinkedRecords(orderRecord);
  return { ...order, Client, Agent };
}

async function findOrderFromNumber(orderNumber: string) {
  const [order] = await OrdersTable.all({
    filterField: {
      field: 'Order Number',
      query: orderNumber,
    },
  });

  return order;
}

export {
  getRepInfo,
  createClientInfo,
  createEmailTemplate,
  createOrderInfo,
  findOrderFromNumber,
  filterOrderInfo,
  filterOrderFields,
  translateOrderRequest,
  translateOrderFields,
  includeLinkedRecords,
};
