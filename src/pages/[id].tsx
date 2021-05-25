import type { GetStaticProps, GetStaticPaths } from 'next';
import BaseLayout from '@layouts/base';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getAllPostIds, getPostData } from 'lib/misc';

export default function Terms({
  pageData,
}: {
  pageData: {
    title: string;
    description: string;
    contentHtml: string;
  };
}) {
  const { title, description, contentHtml } = pageData;

  return (
    <>
      <BaseLayout pageMeta={{ title: title, desc: description }} theme='light'>
        <article className='wrapper'>
          <h1 className='[ text-600 lg:text-800 ] [ tracking-tight md:tracking-flat leading-flat measure-micro  ]'>
            {title}
          </h1>
          <div
            className='contents measure-long'
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </BaseLayout>
      <style jsx>{`
        article {
          margin-top: 4.5rem;
        }

        h1 {
          margin-bottom: 2rem;
        }

        .contents {
          margin-left: auto;
          margin-right: auto;
        }

        :global(h2) {
          margin: 2rem 0 1.5rem;
        }

        :global(h3) {
          margin: 1.5rem 0 1rem;
        }

        :global(p + p) {
          margin-top: 1rem;
        }

        @media (min-width: 50em) {
          h1 {
            margin: 0 auto 2.5rem;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const paths = getAllPostIds(locales);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  locale = 'en',
  params,
}) => {
  const pageData = await getPostData(params?.id as string, locale);

  if (!pageData) {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'site'])),
      pageData,
    },
  };
};
