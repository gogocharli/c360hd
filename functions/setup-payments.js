const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const inventory = require('./data/products.json');
const calculateTaxes = require('./calculate-taxes');

exports.handler = async (event) => {
  const { sku } = JSON.parse(event.body);
  const product = inventory.find((p) => p.sku === sku);

  // Make sure the product is in the database
  if (product) {
    const customer = await stripe.customers.create();

    const intent = await stripe.paymentIntents.create({
      amount: calculateTaxes(product.amount),
      currency: 'cad',
      customer: customer.id,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'setup',
      customer: customer.id,
      success_url: `${process.env.URL}/en-CA/success?session_id={{CHECKOUT_SESSION_ID}}`,
      cancel_url: `${process.env.URL}/en-CA/store/`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        sessionId: session.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      }),
    };
  }
};
