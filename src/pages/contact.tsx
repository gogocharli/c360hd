import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { Questions } from '@includes/questions';
import { ContactForm } from '@includes/contact-form';

export default function Pricing() {
  const { t } = useTranslation('contact');
  const { t: s } = useTranslation('site');
  const pageMeta = { title: t('pageTitle') };

  return (
    <BaseLayout pageMeta={pageMeta}>
      <section className='hero'>
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
      </section>
      <article className='contact'>
        <a className='button' href={`mailto:${s('email')}`}>
          {s('email')}
        </a>
        <a className='button' href={`tel:${s('phone')}`}>
          {s('phone')}
        </a>
        <ContactForm />
      </article>
      <Questions />
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'contact',
        'questions',
        'site',
      ])),
    },
  };
};
