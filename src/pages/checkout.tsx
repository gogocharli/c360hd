import React, { useState, useEffect } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm, FormProvider } from 'react-hook-form';

import Layout from '@layouts/checkout';
import { Button } from '@components/button';
import { FormInputs } from '@components/Form/form-field';
import Arrow from '@components/icon-arrow-right.svg';

import { form } from '@components/Form/styles.module.scss';
import { Timeline } from '@includes/timeline';
import {
  BusinessInfo,
  ContactInfo,
  OrderInfo,
  Payment,
  ReviewInfo,
} from '@includes/checkout-form';

const paths = ['business', 'contact', 'order', 'review', 'checkout'];

export default function Checkout() {
  const router = useRouter();
  const { asPath, query } = router;
  const [formStep, setFormStep] = useState(0);
  const [defaultProduct] = useState(() => (query.product as string) ?? '');
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

  const methods = useForm<FormInputs>({
    defaultValues: {
      businessName: '',
      decisionMaker: '',
      address: '',
      primaryNumber: '',
      secondaryNumber: '',
      email: '',
      product: defaultProduct == 'special' ? 'special' : 'classic',
      date: '',
      repId: '',
      lang: router.locale == 'fr' ? 'fr' : 'en',
    },
    mode: 'onBlur',
  });
  const {
    control,
    formState: { errors },
  } = methods;

  /**
   * Select section and navigate using the current step
   */
  function navigate(direction: 'previous' | 'next') {
    const hash =
      direction == 'previous' ? paths[formStep - 1] : paths[formStep + 1];

    if (direction == 'next' && !currentStepIsValid) return;

    router.push(`#${hash}`, null, { shallow: true });
  }

  function currentStepIsValid() {
    return Object.keys(errors).length == 0;
  }

  const { t } = useTranslation('checkout');
  return (
    <Layout pageMeta={{ title: 'Checkout' }}>
      <div className='multi-form wrapper flow'>
        <Timeline step={formStep} />
        <section className='content'>
          <div className='[ info ] [ flow align-center ]'>
            <h1 className='[ text-600 ] [ tracking-tight leading-flat measure-micro ]'>
              {t(`steps.${formStep}.title`)}
            </h1>
            <p className='text-300 measure-short'>
              {t(`steps.${formStep}.desc`)}
            </p>
            <p className='[ count ] [ weight-bold text-300 ] '>
              {formStep + 1} / 5
            </p>
          </div>
          <div className='form__wrapper'>
            <FormProvider {...methods}>
              <form className={`${form}`} action='post'>
                {formStep == 0 && <BusinessInfo />}
                {formStep == 1 && <ContactInfo />}
                {formStep == 2 && <OrderInfo />}
                {formStep == 3 && <ReviewInfo control={control} />}
                {formStep == 4 && <Payment />}
              </form>
            </FormProvider>
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
              {formStep < 4 && (
                <Button
                  className='next'
                  onClick={() => {
                    currentStepIsValid() && navigate('next');
                  }}
                >
                  <span className='visually-hidden'>{t('buttons.next')}</span>
                  <div className='icon'>
                    <Arrow width={24} />
                  </div>
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

        .info {
          --flow-space: 1rem;

          background-color: hsl(var(--theme-color-hg));
          border-radius: var(--border-radius);
          padding: 2.5rem 0.5rem;
        }

        .info > * {
          margin-left: auto;
          margin-right: auto;
        }

        .info .count {
          background-color: hsl(220 35% 44%);
          border-radius: 2em;
          letter-spacing: -0.1em;
          line-height: 1;
          padding: 1rem 1.5rem;
          margin-top: calc(var(--flow-space) * 2);
          width: fit-content;
        }

        .form__wrapper {
          --flow-space: 2.5rem;
          --theme-color-bg: var(--color-light-main);
          --theme-color-fg: var(--color-dark-main);
          --theme-color-hg: var(--color-light-highlight);

          background-color: hsl(var(--theme-color-bg));
          border-radius: var(--border-radius);
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

        @media (min-width: 65em) {
          .content {
            display: grid;
            grid-template-columns: var(--grid-lg);
            grid-column-gap: 1rem;
          }

          .info {
            display: flex;
            flex-direction: column;
            grid-column: 1 / span 5;
            place-content: center;
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
