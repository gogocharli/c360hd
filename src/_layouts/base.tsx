import Head from 'next/head';
import { Header } from '@includes/header';
import { Footer } from '@includes/footer';

import { useTranslation } from 'next-i18next';

export default function Layout({
  children,
  pageMeta,
}: {
  children: React.ReactNode;
  pageMeta?: { title: string; desc: string };
}) {
  const { t } = useTranslation('site');
  return (
    <>
      <Head>
        <link rel='icon' href='favicon.svg' type='image/svg' key='icon' />
        <meta name='description' content={pageMeta?.desc ?? t('siteDesc')} />
        <title>{(pageMeta?.title ?? t('siteTitle')) + ' | C360HD'}</title>
      </Head>
      <Header />
      <main id='main-content' tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
