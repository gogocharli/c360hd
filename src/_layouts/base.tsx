import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import { Header } from '@includes/header';
import { Footer } from '@includes/footer';

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
      <NextSeo
        title={(pageMeta?.title || t('siteTitle')) + ' | LYNCXS'}
        description={pageMeta?.desc || t('siteDesc')}
        openGraph={{
          url: 'https://lyncxs.com/',
          title: `${(pageMeta?.title || t('siteTitle')) + ' | LYNCXS'}`,
          description: `${pageMeta?.desc || t('siteDesc')}`,
          images: [
            {
              url: 'https://lyncxs.com/social.jpg',
              width: 1000,
              height: 500,
              alt: 'LYNCXS - Bring more clients to your door',
            },
          ],
          site_name: 'LYNCXS',
        }}
        twitter={{
          site: '@lyncxs',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/svg',
            href: 'https://lyncxs.com/favicon.svg',
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
          overflow-x: hidden;
        }

        footer {
          flex-shrink: 0;
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
