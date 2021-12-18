import type { Fields, Order, OrderStatus, Products } from '@srcTypes/api.types';
import { camelCase, capitalCase } from 'change-case';
import { ClientsTable, OrdersTable, RepsTable } from '../../modules/db-adapter';
import {
  filterRecordInfo,
  recordFilterOpts,
  RecordMap,
  ReducerFn,
  requestTranslateOpts,
  translateRequest,
} from '../../utils/filter-record';
import { filterAgentInfo } from '../agents/utils';
import { filterClientInfo } from '../clients/utils';

interface RepInfo {
  key: string;
  email: string;
  name: string;
  phoneNumber: string;
}

async function getRepInfo(number: string): Promise<RepInfo> {
  const repsRecords = await RepsTable.all();
  const matchedRep = repsRecords
    .filter((rep) => {
      return rep.fields['RepID'] === number;
    })
    .map((rep) => {
      return {
        key: rep.id,
        email: rep.fields['Email'],
        name: rep.fields['Name'],
        phoneNumber: rep.fields['Primary Contact'],
      };
    });
  return matchedRep[0];
}

function createClientInfo(order: Order) {
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

function createOrderInfo(order: Order, clientId: string, repInfo: RepInfo) {
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

function createEmailTemplate(order: Order, repInfo: RepInfo) {
  return {
    To: order.email,
    cc: repInfo.email ?? '',
    TemplateModel: {
      name: order.decisionMaker,
      company: order.businessName,
      orderNumber: order.orderNumber,
      time: order.humanTime,
      date: order.date,
      storeURL: `https://lyncxs.com/pay?order=${order.orderNumber}`,
      repInfo,
    },
    locale: order.lang,
  };
}

export interface OrderResponse {
  number: string;
  date?: string;
  time?: string;
  appointment: {
    date?: string;
    time?: string;
  };
  productName: Products;
  status: OrderStatus;
  AgentID?: string;
}

type OrderFields = Fields['Orders'];

/**
 * Aggregates order date and time into a single object
 */
const reduceOrderResponse: ReducerFn<OrderFields, OrderResponse> = (
  fields,
  apiReturnValues,
) => {
  return function (
    obj,
    oldPropName,
  ): Partial<Omit<OrderResponse, 'date' | 'time'>> {
    const newPropName = (apiReturnValues?.[oldPropName] ??
      camelCase(oldPropName)) as keyof OrderResponse;

    if (
      (oldPropName == 'Date' || oldPropName == 'Time') &&
      (newPropName == 'date' || newPropName == 'time')
    ) {
      obj.appointment = obj.appointment ? obj.appointment : {};
      obj.appointment[newPropName] = fields[oldPropName];
    } else {
      //@ts-ignore not sure which type is cast to 'never' here
      obj[newPropName] = fields[oldPropName];
    }
    return obj;
  };
};

export const reduceOrderRequest: ReducerFn<OrderResponse, OrderFields> = (
  fields,
  apiReturnValues,
) => {
  return function (obj, oldPropName) {
    if (oldPropName === 'appointment') {
      obj['Date'] = fields['appointment'].date;
      obj['Time'] = fields['appointment'].time;
      return obj;
    }

    const newPropName = (apiReturnValues?.[oldPropName] ??
      capitalCase(oldPropName)) as keyof OrderFields;

    // @ts-ignore
    obj[newPropName] = fields[oldPropName];

    return obj;
  };
};

// Represents a map between the current values returned by the DB
// and the ones we want to present to the API consumers
const orderAliasMap: RecordMap<OrderFields, OrderResponse> = {
  'Order Number': 'number',
  'Rep ID': 'AgentID',
};

const defaultOrderFields = [
  'Order Number',
  'Date',
  'Time',
  'Paid',
  'Product Name',
  'Status',
] as const;

/**
 * Alias the names of the api return values and filter the selected fields
 * @param filterOpts
 */
function filterOrderInfo(
  filterOpts?: recordFilterOpts<OrderFields, OrderResponse>,
) {
  return filterRecordInfo({
    aliasMap: orderAliasMap,
    reducerFn: reduceOrderResponse,
    selectedFields: [...defaultOrderFields],
    ...filterOpts,
  });
}

const filterOrderFields = filterOrderInfo();

/**
 * Alias the names of the API consumer requests to the DB Schema
 */
function translateOrderRequest(
  options?: requestTranslateOpts<OrderFields, OrderResponse>,
) {
  return translateRequest<OrderFields, OrderResponse>({
    aliasMap: orderAliasMap,
    reducerFn: reduceOrderRequest,
    ...options,
  });
}

const translateOrderFields = translateOrderRequest();

/**
 * Gets relevant info for the agent who made the sale
 */
function getAgentFromOrder({ fields }: Airtable.Record<OrderFields>) {
  const [agentId] = fields['Rep ID'];
  const agent = RepsTable.getRow(agentId).then(
    filterAgentInfo({ selectedFields: ['RepID', 'Name'] }),
  );
  return agent;
}

/**
 * Retrieves relevant info for the client who passed the order
 */
function getClientFromOrder({ fields }: Airtable.Record<OrderFields>) {
  const [clientId] = fields['Clients'];
  const client = ClientsTable.getRow(clientId).then(
    filterClientInfo({
      selectedFields: [
        'Client',
        'Address',
        'Primary Contact',
        'Secondary Contact',
        'Email',
      ],
    }),
  );
  return client;
}

function fetchLinkedRecords(orderRecord: Airtable.Record<OrderFields>) {
  const clientPromise = getClientFromOrder(orderRecord);
  const agentPromise = getAgentFromOrder(orderRecord);

  return Promise.all([clientPromise, agentPromise]);
}

async function includeLinkedRecords(
  order: { id: string } & Partial<OrderResponse>,
  orderRecord: Airtable.Record<OrderFields>,
) {
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
