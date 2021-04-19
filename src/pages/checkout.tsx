import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm, FormProvider, useWatch, Control } from 'react-hook-form';

import Layout from '@layouts/checkout';
import { Button } from '@components/button';
import { AddressAutoComplete } from '@components/Form/auto-complete';
import { FormField, FormInputs } from '@components/Form/form-field';

import { form } from '@components/Form/styles.module.scss';

// Programmatically add those
export default function Checkout() {
  const [formStep, setFormStep] = useState(0);

  function onSubmit(data: any) {
    console.log(data);
  }

  const methods = useForm<FormInputs>({
    defaultValues: {
      businessName: '',
      decisionMaker: '',
      address: '',
      primaryPhone: '',
      mobilePhone: '',
      email: '',
      date: '',
      time: '',
      salesRep: '',
      addInfo: '',
    },
    mode: 'onBlur',
  });

  // Use the form state to validate the page's inputs

  const { control } = methods;
  return (
    <Layout pageMeta={{ title: 'Checkout' }}>
      <div className='wrapper'>
        <Timeline step={formStep} />
        <section className='content'>
          <div className='[ info ] [ flow align-center ]'>
            <h1 className='[ text-600 ] [ tracking-tight leading-flat ]'>
              Business Information
            </h1>
            <p className='text-300 measure-short'>
              Tell us more about you and your business so we can communicate
              better with you about each step of the process.
            </p>
            <p className='[ count ] [ weight-bold text-300 ] '>
              {formStep + 1} / 5
            </p>
          </div>
          <div className='form__wrapper'>
            <FormProvider {...methods}>
              <form className={form} action='post'>
                {formStep == 0 && <ClientInfo />}
                {formStep == 1 && <ContactInfo />}
                {formStep == 2 && <OrderInfo />}
                {formStep == 3 && <ReviewInfo control={control} />}
                {formStep == 4 && <h1>Checkout</h1>}
              </form>
            </FormProvider>
            <div className='buttons'>
              {formStep > 0 && (
                <Button
                  className='previous'
                  onClick={() => setFormStep((s) => s - 1)}
                >
                  Previous Step
                </Button>
              )}
              {formStep < 4 && (
                <Button
                  className='next'
                  onClick={() => setFormStep((s) => s + 1)}
                >
                  Next Step
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>
      <style jsx>{`
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

        .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 2.5rem;
        }

        :global(.button) {
          --default-color: var(--color-dark-main);
        }

        .buttons > :global(.previous) {
          margin-right: auto;
        }

        .buttons > :global(.next) {
          margin-left: auto;
        }
      `}</style>
    </Layout>
  );
}

function Timeline({ step }: { step: number }) {
  return (
    <section>
      <div>
        <ol className='timeline'>
          <li data-complete={step > 0}>Business Info</li>
          <li data-complete={step > 1}>Contact Info</li>
          <li data-complete={step > 2}>Order Info</li>
          <li data-complete={step > 3}>Review Order</li>
          <li data-complete={step > 4}>Checkout</li>
        </ol>
      </div>

      <style jsx>{`
        div {
          overflow: hidden;
        }

        ol {
          display: flex;
        }

        li + li {
          margin-left: 2rem;
        }

        [data-complete='true'] {
          background-color: hsl(var(--theme-color-hg));
        }
      `}</style>
    </section>
  );
}

/**
 * Client information such as name, address, and contact
 */
function ClientInfo() {
  return (
    <>
      <FormField name='businessName' label='Company Name' />
      <FormField name='decisionMaker' label='Decision Maker' />
      <AddressAutoComplete />
    </>
  );
}

function ContactInfo() {
  return (
    <>
      <FormField name='primaryPhone' label='Primary Phone' />
      <FormField name='mobilePhone' label='Mobile Phone' />
      <FormField name='email' label='E-mail' />
    </>
  );
}

/**
 * Form step for information related to the order
 */
function OrderInfo() {
  const {
    query: { product },
  } = useRouter();
  return (
    <>
      <FormField
        type='select'
        name='productName'
        label='Product Name'
        defaultValue={(product as string) ?? ''}
      >
        <option value='classic'>Classic</option>
        <option value='special'>Special</option>
      </FormField>
      <FormField type='date' name='date' label='Date' />
      <FormField name='salesRep' label='Agent Name' />
      <FormField type='textarea' name='addInfo' label='Additional Info' />
    </>
  );
}

/**
 * Allow users to review their information before submitting
 */
function ReviewInfo({ control }: { control: Control<FormInputs> }) {
  const fields = useWatch({
    control,
  });

  return (
    <div style={{ overflowX: 'hidden' }}>
      <pre style={{ color: 'blue' }}>{JSON.stringify(fields, null, 2)}</pre>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'site'])),
    },
  };
};
