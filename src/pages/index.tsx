import type { GetStaticProps } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '../_layouts/base';
import { JourneyHighlights } from '@components/journey';
import { HomeCarousel } from '@components/carousel';
import { Features } from '@components/features';
import { Button } from '@components/button';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <>
      <BaseLayout className='home'>
        <section className='[ hero ] [ flow align-center ]'>
          <h1 className='[ text-600 md:text-700 lg:text-800 weight-bold ] [ leading-flat tracking-tight measure-micro ]'>
            {t('hero.title')}
          </h1>
          <p className='measure-short leading-loose'>{t('hero.subtitle')}</p>
          <Button href='/pricing'>{t('hero.btnText')}</Button>
        </section>
        <article id='journey' className='[ journey ] [ wrapper ]'>
          <h2 className='[ text-550 md:text-600 ] [ align-center measure-compact leading-flat md:tracking-tight ]'>
            {t('sections.0.title')}
          </h2>
          {/* @todo include image animation here */}
          <JourneyHighlights />
        </article>
        <article id='basics' className='[ basics ] [ wrapper ]'>
          <h2>
            <span className='[ subtitle ] [ text-200  md:text-300 weight-normal ] [ tracking-loose upper ]'>
              {t('sections.1.subtitle')}
            </span>
            <br />
            <span className='[ title ] [ text-550 md:text-600 ] [ leading-flat ]'>
              {t('sections.1.title')}
            </span>
          </h2>
          <p className='[ text-300 ] [ measure-short ]'>
            {t('sections.1.desc')}
          </p>
          <HomeCarousel />
        </article>
        <article id='features' className='[ features ] [ flow ]'>
          <h2 className='[ text-600 md:text-800 ] [ leading-flat tracking-tight md:tracking-flat measure-micro align-center ]'>
            {t('sections.2.title')}
          </h2>
          <Features />
          <Button href='/pricing'>{t('sections.2.btnText')}</Button>
        </article>
        <article id='realisations' className='[ realisations ] [ flow ]'>
          <h3 className='text-550 leading-flat'>{t('sections.3.title')}</h3>
          <p>{t('sections.3.desc')}</p>
          <Button href='/portfolio'>{t('sections.3.btnText')}</Button>
        </article>
      </BaseLayout>

      <style jsx>{`
        .hero {
          --flow-space: 2rem;

          background-color: hsl(var(--theme-color-bg));
          color: hsl(var(--theme-color-fg));
          display: flex;
          flex-direction: column;
          padding: 4.5rem 0.5rem;
        }

        .hero > *,
        .journey h2,
        .features h2 {
          margin-left: auto;
          margin-right: auto;
        }

        .features,
        .realisations {
          display: flex;
          flex-direction: column;
        }
      `}</style>

      <style jsx global>{`
        :root {
          --theme-color-bg: var(--color-light-main);
          --theme-color-fg: var(--color-dark-main);
          --theme-color-hg: var(--color-light-highlight);
          --theme-color-tint: var(--color-light-tint);

          background-color: hsl(var(--theme-color-bg));
          color: hsl(var(--theme-color-fg));
        }

        .hero a.button,
        .features a.button,
        .realisations a.button {
          align-self: center;
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
