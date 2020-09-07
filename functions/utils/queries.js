const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appxpI4tUKTnWtKys'
);

/**
 * Fetches data from the relevant airtable base
 *
 * @param {String} table The table to select from
 * @param  {...String} fields Fields to return from the table
 * @returns {Promise<[]>} An array of record objects
 */
exports.getFromTable = async (table, ...fields) => {
  const records = await base(table)
    .select({
      view: 'API',
      fields,
    })
    .all();
  return records;
};

/**
 *
 * @param {String} table The table to write to
 * @param {*} info The information to write to the table
 * @returns {Promise<[]>} An array of record objects
 */
exports.writeToTable = async (table, info = {}) => {
  const createdRecord = await base(table).create([{ fields: info }]);
  return createdRecord;
};
