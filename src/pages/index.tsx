import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '../_layouts/base';

export default function Home() {
  const { t } = useTranslation('home');
  return (
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
      <article>
        <h2>{t('sections.0.title')}</h2>
        {/* @todo include image animation here */}
        <ul>
          <li>
            <Image
              src='/images/location-img.png'
              alt=''
              width={310}
              height={184}
            />
            <p>{t('sections.0.card-1')}</p>
          </li>
          <li>
            <Image
              src='/images/packing-img.png'
              alt=''
              width={310}
              height={184}
            />
            <p>{t('sections.0.card-2')}</p>
          </li>
          <li>
            <Image src='/images/busy-img.png' alt='' width={310} height={184} />
            <p>{t('sections.0.card-3')}</p>
          </li>
        </ul>
      </article>
      <article>
        <h2>
          <span className='subtitle'>{t('sections.1.subtitle')}</span>
          <br />
          {t('sections.1.title')}
        </h2>
        <p>{t('sections.1.desc')}</p>
        <ul>
          <li>
            <Image
              src='/images/trust-img.png'
              alt=''
              width={308}
              height={288}
            />
            <div>
              <h3>{t('sections.1.card-1.title')}</h3>
              <p>{t('sections.1.card-1.desc')}</p>
            </div>
          </li>
          <li>
            <Image
              src='/images/action-img.png'
              alt=''
              width={308}
              height={288}
            />
            <div>
              <h3>{t('sections.1.card-2.title')}</h3>
              <p>{t('sections.1.card-2.desc')}</p>
            </div>
          </li>
          <li>
            <Image
              src='/images/interest-img.png'
              alt=''
              width={308}
              height={288}
            />
            <div>
              <h3>{t('sections.1.card-3.title')}</h3>
              <p>{t('sections.1.card-3.desc')}</p>
            </div>
          </li>
        </ul>
      </article>
      <article>
        <h2>{t('sections.2.title')}</h2>
        {/* @todo include cards */}
        <ul>
          <li>
            <Image src='/icons/icon-show.png' alt='' width={76} height={72} />
            <div>
              <h3>{t('sections.2.card-1.title')}</h3>
              <p>{t('sections.2.card-1.desc')}</p>
            </div>
          </li>
          <li>
            <Image
              src='/icons/icon-activity.png'
              alt=''
              width={78}
              height={72}
            />
            <div>
              <h3>{t('sections.2.card-2.title')}</h3>
              <p>{t('sections.2.card-2.desc')}</p>
            </div>
          </li>
          <li>
            <Image src='/icons/icon-shield.png' alt='' width={75} height={72} />
            <div>
              <h3>{t('sections.2.card-3.title')}</h3>
              <p>{t('sections.2.card-3.desc')}</p>
            </div>
          </li>
        </ul>
        <Link href='/pricing'>
          <a>{t('sections.2.btnText')}</a>
        </Link>
      </article>
      <article>
        <h3>{t('sections.3.title')}</h3>
        <p>{t('sections.3.desc')}</p>
        <Link href='/portfolio'>
          <a>{t('sections.3.btnText')}</a>
        </Link>
      </article>
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home', 'site'])),
    },
  };
};
