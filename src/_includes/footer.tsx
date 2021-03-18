import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Logo from 'components/logos/logo-c360.svg';

export function Footer() {
  const { pathname, locale } = useRouter();
  const { t } = useTranslation('common');

  return (
    <footer className='site-foot'>
      <nav className='[ nav ] [ site-foot__nav ]'>
        <div className='category'>
          <p>{t('categories.products')}</p>
          <ul>
            <li>
              <Link href='/questions'>
                <a>{t('links.questions')}</a>
              </Link>
            </li>
            <li>
              <Link href='/examples'>
                <a>{t('links.examples')}</a>
              </Link>
            </li>
            <li>
              <Link href='/pricing'>
                <a>{t('links.pricing')}</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='category'>
          <p>{t('categories.company')}</p>
          <ul>
            <li>
              <Link href='/about'>
                <a>{t('links.about')}</a>
              </Link>
            </li>
            <li>
              <Link href='/contact'>
                <a>{t('links.contact')}</a>
              </Link>
            </li>
            <li>
              <Link href='/careers'>
                <a>{t('links.careers')}</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='category'>
          <p>{t('categories.legal')}</p>
          <ul>
            <li>
              <Link href='/legal'>
                <a>{t('links.legal')}</a>
              </Link>
            </li>
            <li>
              <Link href='/payment-policy'>
                <a>{t('links.paymentPolicy')}</a>
              </Link>
            </li>
            <li>
              <Link href='/terms'>
                <a>{t('links.terms')}</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <Link href='/'>
          <a>
            {/* @ts-ignore */}
            <Logo height='72' />
          </a>
        </Link>
        <Link href={pathname} locale={locale == 'en' ? 'fr' : 'en'}>
          <a>{t('toggles.lang')}</a>
        </Link>
        {/*
          @todo take care of changing between login or logout
          @see netlify authentication for valide path for auth
        */}
        <Link href='profile'>
          <a>{t('toggles.login')}</a>
        </Link>
      </div>
    </footer>
  );
}
