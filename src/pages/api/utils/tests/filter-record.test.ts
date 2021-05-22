import {
  OrderResponse,
  reduceOrderRequest,
} from './../../components/orders/utils';
import { Fields } from '@srcTypes/api.types';
import { filterRecordInfo, RecordMap } from '../filter-record';

const apiAliasMap: RecordMap<Fields['Orders'], OrderResponse> = {
  'Order Number': 'number',
  Date: 'date',
  Time: 'time',
};

const id = 'ix234gmd90';
const record = {
  id,
  fields: {
    'Order Number': 'XKD32K',
    Date: '1984-01-24',
    Time: '13h00',
    Status: 'Pending',
  },
} as Airtable.Record<Fields['Orders']>;

const defaultFields = ['Date', 'Order Number', 'Time', 'Status'];

test('Create valid property names', () => {
  const expectedObj = {
    id,
    number: 'XKD32K',
    date: '1984-01-24',
    time: '13h00',
    status: 'Pending',
  };
  const filterOrderFields = filterRecordInfo({
    selectedFields: defaultFields,
    aliasMap: apiAliasMap,
  });
  expect(filterOrderFields(record)).toEqual(expectedObj);
});

test('Select desired fields', () => {
  const selectedFields = ['Client', 'Status'];
  const expectedObj = {
    id,
    number: 'XKD32K',
    status: 'Pending',
  };
  const filterOrderFields = filterRecordInfo({
    selectedFields,
    aliasMap: apiAliasMap,
  });
  expect(filterOrderFields(record)).toEqual(expectedObj);
});

// test('Accept custom reducer', () => {
//   const selectedFields = ['Client', 'Date', 'Time'];
//   const aliasMap = { ...apiAliasMap, Date: 'date', Time: 'time' };

//   const reducer = reduceOrderRequest;

//   const filterOrderFields = filterRecordInfo({
//     aliasMap: apiAliasMap,
//     selectedFields,
//     reducerFn: reducer,
//   });

//   const expectedObj = {
//     id,
//     number: 'XKD32K',
//     appointment: {
//       date: '1984-01-24',
//       time: '13h00',
//     },
//   };
//   expect(filterOrderFields(record)).toEqual(expectedObj);
// });
