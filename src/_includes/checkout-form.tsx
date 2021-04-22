import { useTranslation } from 'next-i18next';

import { AddressAutoComplete } from '@components/Form/auto-complete';
import { FormField, FormInputs } from '@components/Form/form-field';
import { Control, useWatch } from 'react-hook-form';
import { useScript } from 'hooks/useScript';

/**
 * Client information such as name, address, and contact
 */
export function BusinessInfo() {
  const { t } = useTranslation('checkout');
  const status = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`,
  );
  return (
    <>
      <FormField
        name='businessName'
        label={`${t('form.businessName.name')}`}
        rules={{ required: `${t('form.businessName.error.required')}` }}
      />
      <FormField
        name='decisionMaker'
        label={`${t('form.decisionMaker.name')}`}
        rules={{ required: `${t('form.decisionMaker.error.required')}` }}
      />
      {status == 'ready' && <AddressAutoComplete />}
    </>
  );
}

export function ContactInfo() {
  const { t } = useTranslation('checkout');
  return (
    <>
      <FormField
        type='phone'
        name='primaryNumber'
        label={`${t('form.primaryNumber.name')}`}
        rules={{ required: `${t('form.primaryNumber.error.required')}` }}
      />
      <FormField
        type='phone'
        name='secondaryNumber'
        label={`${t('form.secondaryNumber.name')}`}
        rules={{ required: `${t('form.secondaryNumber.error.required')}` }}
      />
      <FormField
        type='email'
        name='email'
        label={`${t('form.email.name')}`}
        rules={{ required: `${t('form.email.error.required')}` }}
      />
    </>
  );
}

/**
 * Form step for information related to the order
 */
export function OrderInfo() {
  const { t } = useTranslation('checkout');
  return (
    <>
      <FormField
        type='select'
        name='product'
        label={`${t('form.product.name')}`}
      >
        <option value='classic'>Classic</option>
        <option value='special'>Special</option>
      </FormField>
      <FormField
        type='date'
        name='date'
        label={`${t('form.date.name')}`}
        rules={{ required: `${t('form.date.error.required')}` }}
      />
      <FormField
        name='repId'
        label={`${t('form.repId.name')}`}
        rules={{ required: false }}
      />
      <FormField
        type='fieldset'
        name='lang'
        label={`${t('form.lang.name')}`}
        rules={{ required: false }}
        options={[
          { name: 'English', value: 'en' },
          { name: 'Français', value: 'fr' },
        ]}
      ></FormField>
    </>
  );
}

/**
 * Allow users to review their information before submitting
 */
export function ReviewInfo({
  control,
  locale,
}: {
  control: Control<FormInputs>;
  locale: string;
}) {
  const fields = useWatch({
    control,
  });
  const { t } = useTranslation('checkout');

  return (
    <>
      <ul className='flow'>
        {Object.entries(fields).map(([field, value]) => {
          if (field == 'lang') {
            value = value == 'fr' ? 'Français' : 'English';
          }

          if (field == 'date') {
            value = new Intl.DateTimeFormat(locale, {
              dateStyle: 'full',
              timeStyle: 'short',
            }).format(value as Date);
          }

          return (
            <li key={field}>
              <span className='weight-bold'>{t(`form.${field}.name`)}:</span>
              <span>{value || '—'}</span>
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        ul {
          --flow-space: 1rem;

          color: hsl(var(--color-dark-main));
          font-feature-settings: 'ss02' off;
          font-size: 1rem;
          width: 100%;
        }

        li {
          display: flex;
        }

        span {
          flex-basis: 50%;
        }
      `}</style>
    </>
  );
}

export function Payment() {
  return (
    <>
      <h2>Pay Up</h2>
    </>
  );
}
