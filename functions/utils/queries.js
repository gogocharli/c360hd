const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyr7hFsG1NJ64sna' }).base(
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
  try {
    const records = await base(table)
      .select({
        view: 'API',
        fields,
      })
      .all();
    return records;
  } catch (err) {
    console.error(err);
  }
};
