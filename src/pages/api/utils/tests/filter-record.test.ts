import { filterRecordInfo, RecordMap } from '../filter-record';

const apiAliasMap: RecordMap = {
  Client: 'clientName',
  Date: 'appointmentDate',
  Time: 'appointmentTime',
};

const id = 'ix234gmd90';
const record: Airtable.Record<{}> = {
  id,
  fields: {
    Client: 'John Appleseed',
    Date: '1984-01-24',
    Time: '13h00',
    Status: 'Invited',
  },
};

const defaultFields = ['Date', 'Client', 'Time', 'Status'];

test('Create valid property names', () => {
  const expectedObj = {
    id,
    clientName: 'John Appleseed',
    appointmentDate: '1984-01-24',
    appointmentTime: '13h00',
    status: 'Invited',
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
    clientName: 'John Appleseed',
    status: 'Invited',
  };
  const filterOrderFields = filterRecordInfo({
    selectedFields,
    aliasMap: apiAliasMap,
  });
  expect(filterOrderFields(record)).toEqual(expectedObj);
});

test('Accept custom reducer', () => {
  const selectedFields = ['Client', 'Date', 'Time'];
  const aliasMap = { ...apiAliasMap, Date: 'date', Time: 'time' };

  const reducer = (fields, apiReturnValues) => (obj, oldPropName) => {
    const newPropName = apiReturnValues[oldPropName];

    if (['Date', 'Time'].includes(oldPropName)) {
      obj.appointment = obj.appointment ? obj.appointment : {};
      obj.appointment[newPropName] = fields[oldPropName];
    } else {
      obj[newPropName] = fields[oldPropName];
    }
    return obj;
  };

  const filterOrderFields = filterRecordInfo({
    aliasMap,
    selectedFields,
    reducerFn: reducer,
  });

  const expectedObj = {
    id,
    clientName: 'John Appleseed',
    appointment: {
      date: '1984-01-24',
      time: '13h00',
    },
  };
  expect(filterOrderFields(record)).toEqual(expectedObj);
});
