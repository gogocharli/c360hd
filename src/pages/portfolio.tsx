import React, { useEffect, useState, useRef } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { AccordionMenu, AccordionItem } from '@components/Accordion/accordion';
import { Gallery } from '@components/Gallery/gallery';
import { getFeaturedClients } from './api/components/clients';
import { GalleryListItem, GeoCode } from '@components/Gallery/gallery-item';
import { fallbackItems } from '@components/Gallery/gallery-items';

const categoryList = [
  'resto',
  'fashion',
  'convenience',
  'beauty',
  'art',
  'health',
  'furniture',
  'recent',
  'other',
];

export default function Portfolio({
  featuredClients,
}: {
  featuredClients: GalleryListItem[];
}) {
  const router = useRouter();
  const { query } = router;
  const filterRef = useRef(query.filter ?? '');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const { filter } = query;

    // Remove the styling for buttons which do not match the filter
    document.querySelectorAll('.filter').forEach((el) => {
      if (el.classList.contains(`${filter}`)) return;
      el.classList.remove('is-current');
    });

    // Whenever a new query is pushed to the router
    // Disable the filter if it was the same from the previous
    if (filterRef.current === filter) {
      router.push(`/portfolio`, undefined, {
        shallow: true,
      });
      return;
    } else {
      filterRef.current = filter;
    }
  }, [query]);

  // Debounce input before changing query
  const searchInputRef = useRef();
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

      document.querySelector(`.${category}`).classList.add('is-current');
    };
  }

  const { t } = useTranslation('portfolio');
  const pageMeta = { title: t('pageMeta.title'), desc: t('pageMeta.desc') };
  return (
    <>
      <BaseLayout pageMeta={pageMeta} theme='light' className='portfolio'>
        <section className='hero wrapper'>
          <div>
            <div className='hero__content'>
              <p className='[ subtitle ] [ text-100 lg:text-300 ] [ upper tracking-loose ]'>
                {t('hero.subtitle')}
              </p>
              <h1 className='[ title ] [ text-600 lg:text-700 ] [ leading-flat tracking-tight lg:tracking-flat measure-micro ]'>
                {t('hero.title')}
              </h1>
            </div>
            <div className='hero__image blend'>
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
                  className={`filter ${category}`}
                >
                  <span>{t(`categories.${category}`)}</span>
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
          <Gallery featuredClients={featuredClients} search={searchQuery} />
        </article>
      </BaseLayout>
      <style jsx>{`
        .hero {
          margin-top: 3.5rem;
        }

        .hero__content p {
          color: hsl(var(--color-dark-highlight));
          margin-left: 0.5ch;
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
          color: hsl(var(--theme-color-fg));
          display: block;
          font-size: 1rem;
          padding: 1.5rem 0.75rem 1.5rem 3.25rem;
          width: 100%;
          -webkit-appearance: none;
        }

        input::placeholder {
          color: hsl(var(--color-dark-tint));
        }

        .search__wrapper {
          --selection-bg: var(--color-dark-main);
          --selection-fg: var(--color-light-main);
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

        :global(.accordion__content button, .accordion__content button > span) {
          transition: all var(--transition-duration) var(--transition-curve);
        }

        :global(.accordion__content button:hover) {
          background-color: hsl(var(--color-dark-tint));
          transition-duration: 200ms;
        }

        :global(.accordion__content button.is-current) {
          background-color: hsl(var(--color-dark-tint));
          transition-duration: 200ms;
        }

        :global(.accordion__content button > span) {
          display: inline-block;
        }

        :global(.accordion__content button:hover > span) {
          transform: translateX(8px);
        }

        :global(.accordion__content button.is-current > span) {
          transform: translateX(8px);
        }

        @media (min-width: 50em) {
          .hero > div {
            background-color: hsl(var(--color-dark-main));
            border-radius: 0.5rem;
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

          .search__wrapper,
          :global(.gallery) {
            grid-column: 4 / span 10;
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
  const featuredClientsData = await getFeaturedClients();
  const featuredClients = featuredClientsData.map(
    ({ name, category, address, created, cover }) => ({
      category: category.toLowerCase(),
      created,
      name,
      src: cover?.[0]?.thumbnails.large.url ?? '', // 1024 x 512 base image
      address: address[0],
    }),
  );

  const featuredClientsWithGeo = await Promise.all(
    featuredClients.map(retrieveGeoLocation),
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'site',
        'portfolio',
      ])),
      featuredClients: featuredClientsWithGeo || fallbackItems,
    },
  };
};

/**
 * Transform string address into a geolocation position
 */
async function retrieveGeoLocation(client: any): Promise<GalleryListItem> {
  const url = new URL(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${client.address}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  );
  const data = await fetch(url.href).then((res) => {
    if (res.ok) return res.json();

    throw res;
  });
  const geoCode: GeoCode = data.results[0]?.geometry.location ?? {
    lat: '',
    lng: '',
  };
  return { ...client, address: geoCode };
}
