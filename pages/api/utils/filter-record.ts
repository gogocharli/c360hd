import { camelCase, capitalCase } from 'change-case';

/**
 * Transforms the data returned from a record as a simple object
 * with better names for the API consumers
 *
 * @param filterOpts
 */
function filterRecordInfo(filterOpts: recordFilterOpts) {
  return function ({ id, fields: initialFields }: Airtable.Record<{}>) {
    const {
      aliasMap,
      selectedFields,
      reducerFn = defaultRecordReducer,
    } = filterOpts;

    // use the provided reducer over the default
    const fieldReducer = reducerFn(initialFields, aliasMap);

    const newFields = selectedFields.reduce(fieldReducer, {});

    return {
      id,
      ...newFields,
    };
  };
}

/**
 * Match the props in the DB to better names for the API consumers.
 * Turns prop to camelCase if alias is not provided
 *
 * @param fields
 * @param aliasMap
 */
function defaultRecordReducer(fields: {}, aliasMap?: RecordMap) {
  return function (obj: {}, oldPropName: string) {
    const newPropName = aliasMap?.[oldPropName] ?? camelCase(oldPropName);

    obj[newPropName] = fields[oldPropName];
    return obj;
  };
}

function translateRequest(translateOpts: requestTranslateOpts) {
  const { aliasMap, reducerFn = defaultRequestReducer } = translateOpts;

  // This allow us to have a single alias map for both requests and responses
  const reversedMap = reverseMap?.(aliasMap);

  return function (requestBody) {
    const reducer = reducerFn(requestBody, reversedMap);

    const requestKeys = Object.keys(requestBody);
    const fields = requestKeys.reduce(reducer, {});
    return fields;
  };
}

function defaultRequestReducer(fields: {}, aliasMap?: RecordMap) {
  return function (obj: {}, oldPropName: string) {
    const newPropName = aliasMap?.[oldPropName] ?? capitalCase(oldPropName);

    obj[newPropName] = fields[oldPropName];
    return obj;
  };
}

function reverseMap(aliasMap: RecordMap): RecordMap {
  const keys = Object.keys(aliasMap);
  const reversedMap = keys.reduce(function (
    obj: {},
    oldKey: string
  ): RecordMap {
    const newKey = aliasMap[oldKey];
    obj[newKey] = oldKey;
    return obj;
  },
  {});
  return reversedMap;
}

export type RecordMap = Record<string, string>;
type ReducerFn = (
  fields: {},
  apiReturnValues: RecordMap
) => (obj: {}, oldPropName: string) => {};

export interface recordFilterOpts {
  selectedFields: string[];
  aliasMap?: RecordMap;
  reducerFn?: ReducerFn;
}

export interface requestTranslateOpts {
  aliasMap?: RecordMap;
  reducerFn?: ReducerFn;
}

export { filterRecordInfo, translateRequest };
