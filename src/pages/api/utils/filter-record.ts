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
  reducerFn?: ReducerFn<T, S>;
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
 * Turns prop to camelCase if alias is not provided
 *
 * @param fields
 * @param aliasMap
 */

// const defaultRecordReducer = <T , S>(fields: T, aliasMap<T>) => {
//   return function (obj: any, oldPropName: string) {
//     const newPropName = aliasMap?.[oldPropName] ?? camelCase(oldPropName);

//     obj[newPropName] = fields[oldPropName];
//     return obj;
//   };
// }

function defaultRecordReducer<T, S>(fields: T, aliasMap?: RecordMap<T, S>) {
  return function (obj: any, oldPropName: keyof T) {
    const newPropName = (aliasMap?.[oldPropName] ??
      camelCase(oldPropName as string)) as keyof S;

    obj[newPropName] = fields[oldPropName];
    return obj as Partial<S>;
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
    oldKey: string,
  ): RecordMap {
    const newKey = aliasMap[oldKey];
    obj[newKey] = oldKey;
    return obj;
  },
  {});
  return reversedMap;
}

export { filterRecordInfo, translateRequest };
