import React, { useEffect, useState, useRef } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import {
  useForm,
  FormProvider,
  useFormContext,
  useWatch,
  Control,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Button } from '@components/button';

// Programmatically add those

const CANADIAN_PROVINCES = ['AB', 'BC', 'MB', 'NS', 'ON', 'QC', 'YT'] as const;
type CanadianProvince = typeof CANADIAN_PROVINCES[number];
interface businessInfo {
  businessName: string;
  decisionMaker: string;
  streetNumber: string;
  streetName: string;
  province: CanadianProvince;
  postalCode: string;
  primaryPhone: string;
  mobilePhone: string;
  email: string;
}

interface productInfo {
  productName: 'classic' | 'special';
  date: string;
  time: string;
  salesRep: string;
  addInfo: string;
}

type FormInputs = businessInfo & productInfo;

export default function Checkout() {
  const [formStep, setFormStep] = useState(0);

  function onSubmit(data: any) {
    console.log(data);
  }

  const methods = useForm<FormInputs>({
    defaultValues: {
      businessName: '',
      decisionMaker: '',
      streetNumber: '',
      streetName: '',
      province: 'QC',
      postalCode: '',
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
    <BaseLayout pageMeta={{ title: 'Checkout' }}>
      <div className='wrapper'>
        <Timeline step={formStep} />
        <FormProvider {...methods}>
          <form action='post'>
            {formStep == 0 && <ClientInfo />}
            {formStep == 1 && <OrderInfo />}
            {formStep == 2 && <ReviewInfo control={control} />}
            {formStep == 3 && <h1>Checkout</h1>}
          </form>
        </FormProvider>
        <div className='buttons'>
          <Button onClick={() => setFormStep((s) => Math.max(s - 1, 0))}>
            Previous Step
          </Button>
          <Button onClick={() => setFormStep((s) => Math.min(s + 1, 3))}>
            Next Step
          </Button>
        </div>
      </div>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </BaseLayout>
  );
}

function Timeline({ step }: { step: number }) {
  return (
    <>
      <div>
        <ol className='timeline'>
          <li data-complete={step > 0}>Business Information</li>
          <li data-complete={step > 1}>Order Information</li>
          <li data-complete={step > 2}>Review Order</li>
          <li data-complete={step > 3}>Checkout</li>
        </ol>
      </div>

      <style jsx>{`
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
    </>
  );
}

/**
 * Client information such as name, address, and contact
 */
function ClientInfo() {
  const { register } = useFormContext<businessInfo>();
  return (
    <>
      <FormField name='businessName' label='Company Name'>
        <input
          type='text'
          id='businessName'
          {...register('businessName', { required: true })}
        />
      </FormField>
      <FormField name='decisionMaker' label='Decision Maker'>
        <input
          type='text'
          id='decisionMaker'
          {...register('decisionMaker', { required: true })}
        />
      </FormField>
      <FormField name='streetNumber' label='Street Number'>
        <input
          type='text'
          id='streetNumber'
          {...register('streetNumber', { required: true })}
        />
      </FormField>
      <FormField name='streetName' label='Street Name'>
        <input
          type='text'
          id='streetName'
          {...register('streetName', { required: true })}
        />
      </FormField>
      <FormField name='province' label='Province'>
        <select
          id='province'
          defaultValue='QC'
          {...register('province', { required: true })}
        >
          {CANADIAN_PROVINCES.map((province) => (
            <option value={province} key={province}>
              {province}
            </option>
          ))}
        </select>
      </FormField>
      <FormField name='postalCode' label='Postal Code'>
        <input
          type='text'
          id='postalCode'
          {...register('postalCode', { required: true })}
        />
      </FormField>
      <FormField name='primaryPhone' label='Primary Phone'>
        <input
          type='text'
          id='primaryPhone'
          {...register('primaryPhone', { required: true })}
        />
      </FormField>
      <FormField name='mobilePhone' label='Mobile Phone'>
        <input
          type='text'
          id='mobilePhone'
          {...register('mobilePhone', { required: true })}
        />
      </FormField>
      <FormField name='email' label='E-mail'>
        <input
          type='text'
          id='email'
          {...register('email', { required: true })}
        />
      </FormField>
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
  const { register } = useFormContext<productInfo>();
  return (
    <>
      <FormField name='productName' label='Product Name'>
        <select
          id='productName'
          {...register('productName', { required: true })}
          defaultValue={product}
        >
          <option value='classic'>Classic</option>
          <option value='special'>Special</option>
        </select>
      </FormField>
      <FormField name='date' label='Date'>
        <input
          type='text'
          id='date'
          {...register('date', { required: true })}
        />
      </FormField>
      <FormField name='salesRep' label='Agent Name'>
        <input
          type='text'
          id='salesRep'
          {...register('salesRep', { required: true })}
        />
      </FormField>
      <FormField name='addInfo' label='Additional Info'>
        <textarea
          id='addInfo'
          cols={20}
          rows={5}
          {...register('addInfo', { required: true })}
        />
      </FormField>
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

  return <pre>{JSON.stringify(fields, null, 2)}</pre>;
}

function FormField({
  name,
  label,
  className = '',
  children,
}: {
  name: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='field'>
        <label htmlFor={name} className={`field-label ${className}`}>
          {label}
        </label>
        {children}
      </div>
      <style jsx>{`
        label {
          display: block;
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'site'])),
    },
  };
};
