const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateTaxes = require('./calculate-taxes');
const DEPOSIT = 9900;

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  const session = await stripe.checkout.sessions.retrieve(id);

  const { setup_intent, customer } = session;

  // Get payment method
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customer,
    type: 'card',
    limit: 1,
  });

  const payment_method = paymentMethods.data[0].id;

  // Create a payment intent
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateTaxes(DEPOSIT),
      currency: 'cad',
      customer: customer,
      payment_method: payment_method,
      off_session: true,
      confirm: true,
    });
  } catch (err) {
    console.log('Error code is: ', err.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
      err.raw.payment_intent.id
    );
    console.log('PI retrieved: ', paymentIntentRetrieved.id);

    return {
      statusCode: 400,
      body: 'Payment declined',
    };
  }

  return {
    statusCode: 200,
    body: 'Payment successful',
  };
};
