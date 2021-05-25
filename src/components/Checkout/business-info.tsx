import { useTranslation } from 'next-i18next';
import { FormField } from '@components/Form/form-field';
import { AddressAutoComplete } from '@components/Form/auto-complete';
import { useScript } from 'hooks/useScript';

const MAPS_API = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;

/**
 * Client information such as name, address, and contact
 */
export function BusinessInfo() {
  const { t } = useTranslation('checkout');
  const status = useScript(MAPS_API);
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
      {/* Fallback to text input if the auto-complete fails to load */}
      {status == 'ready' ? (
        <AddressAutoComplete />
      ) : (
        <FormField
          name='address'
          label={t('form.address.name')}
          rules={{ required: `${t('form.address.error.required')}` }}
        />
      )}
    </>
  );
}
