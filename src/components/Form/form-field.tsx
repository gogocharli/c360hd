import { useFormContext, RegisterOptions } from 'react-hook-form';
import formStyles from './styles.module.scss';
export interface businessInfo {
  businessName: string;
  decisionMaker: string;
  address: string;
  primaryPhone: string;
  mobilePhone: string;
  email: string;
}

export interface productInfo {
  productName: 'classic' | 'special';
  date: string;
  time: string;
  salesRep: string;
  addInfo: string;
}

export type FormInputs = businessInfo & productInfo;

export function FormField({
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
      <div className={formStyles.field}>
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
      <style jsx>{``}</style>
    </>
  );
}

type InputType = 'text' | 'date' | 'checkbox' | 'select' | 'textarea';
