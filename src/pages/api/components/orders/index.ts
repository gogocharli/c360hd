import type { Order } from '@srcTypes/api.types';
import cryptoRandomString from 'crypto-random-string';

import { formatDate, formatTime } from '../../utils/date-time';
import { validateInput } from '../../utils/validate';

import Email from '../../modules/email';
import { addToCalendar } from '../../modules/calendar';
import { ClientsTable, OrdersTable } from '../../modules/db-adapter';

import { checkSchedule } from './scheduler';
import {
  getRepInfo,
  createClientInfo,
  createEmailTemplate,
  createOrderInfo,
  filterOrderInfo,
  includeLinkedRecords,
  filterOrderFields,
  translateOrderFields,
} from './utils';

// Used to keep track of orders with no rep specified
const DEFAULT_REP = 'CYD-000';

/**
 * Create a new order, associate it to a client and a sales agent
 * and setup confirmation emails after creating event in calendar.
 */
export async function placeOrder(order: Order) {
  const isInvalid = validateInput(order);

  // Verify that required inputs aren't empty
  if (isInvalid) {
    throw { errorMessage: isInvalid.errorMessage, code: 400 };
  }

  const { date: isoDateTime } = order;

  let humanTime = formatTime(isoDateTime); // 15h00
  order.date = formatDate(isoDateTime); // 2020-09-24
  order.humanTime = humanTime;

  // Create a new distinguishable order number
  order.orderNumber = cryptoRandomString({
    length: 6,
    type: 'distinguishable',
  });

  try {
    const scheduleResponse = await checkSchedule(order.date, order.humanTime);
    if (scheduleResponse.isFree === true) {
      const repInfo = await getRepInfo(order.repId || DEFAULT_REP);

      if (repInfo == undefined) {
        const errorMessage = 'Please verify your agent ID and try again';
        throw errorMessage;
      }

      // Create order
      const clientInfo = createClientInfo(order);
      const createdClient = await ClientsTable.createRow(clientInfo);
      const clientId = createdClient.id;

      const orderInfo = createOrderInfo(order, clientId, repInfo);
      const createdOrder = await OrdersTable.createRow(orderInfo);

      if (createdOrder) {
        // Send message to client and then add the order to the schedule
        const mailContent = createEmailTemplate(order, repInfo);
        const clientEmail = new Email('sales', 'onboarding');
        await clientEmail.send(mailContent);

        const eventInfo = {
          summary: order.businessName,
          description: `${order.decisionMaker}\n${order.primaryNumber}`,
          location: order.address,
        };
        await addToCalendar(isoDateTime, eventInfo);

        const newOrder = filterOrderFields(createdOrder);

        return newOrder;
      }
    } else {
      throw scheduleResponse.reason;
    }
  } catch (error) {
    throw { errorMessage: error, code: 500 };
  }
}

/**
 * Responds with all orders from the database.
 */
export async function getAllOrders() {
  try {
    const orderRecords = await OrdersTable.all();
    const orders = orderRecords.map(filterOrderFields);
    return orders;
  } catch (error) {
    console.error(error);
    const errorMessage = `Failed to retrieve orders\n ${error.message}`;
    throw { errorMessage, code: 500 };
  }
}

/**
 * Return an order from it's id.
 * @param number the order's id
 */
export async function getOrder(number: string) {
  const searchOptions = { field: 'Order Number', query: number };
  try {
    const [orderRecord] = await OrdersTable.all({
      filterField: searchOptions,
    });
    if (!orderRecord) throw 'No order found';

    const order = filterOrderFields(orderRecord);
    const completeOrder = await includeLinkedRecords(order, orderRecord);

    return completeOrder;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't find order number "${number}"\n ${error.message}`;
    throw { errorMessage, code: 500 };
  }
}

/**
 * Look for orders associated with a client in the database.
 * @param query the client's name
 */
export async function searchOrder(query: string) {
  const searchOptions = { field: 'Client', query };

  try {
    // Find the clients whose company name matches the query
    const matchedClients = await ClientsTable.all({
      filterField: searchOptions,
    });

    // Find the order(s) placed by each client
    const matchedOrdersList = await matchedClients
      .map((client) => client.fields['Order'])
      .map(OrdersTable.getRow.bind(OrdersTable));

    const fieldsToInclude = [
      'Order Number',
      'Date',
      'Time',
      'Product Name',
      'Status',
    ];

    const filterOrderFields = filterOrderInfo({
      selectedFields: fieldsToInclude,
    });

    // Include only the aforementioned set of fields
    const orders = (await Promise.all(matchedOrdersList)).map(
      filterOrderFields,
    );

    const ordersWithClientName = orders.map((order, index) => {
      const { id, fields } = matchedClients[index];
      const Client = {
        id,
        name: fields['Client'],
        address: fields['Address'],
      };
      return { ...order, Client };
    });

    return ordersWithClientName;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't find order matching "${query}"\n ${error.message}`;
    throw { errorMessage };
  }
}

/**
 * Set the order's status to "cancelled".
 * @param id
 */
export async function cancelOrder(id: string): Promise<void> {
  try {
    const update = {
      id,
      fields: { Status: 'Cancelled' },
    };
    await OrdersTable.updateRow([update]);

    return undefined;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't cancel order ${id}\n ${error.message}`;
    throw { errorMessage };
  }
}

/**
 * Update fields for a specified order.
 * @param id
 * @param changes key value pairs of changes to be made
 */
export async function updateOrder(id: string, changes: Partial<Order>) {
  try {
    const update = { id, fields: translateOrderFields(changes) };

    // Updater from Airtable always returns an array
    const [updatedOrderRecord] = await OrdersTable.updateRow([update]);
    const updatedOrder = filterOrderFields(updatedOrderRecord);
    return updatedOrder;
  } catch (error) {
    console.error(error);
    const errorMessage = `Couldn't update order ${id}\n ${error.message}`;
    throw { errorMessage };
  }
}
