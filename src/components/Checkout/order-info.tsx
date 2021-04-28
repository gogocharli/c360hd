import { useTranslation } from 'next-i18next';
import { FormField } from '@components/Form/form-field';
import { ValidateResult } from 'react-hook-form';

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
        rules={{
          validate: scheduleIsFree,
        }}
      />
      <FormField
        name='repId'
        label={`${t('form.repId.name')}`}
        rules={{
          required: false,
          validate: agentExists(`${t('form.repId.error.notFound')}`),
        }}
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
      />
    </>
  );
}

// TODO make this more robust. The request failing isn't handled well
const scheduleIsFree = async (date: Date): Promise<ValidateResult> => {
  const isoDate = date.toISOString();
  try {
    const res = await window.fetch(`/api/events?dateTime=${isoDate}`);
    const { isFree, reason } = (await res.json()) as ScheduleResponse;

    if (isFree == false) {
      return reason;
    }
    return isFree;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const agentExists = (error: string) =>
  async function (agentNumber: string): Promise<ValidateResult> {
    try {
      const data = await (
        await window.fetch(`/api/agents?search=${agentNumber}`)
      ).json();

      if (data.errorMessage) {
        return error;
      }

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

interface ScheduleResponse {
  isFree: boolean;
  reason: string | null;
}
