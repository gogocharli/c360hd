import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Logo from './logos/logo-c360.svg';

export function NavList({ reduced = false }) {
  const { t } = useTranslation('common');

  return (
    <div className='[ nav__wrapper ] [ align-center flow ]'>
      {reduced ? (
        <ul className='nav__list'>
          <li>
            <Link href='/contact'>
              <a className=''>{t('links.questions')}</a>
            </Link>
          </li>
          <li>
            <Link href='/portfolio'>
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
          <div className='[ category ] [ flow ss02 ]'>
            <p className='weight-bold leading-flat text-450'>
              {t('categories.products')}
            </p>
            <ul className='[ nav__list ] [ flow ]'>
              <li>
                <Link href='/contact'>
                  <a className='text-300'>{t('links.questions')}</a>
                </Link>
              </li>
              <li>
                <Link href='/portfolio'>
                  <a className='text-300'>{t('links.examples')}</a>
                </Link>
              </li>
              <li>
                <Link href='/pricing'>
                  <a className='text-300'>{t('links.pricing')}</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className='[ category ] [ flow ss02 ]'>
            <p className='weight-bold leading-flat text-450'>
              {t('categories.company')}
            </p>
            <ul className='[ nav__list ] [ flow ]'>
              <li>
                <Link href='/about'>
                  <a className='text-300'>{t('links.about')}</a>
                </Link>
              </li>
              <li>
                <Link href='/contact'>
                  <a className='text-300'>{t('links.contact')}</a>
                </Link>
              </li>
              <li>
                <Link href='/careers'>
                  <a className='text-300'>{t('links.careers')}</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className='[ category ] [ flow ss02 ]'>
            <p className='weight-bold leading-flat text-450'>
              {t('categories.legal')}
            </p>
            <ul className='[ nav__list ] [ flow ]'>
              <li>
                <Link href='/legal'>
                  <a className='text-300'>{t('links.legal')}</a>
                </Link>
              </li>
              <li>
                <Link href='/payment-policy'>
                  <a className='text-300'>{t('links.paymentPolicy')}</a>
                </Link>
              </li>
              <li>
                <Link href='/terms'>
                  <a className='text-300'>{t('links.terms')}</a>
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}

      <style jsx>{`
        a {
          color: inherit;
          line-height: 1.45;
          font-feature-settings: 'ss02' on;
          text-decoration: none;
        }

        li {
          line-height: 1;
        }

        p {
          opacity: 60%;
        }

        .nav__wrapper {
          --flow-space: 2rem;
        }

        .category > * {
          --flow-space: 1.5rem;
        }

        .nav__list > li {
          --flow-space: 1rem;
        }
      `}</style>

      <style jsx>{`
        .nav__list > li + li {
          margin: ${reduced && '0 0 0 2rem'};
        }
      `}</style>
    </div>
  );
}

export function FootLinks() {
  const { pathname, locale } = useRouter();
  const { t } = useTranslation('common');

  return (
    <div className='[ footer-links ] [ flow ]'>
      <div className='buttons'>
        <Link href={pathname} locale={locale == 'en' ? 'fr' : 'en'}>
          <a className=' [ lang-switch ] [ button ss02 ] [ text-300 ]'>
            <Image src='/glyphs/globe-alt.svg' width={24} height={24} alt='' />
            {t('toggles.lang')}
          </a>
        </Link>
        {/*
          @todo take care of changing between login or logout
          @see netlify authentication for valide path for auth
        */}
        <Link href='/'>
          <a className=' [ login ] [ button ss02 ] [ text-300 ]'>
            {t('toggles.login')}
          </a>
        </Link>
      </div>
      <Link href='/'>
        <a className='site-foot__brand'>
          <Logo height={72} />
        </a>
      </Link>

      <style jsx>{`
        .buttons,
        .lang-switch {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }

        .site-foot__brand {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
