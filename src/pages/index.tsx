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
import { Browser } from '@components/Browser/browser';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <>
      <BaseLayout className='home'>
        <section className='[ hero ] [ flow align-center ]'>
          <div className='[ hero__content ] [ flow ]'>
            <h1 className='[ title ] [ text-600 md:text-700 lg:text-800 weight-bold ] [ leading-flat tracking-tight measure-micro ]'>
              {t('hero.title')}
            </h1>
            <p className='[ subtitle ] [ text-400 measure-compact leading-loose ]'>
              {t('hero.subtitle')}
            </p>
            <Button href='/pricing' type='secondary'>
              {t('hero.btnText')}
            </Button>
          </div>
          <div aria-hidden='true'>
            <div className='[ hero__content ] [ flow ]'>
              <h1 className='[ title ] [ text-600 md:text-700 lg:text-800 weight-bold ] [ leading-flat tracking-tight measure-micro ]'>
                {t('hero.title')}
              </h1>
              <p className='[ subtitle ] [ text-400 measure-short leading-loose ]'>
                {t('hero.subtitle')}
              </p>
              <a href='#' className='button' tabIndex={-1}>
                {t('hero.btnText')}
              </a>
            </div>
          </div>
        </section>
        <article id='journey' className='[ journey ] [ wrapper ]'>
          <h2 className='[ text-550 md:text-600 ] [ align-center measure-compact leading-flat md:tracking-tight ]'>
            {t('sections.0.title')}
          </h2>
          <Browser />
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
          className='[ realisations ] [ align-center ]'
        >
          <div className='flow'>
            <div className='content'>
              <h3 className='text-550 leading-flat'>{t('sections.3.title')}</h3>
              <p className='text-300 lg:text-400'>{t('sections.3.desc')}</p>
            </div>
            <Button href='/portfolio' type='secondary'>
              <span>{t('sections.3.btnText')}</span>
              <Arrow className='icon' width={16} />
            </Button>
          </div>
          <div className='icon-stack'>
            <div>
              <img src='/icons/icon-pill.svg' alt='' loading='lazy' />
            </div>
            <div>
              <img src='/icons/icon-bowl.svg' alt='' loading='lazy' />
            </div>
            <div>
              <img src='/icons/icon-girl.svg' alt='' loading='lazy' />
            </div>
            <div>
              <img src='/icons/icon-tennis.svg' alt='' loading='lazy' />
            </div>
          </div>
          <div className='icon-stack'>
            <div>
              <img src='/icons/icon-shopping-cart.svg' alt='' loading='lazy' />
            </div>
            <div>
              <img src='/icons/icon-modem.svg' alt='' loading='lazy' />
            </div>
            <div>
              <img src='/icons/icon-coffee.svg' alt='' loading='lazy' />
            </div>
            <div>
              <img src='/icons/icon-shopping-bag.svg' alt='' loading='lazy' />
            </div>
          </div>
        </article>
      </BaseLayout>

      <style jsx>{`
        .hero {
          --flow-space: 2rem;

          background-color: hsl(var(--theme-color-bg));
          color: hsl(var(--theme-color-fg));
        }

        .hero__content {
          display: flex;
          flex-direction: column;
          padding: 4.5rem 0.5rem;
        }

        .hero__content:first-of-type {
          /* Only this part of the page has a light theme */
          -webkit-font-smoothing: auto;
          -moz-osx-font-smoothing: auto;
        }

        .hero div[aria-hidden='true'] {
          display: none;
        }

        .hero__content > *,
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
          --selection-bg: var(--color-light-highlight);
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

        .icon-stack {
          display: none;
        }

        @media (min-width: 50em) {
          .hero__content {
            padding: 4.5rem 1.5rem;
          }

          .hero .title {
            max-width: 16ch;
          }

          .hero .subtitle {
            max-width: 30ch;
          }

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

          .realisations {
            display: grid;
            grid-template-columns: var(--grid-lg);
            grid-column-gap: 0.5rem;
            max-width: 1176px;
            padding: 3.5rem 0;
            text-align: left;
            width: 90vw;
          }

          .realisations > * {
            align-self: center;
          }

          .realisations > div:first-of-type {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            grid-column: 2 / span 6;
          }

          .realisations .content p {
            margin-top: 1.5rem;
            max-width: 37ch;
          }

          .icon-stack {
            display: flex;
            flex-direction: column;
            margin-top: 0;
          }

          .icon-stack img {
            position: absolute;
            height: 1rem;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 1rem;
          }

          .icon-stack > div {
            border-radius: 2px;
            box-shadow: 3.95652px 3.95652px 11.8696px rgba(115, 149, 227, 0.55),
              -3.95652px -3.95652px 11.8696px rgba(143, 185, 255, 0.54);
            height: 0;
            padding-bottom: 100%;
            position: relative;
            width: 100%;
          }

          .icon-stack > div + div {
            margin-top: 1.5rem;
          }

          .icon-stack:nth-child(2) {
            grid-column: 9 / 10;
          }

          .icon-stack:last-of-type {
            grid-column: 11 / 12;
          }
        }

        @media (min-width: 65em) {
          .hero {
            position: relative;
            text-align: left;
          }

          .hero,
          .hero div[aria-hidden='true'] {
            display: grid;
            grid-column-gap: 1rem;
            grid-template-columns: var(--grid-lg);
          }

          .hero div[aria-hidden='true'] {
            background-color: hsl(var(--color-dark-main));
            clip-path: polygon(45% 0, 100% 0, 100% 100%, 45% 100%);
            grid-column: 1 / span 13;
            grid-row: 1;
            margin-top: 0;
            pointer-events: none;
            position: relative;
            z-index: 10;
          }

          .hero__content {
            padding: 10.5rem 1.5rem;
            grid-column: 2 / span 9;
            grid-row: 1;
          }

          .hero__content:last-of-type {
            color: hsl(var(--color-light-main));
          }

          .hero__content:last-of-type a {
            opacity: 0;
          }

          .hero .title,
          .hero p {
            margin-left: 0;
            margin-right: 0;
          }

          .hero .subtitle {
            max-width: 40ch;
          }

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

          .realisations {
            padding: 7rem 0;
          }

          .realisations .content p {
            margin-top: 2.5rem;
          }

          .icon-stack img {
            height: 1.5rem;
            width: 1.5rem;
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

        .hero a.button {
          --default-color: var(--color-light-main);
          --hover-color: var(--color-dark-main);
          --default-bg: var(--color-dark-main);
          --hover-bg: var(--color-light-highlight);
        }

        .realisations a.button {
          --default-color: var(--color-light-main);
          --hover-color: var(--color-dark-main);
          --default-bg: var(--color-dark-main);
          --hover-bg: var(--color-light-highlight);
        }

        .realisations > * {
          --flow-space: 2rem;
        }

        @media (min-width: 50em) {
          .realisations > * {
            --flow-space: 1.5rem;
          }
          .realisations a.button {
            align-self: start;
          }
        }

        @media (min-width: 65em) {
          .realisations > * {
            --flow-space: 2.5rem;
          }

          .hero a.button {
            align-self: flex-start;
          }
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
