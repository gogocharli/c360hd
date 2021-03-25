import Head from 'next/head';
import { Header } from '@includes/header';
import { Footer } from '@includes/footer';

import { useTranslation } from 'next-i18next';

export default function Layout({
  children,
  pageMeta,
  theme = 'dark',
}: {
  children: React.ReactNode;
  pageMeta?: { title?: string; desc?: string };
  theme?: 'light' | 'dark';
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
      <style jsx global>{`
        :root {
          --theme-color-bg: var(--color-${theme}-main);
          --theme-color-fg: var(
            --color-${theme == 'dark' ? 'light' : 'dark'}-main
          );
          --theme-color-hg: var(--color-${theme}-highlight);
        }
      `}</style>
    </>
  );
}
