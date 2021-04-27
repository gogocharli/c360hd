import React, { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { getOrder } from '../api/components/orders';
import Layout from '@layouts/checkout';
import { StripeCheckout } from '@components/Checkout/stripe-checkout';
import { Address } from '@components/Checkout/payment';

const stripePromise = loadStripe(
  'pk_test_51HIOFKE48JsbnRWLf04ZqFaLFG5LsnFyQvqTMpVb9ISarAnQslJAHFyzWqPTC39CvDy87NxQ9OzKWPiiyZjISzEZ00ZmkndixV',
);
export default function Checkout({
  id,
  product,
  locale,
  customerInfo,
}: {
  id: string;
  product: 'special' | 'classic';
  locale: 'en' | 'fr';
  customerInfo: {
    email: string;
    name: string;
    phone: string;
    address: Address;
  };
}) {
  const [isSuccess, setSuccess] = useState(false);

  console.log({ id, product, locale, customerInfo });

  useEffect(() => console.log(isSuccess), [isSuccess]);
  return (
    <Layout pageMeta={{ title: 'Checkout' }}>
      <div className='wrapper'>
        <h1>{customerInfo.name}</h1>
        <section className='content'>
          <Elements
            stripe={stripePromise}
            options={{
              fonts: [{ cssSrc: 'https://use.typekit.net/jst8wwr.css' }],
              locale: locale,
            }}
          >
            <StripeCheckout
              customerInfo={JSON.parse(JSON.stringify(customerInfo))}
              product={product as 'special' | 'classic'}
              intent='deposit'
              onSuccess={() => setSuccess(true)}
            />
          </Elements>
        </section>
      </div>
      <style jsx>{`
        section {
          --theme-color-fg: var(--color-dark-main);
          --theme-color-bg: var(--color-light-main);
          --theme-color-hg: var(--color-light-hg);

          background-color: hsl(var(--theme-color-bg));
          color: hsl(var(--theme-color-fg));
        }
      `}</style>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale = 'en',
  params,
}) => {
  const { id: orderNumber } = params;
  let customer = await getOrder(orderNumber as string).catch((err) =>
    console.log(err),
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'site', 'checkout'])),
      locale,
      id: orderNumber as string,
      product: customer?.productName?.toLowerCase() ?? 'classic',
      customerInfo: {
        name: customer?.Client?.name ?? '',
        email: customer?.Client?.email ?? '',
        phone: customer?.Client?.primaryContact ?? '',
        address: null,
      },
    },
  };
};
