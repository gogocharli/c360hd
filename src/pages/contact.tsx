import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { Questions } from '@includes/questions';
import { ContactForm } from '@includes/contact-form';
import IconPhone from '@components/icon-phone.svg';
import IconMail from '@components/icon-mail.svg';

export default function Contact() {
  const { t } = useTranslation('contact');
  const { t: s } = useTranslation('site');
  const pageMeta = { title: t('pageMeta.title'), desc: t('pageMeta.desc') };

  return (
    <BaseLayout pageMeta={pageMeta} className='contact'>
      <article className='wrapper'>
        <section className='hero flow'>
          <h1 className='[ title ] [ text-600 md:text-700 ] [ tracking-tight measure-micro leading-flat ]'>
            {t('hero.title')}
          </h1>
          <p className='[ subtitle ] [ text-300 md:text-400 ] [ measure-short ]'>
            {t('hero.subtitle')}
          </p>
        </section>
        <div className='links'>
          <a
            href={`mailto:${s('email')}`}
            className='button ss02'
            data-variant='secondary'
          >
            <IconMail className='icon' width={16} height={16} />
            <span>{s('email')}</span>
          </a>
          <a
            href={`tel:${s('phone')}`}
            className='button ss02'
            data-variant='secondary'
          >
            <IconPhone className='icon' width={16} height={16} />
            <span>{s('phone')}</span>
          </a>
        </div>
        <ContactForm />
      </article>
      <style jsx>{`
        article {
          margin-top: 3.5rem;
        }

        .hero {
          --flow-space: 1rem;
        }

        .links {
          display: flex;
          flex-direction: column;
          margin-top: 2rem;
        }

        a {
          align-self: flex-start;
          display: flex;
          align-items: center;
        }

        a > :global(* + *) {
          margin-left: 0.5rem;
        }

        a:last-child {
          margin-top: 1rem;
        }

        @media (min-width: 50em) {
          .hero {
            --flow-space: 2rem;
            text-align: center;
          }

          .hero > * {
            margin-left: auto;
            margin-right: auto;
          }

          .hero p {
            line-height: 1.55;
            max-width: 40sch;
          }

          .links {
            flex-flow: row wrap;
            justify-content: center;
          }

          .links > * {
            margin-bottom: 1rem;
            flex-shrink: 0;
          }

          a:last-child {
            margin: 0 0 0 1rem;
          }
        }

        @media (min-width: 65em) {
          article {
            display: grid;
            grid-template-columns: var(--grid-lg);
            grid-column-gap: 1rem;
            grid-row-gap: 2.5rem;
          }

          .hero {
            --flow-space: 2.5rem;

            grid-column: 2 / span 5;
            text-align: left;
          }

          .hero > * {
            margin-left: 0;
            margin-right: 0;
          }

          .hero p {
            line-height: 1.63;
          }

          .links {
            grid-column: 2 / span 5;
            grid-row: 2;
            justify-content: start;
          }

          article > :global(.form__wrapper) {
            grid-column: 8 / span 6;
            grid-row: 1 / 4;
          }
        }
      `}</style>
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
