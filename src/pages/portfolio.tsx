import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { AccordionMenu, AccordionItem } from '@components/Accordion';
import { useEffect, useState } from 'react';

export default function Portfolio() {
  const { t } = useTranslation('portfolio');
  const pageMeta = { title: t('pageTitle'), desc: t('pageDesc') };

  const { search: filter } = typeof window !== 'undefined' && window?.location;
  const category = new URLSearchParams(filter)?.get('filter');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log(category);
  }, [category]);

  function handleSearchChange(e) {
    const value = e.target.value;
    console.log(value);
    setSearchQuery(value);
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
        />
      </section>
      <article>
        <input
          type='search'
          name='search'
          id='search'
          aria-label={`${t('search.placeholder')}`}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <AccordionMenu>
          <AccordionItem
            item={{ value: 'filter', title: `${t('categories.title')}` }}
          >
            {categoryList.map((category) => (
              <Link href={`/portfolio?filter=${category}`} key={category}>
                <a>{t(`categories.${category}`)}</a>
              </Link>
            ))}
          </AccordionItem>
        </AccordionMenu>
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
