import Head from 'next/head';
import { Header } from '@includes/header';

import { useTranslation } from 'next-i18next';

export default function Layout({
  children,
  pageMeta,
  className = '',
  theme = 'dark',
}: {
  children: React.ReactNode;
  pageMeta?: { title?: string; desc?: string };
  className?: string;
  theme?: 'light' | 'dark';
}) {
  const { t } = useTranslation('site');
  return (
    <>
      <Head>
        <link rel='icon' href='favicon.svg' type='image/svg' key='icon' />
        <meta name='description' content={pageMeta?.desc ?? t('siteDesc')} />
        <title>{(pageMeta?.title ?? t('siteTitle')) + ' | C360HD'}</title>
        <link
          rel='stylesheet'
          href='https://use.typekit.net/jst8wwr.css'
          crossOrigin='anonymous'
        />
      </Head>
      <div className='div'>
        <Header />
      </div>
      <main
        id='main-content'
        tabIndex={-1}
        className={`[ ${className} ] [ flow ]`}
      >
        {children}
      </main>
      <script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=initMap`}
      ></script>
      <style jsx>{`
        main {
          --flow-space: 4.5rem;
          flex: 1 0 auto;
        }

        @media (min-width: 50em) {
          main {
            --flow-space: 7.5rem;
          }
        }

        @media (min-width: 65em) {
          main {
            --flow-space: 8.75rem;
          }
        }
      `}</style>

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
