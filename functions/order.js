const { promisify } = require('util');

const hdate = require('human-date');
const cryptoRandomString = require('crypto-random-string');

const { createEmail } = require('./utils/templates');
const { formatDate, formatTime } = require('./utils/date-time');
const { getAllFromTable, writeToTable } = require('./utils/queries');
const { schedule, scheduleError } = require('./scheduler');

exports.handler = async (event, _context, callback) => {
  const mailgun = require('mailgun-js');
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  const data = JSON.parse(event.body);

  // Verify that required inputs aren't empty
  for (let field of Object.keys(data)) {
    if (field === 'secondaryNumber' || field === 'addInfo') {
      continue;
    } else if (!data[field]) {
      callback(
        new Error(`${field} is empty, make sure to fill the form completely.`)
      );
    }
  }

  let { email, decisionMaker, date, time, repId } = data;

  humanDate = hdate.prettyPrint(date); // September 24, 2020
  date = formatDate(date); // 2020-09-24
  time = formatTime(time); // 15h00

  // Create a new distinguishable order number
  let orderNumber = cryptoRandomString({
    length: 6,
    type: 'distinguishable',
  });

  try {
    if ((await schedule(date, time)) === true) {
      // Get the rep name and phone number from the ID
      const repsRecords = await getAllFromTable('Reps');
      const matchedRep = repsRecords
        .filter((rep) => {
          return rep.get('RepID') === repId;
        })
        .map((rep) => {
          return {
            key: rep.getId(),
            name: rep.get('Name'),
            number: rep.get('Number'),
          };
        });
      const repInfo = matchedRep[0];

      // Create order
      const clientInfo = {
        Client: data.company,
        Decider: decisionMaker,
        Address: data.address,
        'Primary Contact': data.primaryNumber,
        'Secondary Contact': data.secondaryNumber,
        Email: email,
      };

      const createClient = await writeToTable('Clients', clientInfo);
      const clientId = createClient[0].getId();

      const orderInfo = {
        'Order Number': orderNumber,
        Date: date,
        Time: time,
        'Payment Method': data.payment,
        'Photos Estimate': data.photos,
        'Rep ID': [repInfo.key],
        'Additional Info': data.addInfo,
        Clients: [clientId],
        Status: 'Pending',
      };

      const createOrder = await writeToTable('Orders', orderInfo);

      if (createOrder) {
        // Define the message
        const mailContent = {
          name: decisionMaker,
          email: email,
          date: humanDate,
          time,
          repInfo,
          orderNumber,
        };
        const customerEmail = createEmail(mailContent);

        // Send email to the client
        await mg.messages().send(customerEmail);

        return {
          statusCode: 200,
          body: JSON.stringify({ success: 'success' }),
        };
      }
    }
  } catch (error) {
    console.log(error);
    if (error instanceof scheduleError) {
      return {
        statusCode: 418,
        body: JSON.stringify({ error: error.message }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
