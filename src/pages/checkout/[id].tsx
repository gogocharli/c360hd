import React, { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { getOrderFromNumber } from '../api/components/orders';
import Layout from '@layouts/checkout';
import { StripeCheckout } from '@components/Checkout/stripe-checkout';
import { Address } from '@components/Checkout/payment';

const stripePromise = loadStripe(
  'pk_test_51HIOFKE48JsbnRWLf04ZqFaLFG5LsnFyQvqTMpVb9ISarAnQslJAHFyzWqPTC39CvDy87NxQ9OzKWPiiyZjISzEZ00ZmkndixV',
);
export default function Checkout({
  order,
  product,
  locale,
  customerInfo,
}: {
  order: { id: string; number: string };
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

  useEffect(() => {
    if (isPaymentSuccess) {
      window.fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Confirmed', Deposit: true }),
      });
    }
  }, [isPaymentSuccess]);

  const isOrder = Boolean(order.id);

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
                    {t('clientPayment.idle.desc', { order: order.number })}
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
          </>
        ) : (
          <h1>Order Not Found</h1>
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
  let order = await getOrderFromNumber(orderNumber as string).catch((err) =>
    console.log(err),
  );
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'site', 'checkout'])),
      locale,
      order: {
        id: order?.id ?? '',
        number: orderNumber as string,
      },
      product: order?.productName?.toLowerCase() ?? 'classic',
      customerInfo: {
        name: order?.Client?.name ?? '',
        email: order?.Client?.email ?? '',
        phone: order?.Client?.primaryContact ?? '',
        address: null,
      },
    },
  };
};
