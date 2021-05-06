import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { Button } from '@components/button';

export default function () {
  const { t } = useTranslation('404');
  const pageMeta = { title: t('pageMeta.title'), desc: t('pageMeta.desc') };

  return (
    <>
      <BaseLayout pageMeta={pageMeta} className='404'>
        <section className='[ align-center wrapper flow ]'>
          <h1 className='[ title ] [ text-600 md:text-700 lg:text-800 ] [ measure-micro leading-flat md:tracking-tight lg:tracking-flat ]'>
            404
          </h1>
          <p className='[ subtitle ] [ text-400 lg:text-500 ] [ measure-compact ]'>
            {t('text')}
          </p>
          <Button href='/'>{t('backButton')}</Button>
        </section>
      </BaseLayout>
      <style jsx>{`
        section {
          --flow-space: 2rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-conten: center;
        }
      `}</style>
      <style jsx global>{`
        main {
          display: grid;
          place-content: center;
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'site', '404'])),
    },
  };
};
