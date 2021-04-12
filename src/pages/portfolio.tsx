import React, { useEffect, useState, useRef } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { AccordionMenu, AccordionItem } from '@components/Accordion/accordion';
import { Gallery } from '@components/Gallery/gallery';

export default function Portfolio() {
  const router = useRouter();
  const { query } = router;
  const filterRef = useRef(query.filter ?? '');
  const searchInputRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useTranslation('portfolio');

  useEffect(() => {
    // Whenever a new query is pushed to the router
    // Disable the filter if it was the same from the previous
    const { filter } = query;
    if (filterRef.current === filter) {
      router.push(`/portfolio`, undefined, {
        shallow: true,
      });
      return;
    } else {
      filterRef.current = filter;
    }

    // Scroll to the top of the page for consistency
    // Shallow routing doesn't by default
    window.scrollTo(0, 0);
  }, [query]);

  // Debounce input before changing query
  let scheduled = null;
  function handleSearchChange() {
    if (!scheduled) {
      window.setTimeout(() => {
        setSearchQuery(scheduled.value);
        scheduled = null;
      }, 250);
    }
    scheduled = searchInputRef.current;
  }

  function filterCategory(category: string) {
    return function () {
      router.push(`/portfolio?filter=${category}`, undefined, {
        shallow: true,
      });
    };
  }

  const categoryList = [
    'resto',
    'fashion',
    'convenience',
    'beauty',
    'art',
    'nursery',
    'recent',
    'other',
  ];

  const pageMeta = { title: t('pageTitle'), desc: t('pageDesc') };
  return (
    <>
      <BaseLayout pageMeta={pageMeta} theme='light' className='portfolio'>
        <section className='hero wrapper'>
          <div>
            <div className='hero__content'>
              <p className="[ subtitle ] [ text-100 lg:text-300 ] [ upper tracking-loose ]">{t('hero.subtitle')}</p>
              <h1 className="[ title ] [ text-600 lg:text-700 ] [ leading-flat tracking-tight lg:tracking-flat measure-micro ]">{t('hero.title')}</h1>
            </div>
            <div className="hero__image blend">
              <Image
                src='/images/chair-img.png'
                alt='Man rocking on a chair'
                width={417}
                height={417}
                priority
              />
            </div>
          </div>
        </section>
        <article className='wrapper'>
          <AccordionMenu>
            <AccordionItem
              item={{ value: 'filter', title: `${t('categories.title')}` }}
            >
              {categoryList.map((category) => (
                <button
                  key={category}
                  onClick={filterCategory(category)}
                  className='filter'
                >
                  {t(`categories.${category}`)}
                </button>
              ))}
            </AccordionItem>
          </AccordionMenu>
          <div className='search__wrapper'>
            <input
              type='search'
              name='search'
              id='search'
              aria-label={`${t('search.placeholder')}`}
              placeholder={`${t('search.placeholder')}`}
              ref={searchInputRef}
              onChange={handleSearchChange}
            />
          </div>
          <Gallery search={searchQuery} />
        </article>
      </BaseLayout>
      <style jsx>{`
        .hero {
          margin-top: 3.5rem;
        }

        .hero__content p {
          color: hsl(var(--color-dark-highlight));
          margin-left: .5ch;
        }

        .hero__image {
          display: none;
        }

        article {
          margin-top: 3rem;
          padding-top: 1rem;
        }

        article > :global(div[data-reach-accordion]) {
          background-color: hsl(var(--color-dark-main));
          border-radius: 0.5rem;
        }

        article :global(.accordion__item) {
          box-shadow: unset;
        }

        article :global(.accordion__item > h3) {
          font-size: 1.25rem;
          line-height: 1.2;
          padding: 0.75rem 0.75rem;
        }

        article :global(.accordion__content) {
          display: flex;
          flex-direction: column;
          margin-top: 0.75rem;
        }

        .filter {
          background: 0;
          border: 0;
          border-radius: 0.5rem;
          box-shadow: unset;
          color: hsl(var(--color-light-main));
          font-size: 1rem;
          font-feature-settings: 'ss02' on;
          padding: 0.5rem 0.75rem;
          text-align: left;
        }

        .filter + .filter {
          margin-top: 0.25rem;
        }

        input {
          background-color: hsl(var(--theme-color-hg));
          border: 0;
          border-radius: 8px;
          display: block;
          font-size: 1rem;
          padding: 1.5rem 0.75rem 1.5rem 3.25rem;
          width: 100%;
        }

        .search__wrapper {
          position: relative;
        }

        .search__wrapper::before {
          content: url('icons/icon-search.svg');
          content: url('icons/icon-search.svg') / '';
          height: 1.5rem;
          left: 16px;
          position: absolute;
          top: 24px;
          width: 1.5rem;
        }

        @media (min-width: 50em) {
          .hero > div {
            background-color: hsl(var(--color-dark-main));
            border-radius: .5rem;
            color: hsl(var(--color-light-main));
            display: grid;
            grid-template-columns: var(--grid-lg);
            grid-column-gap: 1rem;
            padding-top: min(6.6vw, 120px);
            padding-bottom: min(6.6vw, 120px);
          }

          .hero__content {
            align-self: center;
            grid-column: 2 / span 6;
          }

          .hero__content p {
            color: hsl(222 100% 78%);
          }

          .hero__image {
            display: block;
            grid-column: 8 / span 5;
            justify-self: center;
            width: 14.4rem;
         }
        }

        @media (min-width: 65em) {
          .hero__image {
            width: 26rem;
          }

          article {
            display: grid;
            grid-gap: 3rem 1rem;
            grid-template-columns: var(--grid-lg);
          }

          article > :global(div[data-reach-accordion]) {
            align-self: start;
            grid-column: 1 / span 3;
            grid-row: 1 / 3;
            position: sticky;
          }

          .search__wrapper, :global(.gallery) {
            grid-column: 4 / span 9;
            margin-top: 0;
          }

          :global(.gallery) {
            grid-row: 2;
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
        'site',
        'portfolio',
      ])),
    },
  };
};
