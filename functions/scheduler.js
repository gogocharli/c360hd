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

const getDates = (callback) => {
  let records = [];

  // Process each page and add the original records to our array
  const processPage = (partialRecords, fetchNextPage) => {
    records = [...records, ...partialRecords];
    fetchNextPage();
  };

  const processRecords = (err) => {
    if (err) {
      throw new Error(err);
    }

    // Create a new array from all the records
    const orders = records.map((record) => {
      return {
        _id: record.getId(),
        date: record.get('Date'),
        time: record.get('Time'),
      };
    });

    callback(orders);
  };
  try {
    table
      .select({
        view: 'API',
        fields: ['Date', 'Time'],
      })
      .eachPage(processPage, processRecords);
  } catch (err) {
    console.error(err);
  }
};

const askData = (cb) => getDates(cb);

askData(console.log);
