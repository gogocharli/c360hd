import { camelCase, capitalCase } from 'change-case';

export type RecordMap<T, S> = Record<keyof T, keyof Partial<S>>;
export type ReducerFn<T, S> = (
  fields: T,
  apiReturnValues: RecordMap<T, S>,
) => (obj: Partial<S>, oldPropName: keyof T) => Partial<S>;

export interface recordFilterOpts<T, S> {
  selectedFields: Array<keyof T>;
  aliasMap?: RecordMap<T, S>;
  reducerFn?: ReducerFn<T, S>;
}

export interface requestTranslateOpts<T, S> {
  aliasMap?: RecordMap<T, S>;
  reducerFn?: ReducerFn<S, T>;
}

/**
 * Transforms the data returned from a record as a simple object
 * with better names for the API consumers
 */
function filterRecordInfo<T, S>(filterOpts: recordFilterOpts<T, S>) {
  return function ({ id, fields: initialFields }: Airtable.Record<T>) {
    const {
      aliasMap,
      selectedFields,
      reducerFn = defaultRecordReducer,
    } = filterOpts;

    // use the provided reducer over the default
    const fieldReducer = reducerFn<T, S>(initialFields, aliasMap);

    const newFields = selectedFields.reduce<Partial<S>>(fieldReducer, {});

    return {
      id,
      ...newFields,
    };
  };
}

/**
 * Match the props in the DB to better names for the API consumers.
 * Turns prop to camelCase when no alias is provided
 */
function defaultRecordReducer<T, S>(fields: T, aliasMap?: RecordMap<T, S>) {
  return function (obj: any, oldPropName: keyof T) {
    const newPropName = (aliasMap?.[oldPropName] ??
      camelCase(oldPropName as string)) as keyof S;

    obj[newPropName] = fields[oldPropName];
    return obj as Partial<S>;
  };
}

/**
 * Match the properties in the API requests to those in the DB.
 * Turns prop to CapitalCase when no alias is provided
 */
function defaultRequestReducer<T, S>(fields: T, aliasMap?: RecordMap<T, S>) {
  return function (obj: any, oldPropName: keyof T) {
    const newPropName = (aliasMap?.[oldPropName] ??
      capitalCase(oldPropName as string)) as keyof S;

    obj[newPropName] = fields[oldPropName];
    return obj;
  };
}

function translateRequest<T, S>(translateOpts: requestTranslateOpts<T, S>) {
  const { aliasMap, reducerFn = defaultRequestReducer } = translateOpts;

  // This allow us to have a single alias map for both requests and responses
  const reversedMap = reverseMap?.(aliasMap);

  return function (requestBody: S) {
    const reducer = reducerFn(requestBody, reversedMap);

    const requestKeys = Object.keys(requestBody) as Array<keyof S>;
    const fields = requestKeys.reduce<Partial<T>>(reducer, {});
    return fields;
  };
}

function reverseMap<T, S>(aliasMap: RecordMap<T, S>) {
  const keys = Object.keys(aliasMap) as Array<keyof T>;

  const reversedMap = keys.reduce(function (obj: any, oldKey: keyof T) {
    const newKey = aliasMap[oldKey];
    obj[newKey] = oldKey;
    return obj;
  }, {});

  return reversedMap as RecordMap<S, T>;
}

export { filterRecordInfo, translateRequest };
