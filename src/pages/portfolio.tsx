import React, { useEffect, useState, useRef } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { AccordionMenu, AccordionItem } from '@components/Accordion';
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
    <BaseLayout pageMeta={pageMeta} theme='light'>
      <section className='hero'>
        <div>
          <p>{t('hero.subtitle')}</p>
          <h1>{t('hero.title')}</h1>
        </div>
        <Image
          src='/images/chair-img.png'
          alt='Man rocking on a chair'
          width={417}
          height={417}
          priority
        />
      </section>
      <article>
        <AccordionMenu>
          <AccordionItem
            item={{ value: 'filter', title: `${t('categories.title')}` }}
          >
            {categoryList.map((category) => (
              <button key={category} onClick={filterCategory(category)}>
                {t(`categories.${category}`)}
              </button>
            ))}
          </AccordionItem>
        </AccordionMenu>
        <input
          type='search'
          name='search'
          id='search'
          aria-label={`${t('search.placeholder')}`}
          placeholder={`${t('search.placeholder')}`}
          ref={searchInputRef}
          onChange={handleSearchChange}
        />
        <Gallery search={searchQuery} />
      </article>
    </BaseLayout>
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