import React, { useState, useEffect } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm, FormProvider } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Layout from '@layouts/checkout';
import { Button } from '@components/button';
import { FormInputs, TOMORROW } from '@components/Form/form-field';
import Arrow from '@components/icon-arrow-right.svg';

import { form } from '@components/Form/styles.module.scss';
import { Timeline } from '@includes/timeline';
import {
  BusinessInfo,
  ContactInfo,
  OrderInfo,
  Payment,
  ReviewOrder,
} from '@components/Checkout';
import { StepInfo } from '@components/Checkout/step-info';

const stripePromise = loadStripe(
  'pk_test_51HIOFKE48JsbnRWLf04ZqFaLFG5LsnFyQvqTMpVb9ISarAnQslJAHFyzWqPTC39CvDy87NxQ9OzKWPiiyZjISzEZ00ZmkndixV',
);
const paths = ['business', 'contact', 'order', 'review', 'checkout'];
const stepInputs: Array<keyof FormInputs>[] = [
  ['businessName', 'decisionMaker', 'address'],
  ['primaryNumber', 'secondaryNumber', 'email'],
  ['date'],
];

export default function Checkout() {
  const router = useRouter();
  const { asPath, query } = router;
  const [formStep, setFormStep] = useState(0);
  const [defaultProduct] = useState(() => (query.product as string) ?? '');
  const methods = useForm<FormInputs>({
    defaultValues: {
      businessName: '',
      decisionMaker: '',
      address: '',
      primaryNumber: '',
      secondaryNumber: '',
      email: '',
      product: defaultProduct == 'special' ? 'special' : 'classic',
      date: TOMORROW,
      repId: '',
      lang: router.locale == 'fr' ? 'fr' : 'en',
    },
    mode: 'onSubmit',
  });
  const {
    getValues,
    trigger,
    setFocus,
    formState: { errors },
  } = methods;

  function onSubmit(data: any) {
    console.log(data);
  }

  // Use the pathname's hash to render the right part of the form
  useEffect(() => {
    const hash = new window.URL(window.location.href).hash.slice(1);

    // The URL object includes the query in the hash
    // In order not to use a regex, we just stap to the first form page
    // in case it exists
    if (paths.includes(hash)) {
      setFormStep(paths.indexOf(hash));
    } else {
      setFormStep(0);
    }
  }, [asPath]);

  useEffect(() => {
    formStep < 4 && setFocus(stepInputs[formStep][0]);
  }, [formStep, setFocus]);

  /**
   * Select section and navigate using the current step
   */
  async function navigate(direction: 'previous' | 'next') {
    const hash =
      direction == 'previous' ? paths[formStep - 1] : paths[formStep + 1];

    const isValid = direction == 'next' ? await validateCurrentStep() : true;

    isValid && router.push(`#${hash}`, null, { shallow: true });
  }

  async function validateCurrentStep() {
    const currentInputs = stepInputs[formStep];
    await trigger(currentInputs);
    return Object.keys(errors).length == 0;
  }

  const { t } = useTranslation('checkout');
  return (
    <Layout pageMeta={{ title: 'Checkout' }}>
      <div className='multi-form wrapper flow'>
        <Timeline step={formStep} />
        <section className='content'>
          <StepInfo step={formStep} />
          <div className='form__wrapper'>
            <Elements
              stripe={stripePromise}
              options={{
                fonts: [{ cssSrc: 'https://use.typekit.net/jst8wwr.css' }],
                locale: router.locale as 'en' | 'fr',
              }}
            >
              <FormProvider {...methods}>
                {formStep < 4 && (
                  <form className={`${form}`} action='post'>
                    {formStep == 0 && <BusinessInfo />}
                    {formStep == 1 && <ContactInfo />}
                    {formStep == 2 && <OrderInfo />}
                    {formStep == 3 && (
                      <ReviewOrder
                        locale={router.locale}
                        getValues={getValues}
                      />
                    )}
                  </form>
                )}
                {formStep == 4 && <Payment getValues={getValues} />}
              </FormProvider>
            </Elements>
            <div className='buttons'>
              {formStep > 0 && (
                <Button
                  className='previous'
                  onClick={() => navigate('previous')}
                >
                  <span className='visually-hidden'>
                    {t('buttons.previous')}
                  </span>
                  <div className='icon'>
                    <Arrow width={24} />
                  </div>
                </Button>
              )}
              {formStep < 4 ? (
                <Button
                  className='next'
                  onClick={() => {
                    navigate('next');
                  }}
                >
                  <span className='visually-hidden'>{t('buttons.next')}</span>
                  <div className='icon'>
                    <Arrow width={24} />
                  </div>
                </Button>
              ) : (
                <Button
                  type='secondary'
                  form='stripe-checkout'
                  className='stripe-checkout-button'
                >
                  Confirm Order
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .multi-form {
          --flow-space: 3rem;
        }

        .content {
          --border-radius: 8px;
        }

        .form__wrapper {
          --flow-space: 2.5rem;
          --theme-color-bg: var(--color-light-main);
          --theme-color-fg: var(--color-dark-main);
          --theme-color-hg: var(--color-light-highlight);

          background-color: hsl(var(--theme-color-bg));
          border-radius: var(--border-radius);
          color: hsl(var(--theme-color-fg));
          flex-direction: column;
          margin-top: 1.5rem;
          padding: 2.5rem 1rem;
        }

        form > :global(* + *) {
          margin-top: 1rem;
        }

        :global(form) {
          align-items: start;
          margin-left: auto;
          margin-right: auto;
          max-width: 28rem;
        }

        :global(form > div) {
          width: 100%;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          margin: 2.5rem auto 0;
          max-width: 80%;
        }

        :global(.button) {
          --default-color: var(--color-dark-main);
        }

        :global(.button > .icon) {
          height: 1.5rem;
          margin-left: 0;
        }

        :global(.button > .icon path) {
          fill: currentColor;
        }

        .buttons > :global(.previous) {
          margin-right: auto;
        }

        .buttons > :global(.previous > .icon) {
          transform: rotate(0.5turn);
        }

        .buttons > :global(.next) {
          margin-left: auto;
        }

        .buttons > :global(.stripe-checkout-button) {
          --default-bg: var(--color-light-highlight);
          --default-color: var(--color-dark-main);
          --hover-bg: var(--color-dark-main);
          --hover-color: var(--color-light-main);
        }

        @media (min-width: 65em) {
          .content {
            display: grid;
            grid-template-columns: var(--grid-lg);
            grid-column-gap: 1rem;
          }

          .form__wrapper {
            grid-column: 6 / 14;
            margin-top: 0;
          }
        }
      `}</style>
      <style jsx>{`
        :global(form) {
          max-width: ${formStep == 3 ? '40rem' : '28rem'};
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
