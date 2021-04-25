import { useTranslation } from 'next-i18next';
import { FormField } from '@components/Form/form-field';

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
