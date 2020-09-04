const hdate = require('human-date');

const { createEmail } = require('./utils/templates');
const { formatTime } = require('./utils/date-time');

exports.handler = (event, _context, callback) => {
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

  humanDate = hdate.prettyPrint(date);
  time = formatTime(time); // 15h00

  // TODO Make sure that the time is not taken

  // TODO Get the rep name, phone number and email from the ID with a Airtable Query

  // Define the message
  const mailContent = createEmail(decisionMaker, email, humanDate, time, repId);

  // Send the message with the API Call
  mg.messages().send(mailContent, (error, response) => {
    callback(error, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  });
};
