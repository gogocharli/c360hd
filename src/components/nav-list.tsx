import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button } from '@components/button';
import Logo from './logos/logo-c360.svg';
import Globe from './globe-alt.svg';

export function NavList({ reduced = false }) {
  const { t } = useTranslation('common');

  return (
    <div className='[ nav__wrapper ] [ align-center flow ]'>
      {reduced ? (
        <ul className='nav__list reduced'>
          <li>
            <Link href='/contact'>
              <a className='text-300 weight-bold'>{t('links.questions')}</a>
            </Link>
          </li>
          <li>
            <Link href='/portfolio'>
              <a className='text-300 weight-bold'>{t('links.examples')}</a>
            </Link>
          </li>
          <li>
            <Button href='/pricing' type='secondary' className='featured'>
              {t('links.pricing')}
            </Button>
          </li>
        </ul>
      ) : (
        <>
          <div className='[ category ] [ flow ss02 ]'>
            <p className='weight-bold leading-flat xs:text-300 text-450'>
              {t('categories.products')}
            </p>
            <ul className='[ nav__list ] [ flow ]'>
              <li>
                <Link href='/contact'>
                  <a className='xs:text-200 text-300'>{t('links.questions')}</a>
                </Link>
              </li>
              <li>
                <Link href='/portfolio'>
                  <a className='xs:text-200 text-300'>{t('links.examples')}</a>
                </Link>
              </li>
              <li>
                <Link href='/pricing'>
                  <a className='xs:text-200 text-300'>{t('links.pricing')}</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className='[ category ] [ flow ss02 ]'>
            <p className='weight-bold leading-flat xs:text-300 text-450'>
              {t('categories.company')}
            </p>
            <ul className='[ nav__list ] [ flow ]'>
              <li>
                <Link href='/about'>
                  <a className='xs:text-200 text-300'>{t('links.about')}</a>
                </Link>
              </li>
              <li>
                <Link href='/contact'>
                  <a className='xs:text-200 text-300'>{t('links.contact')}</a>
                </Link>
              </li>
              <li>
                <Link href='/careers'>
                  <a className='xs:text-200 text-300'>{t('links.careers')}</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className='[ category ] [ flow ss02 ]'>
            <p className='weight-bold leading-flat xs:text-300 text-450'>
              {t('categories.legal')}
            </p>
            <ul className='[ nav__list ] [ flow ]'>
              <li>
                <Link href='/legal'>
                  <a className='xs:text-200 text-300'>{t('links.legal')}</a>
                </Link>
              </li>
              <li>
                <Link href='/payment-policy'>
                  <a className='xs:text-200 text-300'>
                    {t('links.paymentPolicy')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/terms'>
                  <a className='xs:text-200 text-300'>{t('links.terms')}</a>
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

        @media (max-width: 22.5em) {
          .nav__wrapper {
            --flow-space: 1rem;
          }

          .category > * {
            --flow-space: 0.5rem;
          }

          .nav__list > li {
            --flow-space: 0.25rem;
          }
        }

        @media (min-width: 32em) {
          .nav__list.reduced {
            display: flex;
            align-items: center;
          }

          .nav__list.reduced :is(a, li) {
            line-height: 1;
          }
        }
      `}</style>

      <style jsx>{`
        .nav__list > li + li {
          margin: ${reduced && '0 0 0 2rem'};
        }
      `}</style>

      <style jsx global>{`
        .button[data-variant='secondary'].featured {
          color: hsl(var(--color-dark-main));
        }
        .button[data-variant='secondary'].featured::before {
          background-color: hsl(var(--color-light-highlight));
        }
      `}</style>
    </div>
  );
}

export function FootLinks({ noLogo = false }: { noLogo?: boolean }) {
  const { pathname, locale } = useRouter();
  const { t } = useTranslation('common');

  return (
    <div className='[ footer-links ] [ flow ]'>
      <div className='buttons'>
        <Button
          href={pathname}
          locale={locale == 'en' ? 'fr' : 'en'}
          className='lang-switch'
          type='secondary'
        >
          <Globe className='icon' width={16} height={16} />
          <span>{t('toggles.lang')}</span>
        </Button>
        {/*
          @todo take care of changing between login or logout
          @see netlify authentication for valide path for auth
        */}
        <Button href='/' className='login' type='secondary'>
          {t('toggles.login')}
        </Button>
      </div>
      {!noLogo && (
        <Link href='/' passHref>
          <a className='site-foot__brand'>
            <Logo height={72} />
          </a>
        </Link>
      )}

      <style jsx>{`
        .buttons {
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
