import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export function HomeCarousel() {
  const { t } = useTranslation('home');
  const slidesList = ['trust', 'action', 'interest'];

  return (
    <>
      <div>
        <ul className='panel__container'>
          {slidesList.map((key, index) => (
            <li className='panel' key={key}>
              <div className='image'>
                <Image
                  src={`/images/${key}-img.png`}
                  alt=''
                  width={308}
                  height={288}
                  className='blend'
                />
              </div>
              <div className='[ content ] [ flow ]'>
                <h3 className='[ text-550 lg:text-600 ] [ measure-micro leading-flat lg:tracking-tight ]'>
                  {t(`sections.1.content.${index}.title`)}
                </h3>
                <p className='[ text-300 ]'>
                  {t(`sections.1.content.${index}.desc`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        ul {
          display: flex;
          flex-direction: column;
          padding: 0 1rem;
          overflow: hidden;
        }

        li {
          align-items: center;
          background-color: hsl(var(--theme-color-accent));
          border-radius: 0.4em;
          box-shadow: 0px 0px 9px 2px rgba(69, 140, 247, 0.4);
          color: hsl(var(--color-dark-main));
          display: flex;
          flex-direction: column;
          margin-left: auto;
          margin-right: auto;
          max-width: 343px;
          padding: 2rem 2.5rem;
        }

        li > * {
          --flow-space: 1rem;
        }

        /* Card stacking styles */
        ul {
          height: 40rem;
          margin-top: 3rem;
          position: relative;
        }

        .image {
          background-color: hsl(var(--theme-color-accent));
          height: 224px;
          width: 240px;
        }

        .content {
          margin-top: 2rem;
        }

        @media (min-width: 50em) {
          /* Card stacking styles */
          ul {
            height: unset;
          }

          li {
            left: 0;
            position: static;
          }

          ul li {
            transform: unset;
          }
          /* Card stacking styles end */

          ul {
            flex-direction: row;
            overflow-x: scroll;
            margin-top: 5rem;
            scroll-snap-type: inline mandatory;
            width: 100vw;
          }

          ul::after {
            content: '';
            flex: 0 0 auto;
            width: 1px;
          }

          li {
            --overflow-margin: calc(50vw - 42.5vw);

            align-items: center;
            flex-direction: row;
            flex: 1 0 100%;
            justify-content: center;
            max-width: 85vw;
            padding: 3rem 4rem;
            scroll-snap-align: center;
          }

          li + li {
            margin-left: 1.5rem;
          }

          li:first-of-type {
            margin-left: var(--overflow-margin);
          }

          li:last-of-type {
            margin-right: var(--overflow-margin);
          }

          li p {
            max-width: 17.5rem;
          }

          .image {
            flex-shrink: 0;
            height: 14rem;
            width: 15rem;
          }

          .content {
            margin: 0 0 0 4.5rem;
          }
        }

        @media (min-width: 65em) {
          // TODO Take care of clipping
          ul {
            border-radius: 0.4em;
            margin-left: auto;
            margin-right: auto;
            max-width: 90rem;
          }

          li {
            max-width: 80%;
            padding: 8.75rem 7.875rem;
          }

          li + li {
            margin-left: 2rem;
          }

          li p {
            max-width: 20rem;
          }

          .image {
            height: 288px;
            width: 308px;
          }
        }
      `}</style>
    </>
  );
}
