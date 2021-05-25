import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Button } from '@components/button';
import { ErrorText } from '@components/Form/error-text';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onSubmit', reValidateMode: 'onChange' });
  const { t } = useTranslation('contact');

  /* Submit form to netlify */
  function onSubmit(data: FormInputs) {
    window
      .fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // @ts-ignore
        body: new URLSearchParams(data).toString(),
      })
      .then(() => reset(), console.log);
  }

  return (
    <>
      <div className='form__wrapper flow'>
        <div className='form__heading flow'>
          <h3 className='text-550 leading-flat'>{t('form.title')}</h3>
          <p className='text-300'>{t('form.desc')}</p>
        </div>
        <form
          name='contact'
          method='POST'
          data-netlify='true'
          className='flow'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='field'>
            <label htmlFor='company' className='field-label'>
              {t('form.company.name')}
            </label>
            <input
              type='text'
              id='company'
              {...register('company', {
                required: `${t('form.company.error.required')}`,
              })}
            />
            <ErrorMessage errors={errors} name='company' as={<ErrorText />} />
          </div>
          <div className='field'>
            <label htmlFor='fullName' className='field-label'>
              {t('form.fullName.name')}
            </label>
            <input
              type='text'
              id='fullName'
              {...register('fullName', {
                required: `${t('form.fullName.error.required')}`,
              })}
            />
            <ErrorMessage errors={errors} name='fullName' as={<ErrorText />} />
          </div>
          <div className='field'>
            <label htmlFor='phone' className='field-label'>
              {t('form.phone.name')}
            </label>
            <input
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              autoComplete='tel'
              id='phone'
              {...register('phone', {
                required: `${t('form.phone.error.required')}`,
              })}
            />
            <ErrorMessage errors={errors} name='phone' as={<ErrorText />} />
          </div>
          <div className='field'>
            <label htmlFor='email' className='field-label'>
              {t('form.email.name')}
            </label>
            <input
              type='email'
              autoComplete='email'
              id='email'
              {...register('email', {
                required: `${t('form.email.error.required')}`,
              })}
            />
            <ErrorMessage errors={errors} name='email' as={<ErrorText />} />
          </div>
          <div className='field'>
            <label htmlFor='subject' className='field-label'>
              {t('form.subject.name')}
            </label>
            <select id='subject' defaultValue='info' {...register('subject')}>
              <option value='payment'>{t('form.subject.options.0')}</option>
              <option value='tours'>{t('form.subject.options.1')}</option>
              <option value='info'>{t('form.subject.options.2')}</option>
            </select>
          </div>
          <div className='field'>
            <label htmlFor='message' className='field-label'>
              {t('form.message.name')}
            </label>
            <textarea
              id='message'
              cols={30}
              rows={10}
              {...register('message', {
                required: `${t('form.message.error.required')}`,
                minLength: {
                  value: 20,
                  message: `${t('form.message.error.minLength')}`,
                },
              })}
            />
            <ErrorMessage errors={errors} name='message' as={<ErrorText />} />
          </div>
          <Button type='secondary' form>{`${t('form.submit')}`}</Button>
        </form>
      </div>
      <style jsx>{`
        .form__wrapper {
          --flow-space: 2.5rem;
          --theme-color-bg: var(--color-light-main);
          --theme-color-fg: var(--color-dark-main);
          --theme-color-hg: var(--color-light-highlight);

          background-color: hsl(var(--theme-color-bg));
          border-radius: 16px;
          color: hsl(var(--theme-color-fg));
          margin-left: auto;
          margin-right: auto;
          max-width: 33rem;
          padding: 3rem 2rem;
        }

        .form__heading {
          --flow-space: 1.5rem;
        }

        form {
          --border-color: 206 80% 86%;
        }

        .field {
          display: flex;
          flex-direction: column;
        }

        .field > *:not(label):focus {
          box-shadow: 0px 0px 3px 2px #0870ee, inset 8px 0px 4px #0870ee;
        }

        label {
          font-size: 1rem;
          font-feature-settings: 'ss02' off;
          line-height: 1;
          margin-bottom: 1rem;
        }

        input:not([type='submit']),
        select,
        textarea {
          border: 0;
          box-shadow: 0;
          background: 0;

          border: 1px solid hsl(var(--border-color));
          border-radius: 4px;
          color: hsl(var(--theme-color-fg));
          line-height: 1.2;
        }

        input:not([type='submit']),
        textarea {
          padding: 0.75rem 1rem;
        }

        select {
          font-size: 1rem;
          min-height: 3rem;
          padding-left: 0.5rem;
        }

        form > :global(.button) {
          --default-bg: var(--color-dark-main);
          --default-color: var(--color-light-main);
          --hover-bg: var(--color-dark-main);
          --hover-color: var(--color-light-main);

          cursor: pointer;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </>
  );
}

enum SubjectEnum {
  payment = 'payment',
  tours = 'tours',
  info = 'info',
}
interface FormInputs {
  company: string;
  fullName: string;
  phone: string;
  email: string;
  subject: SubjectEnum;
  message: string;
}
