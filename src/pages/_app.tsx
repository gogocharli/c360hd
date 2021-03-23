import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import '../styles/base.scss';
import '@reach/accordion/styles.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
