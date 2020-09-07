const { promisify } = require('util');

const hdate = require('human-date');
const cryptoRandomString = require('crypto-random-string');

const { createEmail } = require('./utils/templates');
const { formatDate, formatTime } = require('./utils/date-time');
const { getFromTable, writeToTable } = require('./utils/queries');
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

  // TODO Make sure that the time is not taken
  let orderNumber = cryptoRandomString({
    length: 6,
    type: 'distinguishable',
  });

  try {
    if ((await schedule(date, time)) === true) {
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
        'Rep ID': repId,
        'Additional Info': data.addInfo,
        Clients: [clientId],
        Status: 'Pending',
      };

      const createOrder = await writeToTable('Orders', orderInfo);

      if (createOrder) {
        // Define the message
        const mailContent = createEmail(
          decisionMaker,
          email,
          humanDate,
          time,
          repId,
          orderNumber
        );

        // TODO Get the rep name, phone number and email from the ID with a Airtable Query

        // Send the message with the API Call
        await mg.messages().send(mailContent);

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
