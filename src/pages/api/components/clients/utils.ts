import { EmailOptions } from '../../modules/email';
import {
  filterRecordInfo,
  recordFilterOpts,
  RecordMap,
  requestTranslateOpts,
  translateRequest,
} from '../../utils/filter-record';
import { Appointment } from '../../utils/phone';

const clientAliasMap: RecordMap = {
  Client: 'name',
  Order: 'orders',
};

const defaultClientFields = [
  'Client',
  'Decider',
  'Address',
  'Primary Contact',
  'Secondary Contact',
  'Email',
  'Order',
  'Language',
];

/**
 * Alias the names of the api return values and filter the selected fields
 * @param filterOpts
 */
function filterClientInfo(filterOpts?: recordFilterOpts) {
  return filterRecordInfo({
    aliasMap: clientAliasMap,
    selectedFields: defaultClientFields,
    ...filterOpts,
  });
}

/**
 * Helper variable to avoid repeating the above
 */
const filterClientFields = filterClientInfo();

function filterFeaturedClientInfo(filterOpts?: recordFilterOpts) {
  return filterRecordInfo({
    selectedFields: ['Name', 'Category', 'Zip Code', 'Created', 'Cover'],
  });
}

const filterFeaturedClientFields = filterFeaturedClientInfo();

/**
 * Alias the names of the API consumer requests to the DB Schema
 */
function translateClientRequest(options?: requestTranslateOpts) {
  return translateRequest({
    aliasMap: clientAliasMap,
    ...options,
  });
}
const translateClientFields = translateClientRequest();

function createOnboardingTemplate(client, order): EmailOptions {
  return {
    To: client['Email'],
    TemplateModel: {
      name: client['Decider'],
      company: client['Client'],
      orderNumber: order['Order Number'],
      time: order['Time'],
      date: order['Date'],
      storeURL: `https://c360hd.com/${client['Language'] ?? 'fr'}-ca/store`,
      repInfo: '',
    },
    locale: client['Language'],
  };
}

function createDeliveryTemplate(client, links): EmailOptions {
  return {
    To: client['Email'],
    TemplateModel: {
      name: client['Client'],
      fileURL: links['Photos'],
    },
    locale: client['Language'],
  };
}

function createReminderTemplate(client, order): Appointment {
  return {
    company: client['Client'],
    number: client['Secondary Contact'],
    time: order['Time'],
    language: client['Language'],
  };
}

export {
  defaultClientFields,
  filterClientInfo,
  filterClientFields,
  filterFeaturedClientFields,
  translateClientRequest,
  translateClientFields,
  createOnboardingTemplate,
  createDeliveryTemplate,
  createReminderTemplate,
};
