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
import { Address } from '@components/Checkout/payment';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);
export default function Checkout() {
  const [isPaymentSuccess, setPaymentSuccess] = useState(false);
  const { query, locale } = useRouter();

  // Customer and order info
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: '',
    /* Asserting the type here is necessary since
    partial addresses are invalid */
    address: null as unknown as Address,
  });
  const [product, setProduct] = useState('classic');
  const [orderId, setOrderId] = useState<string>();
  const [error, setError] = useState<RequestError>();

  /**
   * When the window loads, retrieve the order number from the url
   * and fetch the relevant information if it is available
   */
  useEffect(() => {
    window
      .fetch(`/api/orders/${query.order}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw { type: 'Request', error: res };
      })
      .then((order) => {
        if (!order.id) throw 'No order';

        if (order.status == 'Confirmed') throw { type: 'Paid' };

        setCustomerInfo({
          name: order.Client?.name ?? '',
          email: order.Client?.email ?? '',
          phone: order.Client?.primaryContact ?? '',
          address: null as unknown as Address,
        });
        setOrderId(order.id);
        setProduct(order.productName.toLowerCase());
      })
      .catch((err) => {
        console.error(err);
        setError({ error: err, type: err?.type, message: err?.message });
      });
  }, [query.order]);

  const isOrder = !!orderId;
  const isPaid = Boolean(error?.type == 'Paid');
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
  const pageMeta = {
    title: t('clientPayment.pageMeta.title'),
    desc: t('clientPayment.pageMeta.desc'),
  };
  return (
    <Layout pageMeta={pageMeta}>
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
          <h1>
            {isPaid
              ? t('clientPayment.error.paid')
              : t('clientPayment.error.notFound')}
          </h1>
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

interface RequestError {
  type: string;
  message: string;
  error: any;
}
