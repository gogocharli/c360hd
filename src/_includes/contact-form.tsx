import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

export function ContactForm() {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
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
      <form name='contact' className='flow' onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <label htmlFor='company' className='field-label'>
            {t('form.company.name')}
          </label>
          <input type='text' name='company' id='company' />
        </div>
        <div className='field'>
          <label htmlFor='fullName' className='field-label'>
            {t('form.fullName.name')}
          </label>
          <input type='text' name='fullName' id='fullName' />
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
          />
        </div>
        <div className='field'>
          <label htmlFor='email' className='field-label'>
            {t('form.email.name')}
          </label>
          <input type='email' autoComplete='email' name='email' id='email' />
        </div>
        <div className='field'>
          <label htmlFor='subject' className='field-label'>
            {t('form.subject.name')}
          </label>
          <select name='subject' id='subject'>
            <option value={t('form.subject.options.0') as string}>
              {t('form.subject.options.0')}
            </option>
            <option value={t('form.subject.options.1') as string}>
              {t('form.subject.options.1')}
            </option>
            <option value={t('form.subject.options.2') as string}>
              {t('form.subject.options.2')}
            </option>
          </select>
        </div>
        <div className='field'>
          <label htmlFor='message' className='field-label'>
            {t('form.message.name')}
          </label>
          <textarea name='message' id='message' cols={30} rows={10}></textarea>
        </div>
        <input type='submit' value={t('form.submit') as string} />
      </form>
    </>
  );
}

interface Inputs {
  company: string;
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}
