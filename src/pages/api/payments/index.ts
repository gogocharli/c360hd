import type { NextApiResponse, NextApiRequest } from 'next';
import { success, failure } from '../utils/request';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51HIOFKE48JsbnRWLZzNitfxhDrsczqIaGPP6oDAkrfF9fxQ4SrcnA8uxiLZGRSm0PeakOe0RyHY4K4vBP7Dr1hZ500TJbn7JBS',
  { apiVersion: '2020-08-27' },
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const fulfill = success(res);
  const reject = failure(res);

  switch (method) {
    case 'POST': {
      return createPayment(body).then(fulfill, reject);
    }
    case 'GET': {
      const product = query.product as string;
      const province = query.province as string;
      return getPrice(product, province).then(fulfill, reject);
    }
    default: {
      return `Unsupported API Method: ${method}`;
    }
  }
}

async function calculateOrderAmount(
  product: string,
  province: string,
): Promise<number> {
  const price = await getPrice(product, province);
  return price.unit_amount;
}

async function createPayment({
  product,
  customerInfo,
}: {
  product: string;
  customerInfo: CustomerInfo;
}): Promise<{ clientSecret: string }> {
  const customer = await stripe.customers.create(customerInfo);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(product, customerInfo.address.state),
    customer: customer.id,
    currency: 'cad',
    setup_future_usage: 'off_session',
  });
  return {
    clientSecret: paymentIntent.client_secret,
  };
}

async function getPrice(product: string, province: string) {
  product = product.toLowerCase();
  province = province.toLowerCase();
  province = province !== ('qc' || 'on') ? 'qc' : province;

  const { data: prices } = await stripe.prices.list({
    lookup_keys: [`deposit_${product}_${province}`],
  });
  return prices[0];
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
    country: string;
    line1: string;
    postal_code: string;
    state: string;
  };
}
