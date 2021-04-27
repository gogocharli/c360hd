import { useFormContext, RegisterOptions, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorText } from './error-text';
import Datepicker from 'react-datepicker';
import { DateTime } from 'luxon';
import 'react-datepicker/dist/react-datepicker.css';
import formStyles from './styles.module.scss';
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
  date: Date;
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
      <div
        className={`${formStyles.field} ${type == 'date' && formStyles.date}`}
      >
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
              <div key={opt.value}>
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
        ) : type == 'date' ? (
          <Controller
            name={name}
            rules={rules}
            render={({ field }) => (
              <Datepicker
                {...field}
                selected={field.value}
                showTimeSelect
                dateFormat='d MMMM, yy h:mm aa'
                filterDate={(date) => {
                  const today = DateTime.now();
                  const selectedDay = DateTime.fromJSDate(date, {
                    zone: 'America/Toronto',
                  });

                  /* 
                    This doesn't exactly work as you'd expect
                    you can only know whether the exact time is not now.
                    Calculating it properly would require knowing the exact
                    number of the date in the year and even that would cause problems.
                    I'll write it later but for now this is good enough.
                  */
                  const isNotToday = selectedDay.toMillis() > today.toMillis();
                  const selectedWeekDay = selectedDay.weekday;
                  return selectedWeekDay < 6 && isNotToday;
                }}
                filterTime={(time) => {
                  // is between 9 and 5
                  const hour = DateTime.fromJSDate(time).hour;
                  return hour >= 9 && hour <= 17;
                }}
              />
            )}
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

export const TOMORROW = DateTime.now()
  .set({ hour: 8, minute: 30 })
  .plus({ days: 1 })
  .toJSDate();

type InputType =
  | 'text'
  | 'phone'
  | 'email'
  | 'date'
  | 'checkbox'
  | 'select'
  | 'textarea'
  | 'fieldset';
