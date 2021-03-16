import Head from 'next/head';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link rel='icon' href='favicon.svg' type='image/svg' key='icon' />
        <meta
          name='description'
          content='C360HD is a next level company focused on local businesses'
        />
      </Head>
      <main>{children}</main>
    </>
  );
}
