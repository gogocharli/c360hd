import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export function ContactForm() {
  const { register, handleSubmit, watch, errors } = useForm<FormInputs>();
  const { t } = useTranslation('contact');

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <div className='form__heading'>
        <h3>{t('form.title')}</h3>
        <p>{t('form.desc')}</p>
      </div>
      <form
        name='contact'
        method='POST'
        data-netlify-form='true'
        className='flow'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='field'>
          <label htmlFor='company' className='field-label'>
            {t('form.company.name')}
          </label>
          <input
            type='text'
            name='company'
            id='company'
            ref={register({
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
            name='fullName'
            id='fullName'
            ref={register({ required: `${t('form.fullName.error.required')}` })}
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
            name='phone'
            id='phone'
            ref={register({ required: `${t('form.phone.error.required')}` })}
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
            name='email'
            id='email'
            ref={register({ required: `${t('form.email.error.required')}` })}
          />
          <ErrorMessage errors={errors} name='email' as={<ErrorText />} />
        </div>
        <div className='field'>
          <label htmlFor='subject' className='field-label'>
            {t('form.subject.name')}
          </label>
          <select
            name='subject'
            id='subject'
            defaultValue='info'
            ref={register}
          >
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
            name='message'
            id='message'
            cols={30}
            rows={10}
            ref={register({
              required: `${t('form.message.error.required')}`,
              minLength: `${t('form.message.error.minLength')}`,
            })}
          />
          <ErrorMessage errors={errors} name='email' as={<ErrorText />} />
        </div>
        <input type='submit' value={`${t('form.submit')}`} />
      </form>
    </>
  );
}

function ErrorText({ children }: { children?: React.ReactNode }) {
  return <span className='field__error'>{children}</span>;
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
