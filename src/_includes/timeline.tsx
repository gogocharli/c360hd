import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Checkbox from '@components/icon-checkbox.svg';

export function Timeline({ step }: { step: number }) {
  const { t } = useTranslation('checkout');
  return (
    <section>
      <div>
        <ol className='timeline'>
          <li data-complete={step > 0} data-current={step == 0}>
            <Link href='#business'>
              <a className='timeline__link'>
                <span>{t('timeline.0')}</span>
                <span className='icon'>{step > 0 && <Checkbox />}</span>
              </a>
            </Link>
          </li>
          <li data-complete={step > 1} data-current={step == 1}>
            <Link href='#contact'>
              <a className='timeline__link'>
                <span>{t('timeline.1')}</span>
                <span className='icon'>{step > 1 && <Checkbox />}</span>
              </a>
            </Link>
          </li>
          <li data-complete={step > 2} data-current={step == 2}>
            <Link href='#order'>
              <a className='timeline__link'>
                <span>{t('timeline.2')}</span>
                <span className='icon'>{step > 2 && <Checkbox />}</span>
              </a>
            </Link>
          </li>
          <li data-complete={step > 3} data-current={step == 3}>
            <Link href='#review'>
              <a className='timeline__link'>
                <span>{t('timeline.3')}</span>
                <span className='icon'>{step > 3 && <Checkbox />}</span>
              </a>
            </Link>
          </li>
          <li data-complete={step > 4} data-current={step == 4}>
            <Link href='#checkout'>
              <a className='timeline__link'>
                <span>{t('timeline.4')}</span>
                <span className='icon'>{step > 3 && <Checkbox />}</span>
              </a>
            </Link>
          </li>
        </ol>
      </div>

      <style jsx>{`
        section {
          overflow-x: hidden;
        }

        div {
          border-radius: 0.5rem;
          overflow-x: auto;
        }

        ol {
          display: flex;
          height: 4rem;
          width: clamp(60rem, calc(100vw - 3rem), 87rem);
        }

        li {
          color: hsl(var(--theme-color-accent));
          display: flex;
          justify-content: center;
          flex: 1 0 20%;
          font-weight: 600;
          line-height: 1.2;
          opacity: 0.4;
        }

        a {
          align-items: center;
          color: inherit;
          display: flex;
          flex-grow: 1;
          justify-content: center;
          text-decoration: none;
        }

        a:focus {
          outline-offset: -0.4em;
        }

        .icon {
          margin-left: 0.5rem;
          height: 1.5rem;
        }

        .icon > :global(svg path) {
          stroke: currentColor;
        }

        [data-current='true'] {
          background-color: hsl(var(--theme-color-accent));
          color: hsl(var(--theme-color-bg));
        }

        [data-current='true'] > a:focus {
          outline-color: hsl(Var(--color-dark-main));
        }

        [data-current='true'],
        [data-complete='true'] {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
