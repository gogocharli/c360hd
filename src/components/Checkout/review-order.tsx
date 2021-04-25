import { useTranslation } from 'next-i18next';
import { FormInputs } from '@components/Form/form-field';
import { UseFormGetValues } from 'react-hook-form';

/**
 * Allow users to review their information before submitting
 */
export function ReviewOrder({
  locale,
  getValues,
}: {
  locale: string;
  getValues: UseFormGetValues<FormInputs>;
}) {
  const fields = getValues();
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
