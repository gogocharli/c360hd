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
  addInfo: string;
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
  ...otherProps
}: {
  type?: InputType;
  name: keyof FormInputs;
  label: string;
  rules?: RegisterOptions;
  defaultValue?: string | number;
  className?: string;
  children?: React.ReactNode;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();
  return (
    <>
      <div className={formStyles.field}>
        <label htmlFor={name} className={`field-label ${className}`}>
          {label}
        </label>
        {type == 'select' ? (
          <select
            id={name}
            defaultValue={defaultValue}
            {...register(name, rules)}
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
            {...register(name, rules)}
            {...otherProps}
          />
        ) : (
          <input
            type={type}
            id={name}
            defaultValue={defaultValue}
            {...register(name, rules)}
            {...otherProps}
          />
        )}
        <ErrorMessage errors={errors} name={name} as={<ErrorText />} />
      </div>
    </>
  );
}

type InputType = 'text' | 'date' | 'checkbox' | 'select' | 'textarea';
