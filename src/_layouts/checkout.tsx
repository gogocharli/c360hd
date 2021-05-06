import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import { Header } from '@includes/header';
import { Footer } from '@includes/footer';

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
      <NextSeo
        title={(pageMeta?.title || t('siteTitle')) + ' | C360HD'}
        description={pageMeta?.desc || t('siteDesc')}
        openGraph={{
          url: 'https://c360hd.com/',
          title: `${(pageMeta?.title || t('siteTitle')) + ' | C360HD'}`,
          description: `${pageMeta?.desc || t('siteDesc')}`,
          images: [
            {
              url: 'https://c360hd.com/social.jpg',
              width: 1000,
              height: 500,
              alt: 'C360HD - Bring more clients to your door',
            },
          ],
          site_name: 'C360HD',
        }}
        twitter={{
          site: '@c360hd',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/svg',
            href: 'https://c360hd.com/favicon.svg',
          },
        ]}
      />
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
