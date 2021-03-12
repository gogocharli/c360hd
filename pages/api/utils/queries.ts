/**
 * Definition of all the queries used throughout the application
 * Currently using the Airtable Javascript SDK
 * @see https://github.com/airtable/airtable.js
 */

import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appxpI4tUKTnWtKys'
);

export interface FilterOptions {
  fields?: string[];
  filterField?: {
    field: string;
    query: string;
  };
}

interface SelectOptions {
  view: string;
  fields?: string[];
  filterByFormula?: string;
}
/**
 * Fetches data as a list from the relevant airtable base with the applied options
 *
 * @param {string} table The table to select from
 * @param  {FilterOptions} queries Filter to be applied to the records
 * @returns {Promise<[]>} An array of record objects
 */
export async function getAllFromTable(table: string, queries?: FilterOptions) {
  const fields = queries?.fields;
  const filterField = queries?.filterField;
  const filterByFormula = filterField
    ? `FIND("${filterField.query}", {${filterField.field}})`
    : '';

  const selectOptions: SelectOptions = { view: 'API' };

  // Only add those values to the options if they are defined
  // This is due to an odd decision from airtable's API not to consider undefined values
  if (fields) selectOptions.fields = fields;
  if (filterByFormula) selectOptions.filterByFormula = filterByFormula;

  const records = await base(table).select(selectOptions).all();
  return records;
}

/**
 * Returns the matching Id from the selected table
 *
 * @param {string} table The table to select from
 * @param {string} id The unique key of the record
 */
export async function getRecordById(table: string, id: string) {
  const match = await base(table).find(id);
  return match;
}

/**
 *
 * @param {String} table The table to write to
 * @param {*} info The information to write to the table
 * @returns {Promise<[]>} An array of record objects
 */
export async function writeToTable(table: string, info = {}) {
  const createdRecord = await base(table).create(info);
  return createdRecord;
}

/**
 * Updates all specified fields of a record
 *
 * @param {string} table
 * @param {{id: string, fields: *}[]} updates
 */
export async function updateFields(table: string, updates: any[]) {
  const updatedRecord = await base(table).update(updates);
  return updatedRecord;
}

export async function deleteField(table: string, ...recordIds: string[]) {
  return await base(table).destroy(recordIds);
}
