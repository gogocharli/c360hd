import type { NextApiResponse, NextApiRequest } from 'next';
import { success, failure } from '../utils/request';
const stripe = require('stripe')(
  'sk_test_51HIOFKE48JsbnRWLZzNitfxhDrsczqIaGPP6oDAkrfF9fxQ4SrcnA8uxiLZGRSm0PeakOe0RyHY4K4vBP7Dr1hZ500TJbn7JBS',
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const fulfill = success(res);
  const reject = failure(res);

  switch (method) {
    case 'POST': {
      return createPayment(body).then(fulfill, reject);
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}

function calculateOrderAmount(items: string[]) {
  return 1499;
}

async function createPayment({
  items,
  customerInfo,
}: {
  items: string[];
  customerInfo: { name: string; email: string; phone: string };
}): Promise<{ clientSecret: string }> {
  const customer = await stripe.customers.create(customerInfo);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    customer: customer.id,
    currency: 'cad',
    setup_future_usage: 'off_session',
  });
  return {
    clientSecret: paymentIntent.client_secret,
  };
}
