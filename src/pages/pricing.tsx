import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from '@layouts/base';
import { Questions } from '@includes/questions';

export default function Pricing() {
  const { t } = useTranslation('pricing');
  const pageMeta = { title: t('pageTitle') };

  return (
    <BaseLayout pageMeta={pageMeta}>
      <section className='hero'>
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
      </section>
      <article className='pricing'>
        <article className='pricing-card'>
          <h2>{t('classic.title')}</h2>
          <ul>
            <li>{t('classic.perks.panos')}</li>
            <li>{t('classic.perks.photos')}</li>
            <li>{t('classic.perks.public')}</li>
            <li>{t('classic.perks.facebook')}</li>
            <li>{t('classic.perks.web')}</li>
            <li>{t('classic.perks.shoots')}</li>
          </ul>
          <div className='price__container'>
            <p className='price'>$595</p>
          </div>
          {/* Include button */}
        </article>
        <article className='pricing-card'>
          <h2>{t('special.title')}</h2>
          <ul>
            <li>{t('special.perks.panos')}</li>
            <li>{t('special.perks.photos')}</li>
            <li>{t('special.perks.public')}</li>
            <li>{t('special.perks.facebook')}</li>
            <li>{t('special.perks.web')}</li>
            <li>{t('special.perks.shoots')}</li>
          </ul>
          <div className='price__container'>
            <p className='price'>$795</p>
          </div>
          {/* Include button */}
        </article>
      </article>
      <Questions />
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'pricing',
        'questions',
        'site',
      ])),
    },
  };
};
