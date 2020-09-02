/**
 * Creates an email template to send to clients
 *
 * @param {string} name - The decision maker
 * @param {string} email - The recipient's email
 * @param {string} date - Human readable version of the date
 * @param {string} time - The preferred time
 * @returns {{from: string, to: string, subject: string, text: string}}
 */
exports.createEmail = (name, email, date, time, repId) => {
  return {
    from: 'Charles <c360hdmtl@gmail.com>',
    to: `${name} <${email}>`,
    subject: 'Your Google Streetview Virtual Tours Confirmation',
    text: `
    Hello, ${name}!

    Thank you for deciding to work with us for your virtual tours to boost the visibility of your business!

    Our photographer is scheduled to be at your store between 9AM to 5PM with a preference for ${time} on the ${date}.

    For more information, please contact your sales representative: ${repId}

    Here is a link to make your payment or deposit: https://c360hd.com/en-ca/store/

    See you soon!
    Charles from C360HD.
    `,
  };
};
