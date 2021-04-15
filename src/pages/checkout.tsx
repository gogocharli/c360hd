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
          {formStep > 0 && (
            <Button
              className='previous'
              onClick={() => setFormStep((s) => s - 1)}
            >
              Previous Step
            </Button>
          )}
          {formStep < 3 && (
            <Button className='next' onClick={() => setFormStep((s) => s + 1)}>
              Next Step
            </Button>
          )}
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

        .buttons > :global(.previous) {
          margin-right: auto;
        }

        .buttons > :global(.next) {
          margin-left: auto;
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
      <FormField
        name='businessName'
        label='Company Name'
        {...register('businessName', { required: true })}
      />
      <FormField
        name='decisionMaker'
        label='Decision Maker'
        {...register('decisionMaker', { required: true })}
      />
      <FormField
        name='streetNumber'
        label='Street Number'
        {...register('streetNumber', { required: true })}
      />
      <FormField
        name='streetName'
        label='Street Name'
        {...register('streetName', { required: true })}
      />
      <FormField
        type='select'
        name='province'
        label='Province'
        defaultValue='QC'
        {...register('province', { required: true })}
      >
        {CANADIAN_PROVINCES.map((province) => (
          <option value={province} key={province}>
            {province}
          </option>
        ))}
      </FormField>
      <FormField
        name='postalCode'
        label='Postal Code'
        {...register('postalCode', { required: true })}
      />
      <FormField
        name='primaryPhone'
        label='Primary Phone'
        {...register('primaryPhone', { required: true })}
      />
      <FormField
        name='mobilePhone'
        label='Mobile Phone'
        {...register('mobilePhone', { required: true })}
      />
      <FormField
        name='email'
        label='E-mail'
        {...register('email', { required: true })}
      />
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
      <FormField
        type='select'
        name='productName'
        label='Product Name'
        defaultValue={product as string}
        {...register('productName', { required: true })}
      >
        <option value='classic'>Classic</option>
        <option value='special'>Special</option>
      </FormField>
      <FormField
        type='date'
        name='date'
        label='Date'
        {...register('date', { required: true })}
      />
      <FormField
        name='salesRep'
        label='Agent Name'
        {...register('salesRep', { required: true })}
      />
      <FormField
        type='textarea'
        name='addInfo'
        label='Additional Info'
        {...register('addInfo', { required: true })}
      />
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
  type = 'text',
  name,
  label,
  defaultValue,
  className = '',
  children,
  ...otherProps
}: {
  type?: InputType;
  name: string;
  label: string;
  defaultValue?: string | number;
  className?: string;
  children?: React.ReactNode;
}) {
  const { register } = useFormContext<FormInputs>();
  return (
    <>
      <div className='field'>
        <label htmlFor={name} className={`field-label ${className}`}>
          {label}
        </label>
        {type == 'select' ? (
          <select id={name} defaultValue={defaultValue} {...otherProps}>
            {children}
          </select>
        ) : type == 'textarea' ? (
          <textarea
            id={name}
            defaultValue={defaultValue}
            cols={20}
            rows={5}
            {...otherProps}
          />
        ) : (
          <input
            type={type}
            id={name}
            defaultValue={defaultValue}
            {...otherProps}
          />
        )}
      </div>
      <style jsx>{`
        label {
          display: block;
        }
      `}</style>
    </>
  );
}

type InputType = 'text' | 'date' | 'checkbox' | 'select' | 'textarea';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'site'])),
    },
  };
};
