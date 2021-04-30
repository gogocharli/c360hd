import React, { useEffect, useState } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Layout from '@layouts/checkout';
import { StripeCheckout } from '@components/Checkout/stripe-checkout';
import { Spinner } from '@components/loading-spinner';

const stripePromise = loadStripe(
  'pk_test_51HIOFKE48JsbnRWLf04ZqFaLFG5LsnFyQvqTMpVb9ISarAnQslJAHFyzWqPTC39CvDy87NxQ9OzKWPiiyZjISzEZ00ZmkndixV',
);
export default function Checkout() {
  const [isPaymentSuccess, setPaymentSuccess] = useState(false);
  const { query, locale } = useRouter();

  // Customer and order info
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: '',
    address: null,
  });
  const [product, setProduct] = useState('classic');
  const [orderId, setOrderId] = useState<string>(null);
  const [error, setError] = useState(null);

  /**
   * When the window loads, retrieve the order number from the url
   * and fetch the relevant information if it is available
   */
  useEffect(() => {
    window
      .fetch(`/api/orders/${query.order}`)
      .then((res) => res.json())
      .then((order) => {
        if (!order.id) throw 'No order';

        setCustomerInfo({
          name: order.Client?.name ?? '',
          email: order.Client?.email ?? '',
          phone: order.Client?.primaryContact ?? '',
          address: null,
        });
        setOrderId(order.id);
        setProduct(order.productName.toLowerCase());
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [query.order]);

  const isOrder = !!orderId;
  useEffect(() => {
    if (isPaymentSuccess) {
      window.fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Confirmed', Deposit: true }),
      });
    }
  }, [isPaymentSuccess]);

  const { t } = useTranslation('checkout');
  return (
    <Layout pageMeta={{ title: 'Checkout' }}>
      <div className='wrapper'>
        {isOrder ? (
          <>
            <section className='intro flow'>
              {isPaymentSuccess ? (
                <>
                  <h1 className='[ text-600 md:text-700 ] [ leading-flat tracking-tight md:tracking-flat measure-micro ]'>
                    {t('clientPayment.success.title')}
                  </h1>
                  <p className='measure-compact'>
                    {t('clientPayment.success.desc')}
                  </p>
                </>
              ) : (
                <>
                  <h1 className='[ text-600 md:text-700 ] [ leading-flat tracking-tight md:tracking-flat measure-micro ]'>
                    {t('clientPayment.idle.title', { name: customerInfo.name })}
                  </h1>
                  <p className='measure-compact'>
                    {t('clientPayment.idle.desc', { order: query.order })}
                  </p>
                </>
              )}
            </section>
            {!isPaymentSuccess && (
              <section className='content'>
                <Elements
                  stripe={stripePromise}
                  options={{
                    fonts: [{ cssSrc: 'https://use.typekit.net/jst8wwr.css' }],
                    locale: locale as 'en' | 'fr',
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
          </>
        ) : error ? (
          <>
            <h1>Order Not Found</h1>
            <p>Make sure the order number is valid.</p>
          </>
        ) : (
          <Spinner />
        )}
      </div>
      <style jsx>{`
        div {
          // Have the spinner centered relative to <main>
          position: static;
        }

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
      <style jsx global>{`
        main {
          position: relative;
        }
      `}</style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'site', 'checkout'])),
    },
  };
};
