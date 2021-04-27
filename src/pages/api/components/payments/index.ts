import { capitalCase } from 'change-case';
import Stripe from 'stripe';

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

interface PaymentAttributes {
  product: string;
  province: string;
  type?: 'deposit' | 'final';
}

const STRIPE_SECRET_KEY =
  'sk_test_51HIOFKE48JsbnRWLZzNitfxhDrsczqIaGPP6oDAkrfF9fxQ4SrcnA8uxiLZGRSm0PeakOe0RyHY4K4vBP7Dr1hZ500TJbn7JBS';
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

export async function createPayment(
  intent: string,
  {
    product,
    customerInfo,
  }: {
    product: string;
    customerInfo: CustomerInfo;
  },
): Promise<{ clientSecret: string }> {
  const customer = await stripe.customers.create(customerInfo);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount({
      product,
      province: customerInfo.address.state,
    }),
    customer: customer.id,
    currency: 'cad',
    setup_future_usage: 'off_session',
    description: `Google Streetview: ${capitalCase(intent)}`,
  });
  return {
    clientSecret: paymentIntent.client_secret,
  };
}

export async function getPrice({
  product,
  province,
  type = 'deposit',
}: PaymentAttributes) {
  product = product.toLowerCase();
  province = province.toLowerCase();

  if (province !== 'qc' && province !== 'on') {
    province = 'qc';
  }

  const { data: prices } = await stripe.prices.list({
    lookup_keys: [`${type}_${product}_${province}`],
  });
  return prices[0];
}

export async function chargeCustomer({
  customerId,
  product,
}: {
  customerId: string;
  product: string;
}) {
  try {
    const {
      data: [{ id: cardId }],
    } = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    const customer = await stripe.customers.retrieve(customerId);

    if (customer.deleted == true)
      throw 'The customer was deleted. Cannot process payment';

    const province = customer.address.state;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: await calculateOrderAmount({ product, province, type: 'final' }),
      currency: 'cad',
      customer: customerId,
      payment_method: cardId,
      off_session: true,
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded')
      return { success: '✅ Successfully charged card off session' };
  } catch (error) {
    console.error(error);
    throw { errorMessage: error, code: 503 };
  }
}

async function calculateOrderAmount({
  product,
  province,
  type,
}: PaymentAttributes): Promise<number> {
  const price = await getPrice({ product, province, type });
  return price.unit_amount;
}
