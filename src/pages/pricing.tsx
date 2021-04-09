import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { Questions } from '@includes/questions';
import { Product } from '@components/Products/product';

export default function Pricing() {
  const { t } = useTranslation('pricing');
  const pageMeta = { title: t('pageTitle') };

  return (
    <>
      <BaseLayout pageMeta={pageMeta} className='pricing'>
        <section className='[ hero ] [ align-center wrapper flow ]'>
          <h1 className='[ title ] [ text-600 md:text-700 lg:text-800 ] [ measure-micro leading-flat ]'>
            {t('hero.title')}
          </h1>
          <p className='[ subtitle ] [ text-400 lg:text-500 ] [ measure-compact ]'>
            {t('hero.subtitle.0')}
            <br />
            {t('hero.subtitle.1')}
          </p>
        </section>
        <article className='[ products ] [ wrapper ]'>
          <Product name='classic' />
          <Product name='special' />
        </article>
        <Questions />
      </BaseLayout>
      <style jsx>{`
        .hero {
          --flow-space: 1.5rem;

          padding-top: 4.5rem;
        }

        .hero > * {
          margin-left: auto;
          margin-right: auto;
        }

        .products {
          align-items: flex-start;
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          padding-bottom: 2rem;
          padding-top: 2rem;
        }

        .products > :global(* + *) {
          margin-top: 1rem;
        }

        @media (min-width: 50em) {
          .hero {
            --flow-space: 2rem;
          }

          .hero .title {
            max-width: 16ch;
          }

          .hero .subtitle {
            max-width: 40ch;
          }

          .products {
            margin-top: 5rem;
            padding-bottom: 0;
            padding-top: 0;
          }

          .products > :global(* + *) {
            margin-left: 1rem;
            margin-top: 0;
          }
        }

        @media (min-width: 65em) {
          .hero .subtitle {
            line-height: 1.5;
          }

          .products {
            margin-top: 5.5rem;
          }
        }
      `}</style>
    </>
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
