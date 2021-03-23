import type { GetStaticProps } from 'next';
import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '../_layouts/base';
import { JourneyHighlights } from '@components/journey';
import { HomeCarousel } from '@components/carousel';
import { Features } from '@components/features';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <>
      <BaseLayout>
        <section className='hero'>
          <h1 className={`text-600 md:text-700 lg:text-800 weight-bold`}>
            {t('hero.title')}
          </h1>
          <p>{t('hero.desc')}</p>
          <Link href='/pricing'>
            <a>{t('hero.btnText')}</a>
          </Link>
        </section>
        <article id='journey'>
          <h2>{t('sections.0.title')}</h2>
          {/* @todo include image animation here */}
          <JourneyHighlights />
        </article>
        <article id='basics'>
          <h2>
            <span className='subtitle'>{t('sections.1.subtitle')}</span>
            <br />
            {t('sections.1.title')}
          </h2>
          <p>{t('sections.1.desc')}</p>
          <HomeCarousel />
        </article>
        <article id='features'>
          <h2>{t('sections.2.title')}</h2>
          <Features />
          <Link href='/pricing'>
            <a>{t('sections.2.btnText')}</a>
          </Link>
        </article>
        <article id='realisations'>
          <h3>{t('sections.3.title')}</h3>
          <p>{t('sections.3.desc')}</p>
          <Link href='/portfolio'>
            <a>{t('sections.3.btnText')}</a>
          </Link>
        </article>
      </BaseLayout>

      <style jsx>{`
        .hero {
          color: hsl(var(--color-dark-main));
          background-color: hsl(var(--color-light-main));
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home', 'site'])),
    },
  };
};
