import type { GetStaticProps } from 'next';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '../_layouts/base';
import { JourneyHighlights } from '@components/journey';
import { HomeCarousel } from '@components/carousel';
import { Features } from '@components/features';
import { Button } from '@components/button';
import Arrow from '@components/icon-arrow-right.svg';

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
        <article id='basics' className='basics'>
          <div className='wrapper'>
            <div className='content'>
              <h2>
                <span className='[ subtitle ] [ text-200 md:text-300 weight-normal ] [ tracking-loose upper ]'>
                  {t('sections.1.subtitle')}
                </span>
                <span className='[ title ] [ text-550 md:text-600 ] [ leading-flat ]'>
                  {t('sections.1.title')}
                </span>
              </h2>
              <p className='[ text-300 ] [ measure-short ]'>
                {t('sections.1.desc')}
              </p>
            </div>
            <div className='images'>
              <div className='image'>
                <Image
                  src='/images/compass-img.png'
                  alt=''
                  width={144}
                  height={144}
                  layout='intrinsic'
                  objectFit='contain'
                  className='blend'
                />
              </div>
              <div className='image'>
                <Image
                  src='/images/flashlight-img.png'
                  alt=''
                  width={144}
                  height={144}
                  layout='intrinsic'
                  objectFit='contain'
                  className='blend'
                />
              </div>
            </div>
          </div>
          <HomeCarousel />
        </article>
        <article id='features' className='[ features ] [ flow wrapper ]'>
          <h2
            className='[ text-600 md:text-800 ] [ leading-flat tracking-tight md:tracking-flat measure-micro align-center ]'
            dangerouslySetInnerHTML={{
              __html: t('sections.2.title', {
                open: '<span class="ital">',
                close: '</span>',
              }),
            }}
          />
          <Features />
          <Button href='/pricing'>{t('sections.2.btnText')}</Button>
        </article>
        <article
          id='realisations'
          className='[ realisations ] [ flow align-center ]'
        >
          <div className='content'>
            <h3 className='text-550 leading-flat'>{t('sections.3.title')}</h3>
            <p className='text-300 lg:text-400'>{t('sections.3.desc')}</p>
          </div>
          <Button href='/portfolio'>
            <span>{t('sections.3.btnText')}</span>
            <Arrow className='icon' width={16} />
          </Button>
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

        .basics {
          padding-top: 2rem;
          padding-bottom: 2rem;
          position: relative;
        }

        .basics h2 > span {
          display: block;
        }

        .basics .title {
          margin-top: 0.5rem;
          max-width: 15ch;
        }

        .basics .subtitle {
          color: hsl(var(--theme-color-accent));
        }

        .basics p {
          margin-top: 1rem;
        }

        .basics .image {
          position: absolute;
          height: 2rem;
          width: 2rem;
        }

        .basics .image:first-of-type {
          left: 15rem;
          top: -2rem;
        }

        .image:last-of-type {
          right: 1.5rem;
          top: 6.25rem;
        }

        .features {
          --flow-space: 3.5rem;

          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        .features,
        .realisations {
          display: flex;
          flex-direction: column;
        }

        .realisations {
          --color-selection: var(--color-light-highlight);
          --theme-color-bg: var(--color-light-main);
          --theme-color-fg: var(--color-dark-main);

          background-color: hsl(var(--theme-color-accent));
          border-radius: 0.5rem;
          color: hsl(var(--color-dark-main));
          margin-left: auto;
          margin-right: auto;
          max-width: 343px;
          padding: 2rem 2.5rem;
        }

        .realisations .content p {
          margin-top: 1rem;
        }

        @media (min-width: 50em) {
          .journey h2 {
            max-width: 19ch;
          }

          .basics {
            padding-bottom: 3rem;
            padding-top: 3rem;
          }

          .basics > div:first-of-type {
            align-items: center;
            display: flex;
            justify-content: space-between;
          }

          .basics p {
            max-width: 40ch;
          }

          .basics .images {
            display: flex;
            position: relative;
            flex-basis: 40%;
            flex-direction: column;
          }

          .basics .image {
            position: static;
            height: 7.5rem;
            width: 7.5rem;
          }

          .basics .image:last-of-type {
            align-self: flex-end;
          }

          .features {
            --flow-space: 4rem;
          }
        }

        @media (min-width: 65em) {
          .basics {
            padding-bottom: 3.5rem;
            padding-top: 3.5rem;
          }

          .basics > div:first-of-type {
            max-width: min(66vw, 1200px);
            max-width: clamp(960px, 66vw, 1200px);
            padding-left: 0;
            padding-right: 0;
          }

          .basics .images {
            max-width: 22rem;
          }
          .features {
            --flow-space: 4.5rem;
          }
        }

        @media (min-width: 90em) {
          .basics .image {
            height: 9rem;
            width: 9rem;
          }
        }
      `}</style>

      <style jsx global>{`
        :root {
          // --theme-color-bg: var(--color-light-main);
          // --theme-color-fg: var(--color-dark-main);
          // --theme-color-hg: var(--color-light-highlight);
          --theme-color-tint: var(--color-light-tint);

          background-color: hsl(var(--theme-color-bg));
          color: hsl(var(--theme-color-fg));
        }

        .hero a.button,
        .features a.button,
        .realisations a.button {
          align-self: center;
        }

        .realisations .button {
          --hover-bg: var(--color-light-main);
        }

        .realisations > * {
          --flow-space: 2rem;
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
