const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyr7hFsG1NJ64sna' }).base(
  'appxpI4tUKTnWtKys'
);

// TODO Verify that the date is not taken
// Extract upcoming order dates from airtable into an array of objects containing date and time
// Filter the records which contain the same date
// If there isn't the same date — return true
// If there isn't 28 orders the same date
// If there is less than 4 orders at the same time — return true
// Else find the closest time period with less than 4 orders and add it to the record

const table = base('Orders');

const getRecords = async () => {
  // let fields = [];
  try {
    const records = await table
      .select({
        view: 'API',
        fields: ['Date', 'Time'],
      })
      .firstPage();

    const fields = await records.map((record) => {
      return { date: record.get('Date'), time: record.get('Time') };
    });
    console.log(fields, fields.length);
  } catch (err) {
    console.error(err);
  }
};

getRecords();
