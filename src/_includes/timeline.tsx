import Link from 'next/link';
import Checkbox from '@components/icon-checkbox.svg';

export function Timeline({ step }: { step: number }) {
  return (
    <section>
      <div>
        <ol className='timeline'>
          <li data-complete={step > 0} data-current={step == 0}>
            <Link href='#business'>
              <a className='timeline__link'>
                <span>Business Info</span>
                <span className='icon'>{step > 0 && <Checkbox />}</span>
              </a>
            </Link>
          </li>
          <li data-complete={step > 1} data-current={step == 1}>
            <Link href='#contact'>
              <a className='timeline__link'>
                <span>Contact Info</span>
                <span className='icon'>{step > 1 && <Checkbox />}</span>
              </a>
            </Link>
          </li>
          <li data-complete={step > 2} data-current={step == 2}>
            <Link href='#order'>
              <a className='timeline__link'>
                <span>Order Info</span>
                <span className='icon'>{step > 2 && <Checkbox />}</span>
              </a>
            </Link>
          </li>
          <li data-complete={step > 3} data-current={step == 3}>
            <Link href='#review'>
              <a className='timeline__link'>
                <span>Review Order</span>
                <span className='icon'>{step > 3 && <Checkbox />}</span>
              </a>
            </Link>
          </li>
          <li data-complete={step > 4} data-current={step == 4}>
            <Link href='#checkout'>
              <a className='timeline__link'>
                <span>Checkout</span>
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

        [data-complete='true'] {
        }

        [data-current='true'],
        [data-complete='true'] {
          opacity: 1;
        }

        @media (min-width: 65em) {
        }
      `}</style>
    </section>
  );
}
