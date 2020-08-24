const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const inventory = require('./data/products.json');

const DEPOSIT = 'STV001';

exports.handler = async (event) => {
  const { sku } = JSON.parse(event.body);
  const product = inventory.find((p) => p.sku === sku);

  // Create a new costumer
  const customer = await stripe.customers.create();

  if (product.sku === DEPOSIT) {
    const intent = await stripe.paymentIntents.create({
      amount: product.amount,
      currency: 'cad',
      customer: customer.id,
      setup_future_usage: off_session,
    });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer: customer.id,
    payment_intent: intent ? intent.id : null,
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['CA'],
    },
    success_url: `${process.env.URL}/en-CA/success?session_id={{CHECKOUT_SESSION_ID}}`,
    cancel_url: `${process.env.URL}/en-CA/store/`,
    line_items: [
      {
        name: product.name,
        description: product.description,
        images: [product.image],
        amount: product.amount,
        currency: product.currency,
        quantity: 1,
      },
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
