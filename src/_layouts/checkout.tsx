import Head from 'next/head';
import { Header } from '@includes/header';
import { Footer } from '@includes/footer';
import { useTranslation } from 'next-i18next';

export default function Layout({
  children,
  pageMeta,
  className = '',
}: {
  children: React.ReactNode;
  pageMeta?: { title?: string; desc?: string };
  className?: string;
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
          integrity='sha384-I8PbINmcRPDTNMreuYNkhAckWfcVDFDlNu7byvNRHSydSJqY1c0YlnTFgrb18kyo'
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
      <Footer />
      <style jsx>{`
        main {
          --flow-space: 4.5rem;
          flex: 1 0 auto;
          margin-top: 3rem;
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
    </>
  );
}
