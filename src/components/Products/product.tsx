import { useTranslation } from 'next-i18next';
import { Button } from '@components/button';

const products = { classic: 595, special: 795 };
export function Product({ name }: { name: 'classic' | 'special' }) {
  const { t } = useTranslation('pricing');

  return (
    <>
      <article className='[ product ] [ align-center flow ]'>
        <h2 className='[ name ] [ text-550 lg:text-600 ] [ leading-flat lg:tracking-tight]'>
          {t(`${name}.title`)}
        </h2>
        <ul className='flow'>
          <li>{t(`${name}.perks.panos`)}</li>
          <li>{t(`${name}.perks.photos`)}</li>
          <li>{t(`${name}.perks.public`)}</li>
          <li>{t(`${name}.perks.facebook`)}</li>
          <li>{t(`${name}.perks.web`)}</li>
          <li>{t(`${name}.perks.shoots`)}</li>
        </ul>
        <div className='price__container'>
          <p className='[ price ] [ text-700 lg:text-800 ] [ tracking-flat weight-bold ]'>
            <span className='visually-hidden'>Price: </span>${products[name]}
          </p>
          {name == 'special' && (
            <p className='[ extra ] [ text-200 md:text-300 ]'>
              {t('special.perks.extra')}
            </p>
          )}
        </div>
        <Button href='/pricing' type='secondary'>
          {t('btnText')}
        </Button>
      </article>
      <style jsx>{`
        @keyframes wave-in {
          0% {
            transform: translateY(0);
          }

          25% {
            transform: translateY(-5%);
          }

          50% {
            transform: translateY(0);
          }

          75% {
            transform: translateY(5%);
          }

          100% {
            transform: translateY(0);
          }
        }

        @keyframes wave-out {
          0% {
            transform: scaleX(-1) translateY(0);
          }

          25% {
            transform: scaleX(-1) translateY(5%);
          }

          50% {
            transform: scaleX(-1) translateY(0);
          }

          75% {
            transform: scaleX(-1) translateY(-5%);
          }

          100% {
            transform: scaleX(-1) translateY(0);
          }
        }

        article {
          --flow-space: 2.5rem;
          --color-selection: var(--color-light-highlight);

          align-items: center;
          animation-play-state: paused;
          border-radius: 16px;
          color: hsl(var(--color-dark-main));
          display: flex;
          flex-basis: 343px;
          flex-direction: column;
          font-feature-settings: 'ss02' off;
          padding: 3rem 2.5rem;
          position: relative;
          transition: transform 300ms ease;
        }

        article::before,
        article::after {
          animation: 3s linear infinite normal forwards;
          animation-play-state: inherit;
          background-blend-mode: luminosity;
          height: 2rem;
          line-height: 1;
          mix-blend-mode: luminosity;
          position: absolute;
          top: 3rem;
          width: 2rem;
          will-change: transform;
        }

        article::before {
          animation-name: wave-in;
          left: 2.5rem;
          transform: scaleX(-1);
        }

        article::after {
          animation-name: wave-out;
          right: 2.5rem;
        }

        article > :global(.button) {
          --default-bg: var(--color-dark-main);
          --hover-bg: var(--color-light-main);
        }

        article:focus-within,
        article:hover {
          animation-play-state: running;
          box-shadow: -30px 30px 120px rgba(0, 18, 43, 0.3),
            30px -30px 78px rgba(0, 28, 67, 0.3);
          transform: scale(1.02);
        }

        ul {
          font-weight: 500;
          line-height: 1.4;
        }

        li {
          --flow-space: 1.5rem;
        }

        .price {
          line-height: 1;
        }

        .extra {
          line-height: 1.45;
          margin-top: 0.5rem;
          max-width: 24ch;
        }

        @media (min-width: 65em) {
          article {
            flex-basis: 417px;
          }

          article::before,
          article::after {
            height: 3rem;
            width: 3rem;
          }

          li {
            font-size: 1.375rem;
          }
        }
      `}</style>
      <style jsx>{`
        article {
          background-color: hsl(
            var(--color-accent-${name == 'special' ? 'purple' : 'sky'})
          );
        }

        article::before,
        article::after {
          content: ${name == 'special'
            ? 'url("/images/star-32w-img.png")'
            : ''};
        }

        @media (min-width: 65em) {
          article::before,
          article::after {
            content: ${name == 'special'
              ? 'url("/images/star-48w-img.png")'
              : ''};
          }
        }
      `}</style>
    </>
  );
}
