const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const inventory = require('./data/products.json');
const calculateTaxes = require('./calculate-taxes');

exports.handler = async (event) => {
  const { sku } = JSON.parse(event.body);
  const product = inventory.find((p) => p.sku === sku);

  const customer = await stripe.customers.create();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer: customer.id,
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['CA'],
    },
    success_url: `${process.env.URL}/en-CA/success/`,
    cancel_url: `${process.env.URL}/en-CA/store/`,
    line_items: [
      {
        name: product.name,
        description: product.description,
        images: [product.image],
        amount: calculateTaxes(product.amount),
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