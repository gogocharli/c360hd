exports.handler = (event, _context, callback) => {
  const mailgun = require('mailgun-js');
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  const data = JSON.parse(event.body);

  let { email, decisionMaker, date, time, repId } = data;

  // Define the message
  // TODO import from an external file
  const mailContent = {
    from: 'Charles <c360hdmtl@gmail.com>',
    to: `${decisionMaker} <${email}>`,
    subject: 'Your Google Streetview Virtual Tours Confirmation',
    text: `
      Hello, ${decisionMaker}!

      Thank you for deciding to work with us for your virtual tours to boost the visibility of your business!

      Our photographer is scheduled to be at your store between 9AM to 5PM with a preference for ${String(
        time
      )} on the ${String(date)}.

      For more informtion, please contact your sales representative: ${repId}

      Here is a link to make your payment or deposit: https://c360hd.com/en-ca/store/

      See you soon!
      Charles from C360HD.
    `,
  };

  // Send the message with the API Call
  mg.messages().send(mailContent, (error, response) => {
    callback(error, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  });
};
