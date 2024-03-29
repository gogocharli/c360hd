import type { Language, Fields, Thumbnails } from '@srcTypes/api.types';
import type { Appointment } from '../../utils/phone';
import type { EmailOptions } from '../../modules/email';
import {
  filterRecordInfo,
  recordFilterOpts,
  RecordMap,
  requestTranslateOpts,
  translateRequest,
} from '../../utils/filter-record';

export interface ClientResponse {
  name: string;
  decider: string;
  address: string;
  primaryContact: string;
  secondaryContact: string;
  email: string;
  orders: string[];
  language: Language;
}
type ClientFields = Fields['Clients'];

const clientAliasMap: RecordMap<ClientFields, ClientResponse> = {
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
] as const;

/**
 * Alias the names of the api return values and filter the selected fields
 * @param filterOpts
 */
function filterClientInfo(
  filterOpts?: recordFilterOpts<ClientFields, ClientResponse>,
) {
  return filterRecordInfo({
    aliasMap: clientAliasMap,
    selectedFields: [...defaultClientFields],
    ...filterOpts,
  });
}

/**
 * Helper variable to avoid repeating the above
 */
const filterClientFields = filterClientInfo();

interface FeaturedClientsResponse {
  name: string;
  category: string;
  address: string;
  created: string;
  cover: {
    id: string;
    url: string;
    filename: string;
    size: string;
    type: string;
    thumbnails: {
      [Property in keyof Thumbnails]: {
        url: string;
        width: number;
        height: number;
      };
    };
  }[];
}

function filterFeaturedClientInfo(
  filterOpts?: recordFilterOpts<Fields['Featured'], FeaturedClientsResponse>,
) {
  return filterRecordInfo({
    selectedFields: ['Name', 'Category', 'Address', 'Created', 'Cover'],
    ...filterOpts,
  });
}

const filterFeaturedClientFields = filterFeaturedClientInfo();

/**
 * Alias the names of the API consumer requests to the DB Schema
 */
function translateClientRequest(
  options?: requestTranslateOpts<ClientFields, ClientResponse>,
) {
  return translateRequest({
    aliasMap: clientAliasMap,
    ...options,
  });
}
const translateClientFields = translateClientRequest();

function createOnboardingTemplate(
  client: ClientFields,
  order: Fields['Orders'],
): EmailOptions {
  return {
    To: client['Email'],
    TemplateModel: {
      name: client['Decider'],
      company: client['Client'],
      orderNumber: order['Order Number'],
      time: order['Time'],
      date: order['Date'],
      storeURL: `https://lyncxs.com/${client['Language'] ?? 'fr'}-ca/store`,
      repInfo: '',
    },
    locale: client['Language'],
  };
}

function createDeliveryTemplate(
  client: ClientFields,
  links: Fields['Links'],
): EmailOptions {
  return {
    To: client['Email'],
    TemplateModel: {
      name: client['Client'],
      fileURL: links['Photos'],
    },
    locale: client['Language'],
  };
}

function createReminderTemplate(
  client: ClientFields,
  order: Fields['Orders'],
): Appointment {
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
