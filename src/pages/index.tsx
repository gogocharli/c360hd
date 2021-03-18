import type { GetStaticProps } from 'next';
import Head from 'next/head';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '../_layouts/base';

export default function Home() {
  const { t } = useTranslation('home');
  return (
    <BaseLayout>
      <Head>
        <title>C360HD</title>
      </Head>
      <section>
        <h1 className={`text-600 md:text-700 lg:text-800 weight-bold`}>
          {t('hero.title')}
        </h1>
        <p>{t('hero.desc')}</p>
      </section>
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
};
