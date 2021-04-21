import { useFormContext, RegisterOptions } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import formStyles from './styles.module.scss';
import { ErrorText } from './error-text';
export interface businessInfo {
  businessName: string;
  decisionMaker: string;
  address: string;
  primaryNumber: string;
  secondaryNumber: string;
  email: string;
}

export interface productInfo {
  product: 'classic' | 'special';
  date: string;
  repId: string;
  lang: 'en' | 'fr';
}

export type FormInputs = businessInfo & productInfo;

export function FormField({
  type = 'text',
  name,
  label,
  defaultValue,
  rules = { required: true },
  className = '',
  children,
  options,
}: {
  type?: InputType;
  name: keyof FormInputs;
  label: string;
  rules?: RegisterOptions;
  defaultValue?: string | number;
  className?: string;
  options?: { name: string; value: string | number }[];
  children?: React.ReactNode;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();
  return (
    <>
      <div className={formStyles.field}>
        {type !== 'fieldset' && (
          <label htmlFor={name} className={`field-label ${className}`}>
            {label}
          </label>
        )}
        {type == 'select' ? (
          <select
            id={name}
            defaultValue={defaultValue}
            {...register(name, rules)}
          >
            {children}
          </select>
        ) : type == 'textarea' ? (
          <textarea
            id={name}
            defaultValue={defaultValue}
            cols={20}
            rows={5}
            {...register(name, rules)}
          />
        ) : type == 'fieldset' ? (
          <fieldset>
            <legend>{label}</legend>
            {options.map((opt) => (
              <div>
                <label
                  htmlFor={opt.name}
                  className={`field-label ${className}`}
                >
                  {opt.name}
                </label>
                <input
                  type='radio'
                  id={opt.name}
                  {...register(name, rules)}
                  value={opt.value}
                />
              </div>
            ))}
          </fieldset>
        ) : type == 'phone' ? (
          <input
            type={type}
            id={name}
            defaultValue={defaultValue}
            {...register(name, rules)}
            inputMode='numeric'
            pattern='[0-9]*'
          />
        ) : (
          <input
            type={type}
            id={name}
            defaultValue={defaultValue}
            {...register(name, rules)}
          />
        )}
        <ErrorMessage errors={errors} name={name} as={<ErrorText />} />
      </div>
    </>
  );
}

type InputType =
  | 'text'
  | 'phone'
  | 'email'
  | 'date'
  | 'checkbox'
  | 'select'
  | 'textarea'
  | 'fieldset';
