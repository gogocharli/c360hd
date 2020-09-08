/**
 * Creates an email template to send to clients
 *
 * @param {string} name - The decision maker
 * @param {string} email - The recipient's email
 * @param {string} date - Human readable version of the date
 * @param {string} time - The preferred time
 * @param {{key: string, name: string, number: string}} repId - The sales agent Id
 * @param {string} orderNumber - The order Number
 * @returns {{from: string, to: string, subject: string, text: string}}
 */
// TODO add 'bcc' value to sales@c360hd.com
exports.createEmail = ({ name, email, date, time, repInfo, orderNumber }) => {
  return {
    from: 'C360HD <c360hdmtl@gmail.com>',
    to: `${name} <${email}>`,
    subject: 'Your Google Streetview Virtual Tours Confirmation',
    text: `
    Hello, ${name}!

    Thank you for deciding to work with us for your virtual tours to boost the visibility of your business!

    Our photographer is scheduled to be at your store between 9AM to 5PM with a preference for ${time} on the ${date}.

    For more information, please contact your sales representative ${repInfo.name} at ${repInfo.number}

    Your order number is: ${orderNumber}

    Here is a link to make your payment or deposit: https://c360hd.com/en-ca/store/

    See you soon!
    Charles from C360HD.
    `,
  };
};
