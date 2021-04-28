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
  const [isPaymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => console.log(isPaymentSuccess), [isPaymentSuccess]);
  return (
    <Layout pageMeta={{ title: 'Checkout' }}>
      <div className='wrapper'>
        <section className='intro flow'>
          {isPaymentSuccess ? (
            <>
              <h1 className='[ text-600 md:text-700 ] [ leading-flat tracking-tight md:tracking-flat measure-micro ]'>
                The transaction was successful.
              </h1>
              <p className='measure-compact'>
                You'll recieve your receipt shortly. Thanks for doing business
                with us.
              </p>
            </>
          ) : (
            <>
              <h1 className='[ text-600 md:text-700 ] [ leading-flat tracking-tight md:tracking-flat measure-micro ]'>
                Welcome, {customerInfo.name}.
              </h1>
              <p className='measure-compact'>
                Here you'll be able to make the payment for order{' '}
                <span>{id}</span>.
              </p>{' '}
            </>
          )}
        </section>
        {!isPaymentSuccess && (
          <section className='content'>
            <Elements
              stripe={stripePromise}
              options={{
                fonts: [{ cssSrc: 'https://use.typekit.net/jst8wwr.css' }],
                locale: locale,
              }}
            >
              <StripeCheckout
                customerInfo={customerInfo}
                product={product as 'special' | 'classic'}
                intent='deposit'
                onSuccess={() => setPaymentSuccess(true)}
              />
            </Elements>
          </section>
        )}
      </div>
      <style jsx>{`
        .content {
          margin-left: auto;
          margin-right: auto;
        }

        .intro {
          --flow-space: 1rem;
        }

        .content {
          --theme-color-fg: var(--color-dark-main);
          --theme-color-bg: var(--color-light-main);
          --theme-color-hg: var(--color-light-hg);

          background-color: hsl(var(--theme-color-bg));
          border-radius: 0.5rem;
          color: hsl(var(--theme-color-fg));
          margin-top: 2rem;
          max-width: 33rem;
          padding: 3rem 2rem;
        }

        @media (min-width: 50em) {
          .intro {
            text-align: center;
          }

          .intro > * {
            margin-left: auto;
            margin-right: auto;
          }
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
