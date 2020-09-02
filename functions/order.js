const hdate = require('human-date');

const { createEmail } = require('./templates');
const { formatTime } = require('./date-time');

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

  date = hdate.prettyPrint(date);
  time = formatTime(time);

  // Define the message
  const mailContent = createEmail(decisionMaker, email, date, time, repId);

  // Send the message with the API Call
  mg.messages().send(mailContent, (error, response) => {
    callback(error, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  });
};
