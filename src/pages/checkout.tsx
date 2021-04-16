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
  RegisterOptions,
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
  return (
    <>
      <FormField name='businessName' label='Company Name' />
      <FormField name='decisionMaker' label='Decision Maker' />
      <FormField name='streetNumber' label='Street Number' />
      <FormField name='streetName' label='Street Name' />
      <FormField
        type='select'
        name='province'
        label='Province'
        defaultValue='QC'
      >
        {CANADIAN_PROVINCES.map((province) => (
          <option value={province} key={province}>
            {province}
          </option>
        ))}
      </FormField>
      <FormField name='postalCode' label='Postal Code' />
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
        defaultValue={product as string}
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

  return <pre>{JSON.stringify(fields, null, 2)}</pre>;
}

function FormField({
  type = 'text',
  name,
  label,
  defaultValue,
  validation = { required: true },
  className = '',
  children,
  ...otherProps
}: {
  type?: InputType;
  name: keyof FormInputs;
  label: string;
  validation?: RegisterOptions;
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
          <select
            id={name}
            defaultValue={defaultValue}
            {...register(name, validation)}
            {...otherProps}
          >
            {children}
          </select>
        ) : type == 'textarea' ? (
          <textarea
            id={name}
            defaultValue={defaultValue}
            cols={20}
            rows={5}
            {...register(name, validation)}
            {...otherProps}
          />
        ) : (
          <input
            type={type}
            id={name}
            defaultValue={defaultValue}
            {...register(name, validation)}
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
