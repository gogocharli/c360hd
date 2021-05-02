import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { IdProvider } from '@radix-ui/react-id';

import '../styles/base.scss';
import '@reach/accordion/styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <IdProvider>
      <Component {...pageProps} />
    </IdProvider>
  );
}

export default appWithTranslation(App);
