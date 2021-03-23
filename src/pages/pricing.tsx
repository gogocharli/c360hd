import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { Questions } from '@includes/questions';
import { Product } from '@components/Products';

export default function Pricing() {
  const { t } = useTranslation('pricing');
  const pageMeta = { title: t('pageTitle') };

  return (
    <BaseLayout pageMeta={pageMeta}>
      <section className='hero'>
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
      </section>
      <article className='pricing'>
        <Product name='classic' />
        <Product name='special' />
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
        'pricing',
        'questions',
        'site',
      ])),
    },
  };
};
