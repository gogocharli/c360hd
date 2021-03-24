import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Logo from './logos/logo-c360.svg';

export function NavList({ reduced = false }) {
  const { t } = useTranslation('common');

  return (
    <>
      {reduced ? (
        <ul>
          <li>
            <Link href='/contact'>
              <a className=''>{t('links.questions')}</a>
            </Link>
          </li>
          <li>
            <Link href='/examples'>
              <a className=''>{t('links.examples')}</a>
            </Link>
          </li>
          <li>
            <Link href='/pricing'>
              <a className=''>{t('links.pricing')}</a>
            </Link>
          </li>
        </ul>
      ) : (
        <>
          <div className='category'>
            <p>{t('categories.products')}</p>
            <ul>
              <li>
                <Link href='/contact'>
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
        </>
      )}
    </>
  );
}

export function FootLinks() {
  const { pathname, locale } = useRouter();
  const { t } = useTranslation('common');

  return (
    <div>
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
      <Link href='/'>
        <a>
          <Logo height={72} />
        </a>
      </Link>
    </div>
  );
}
