import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const studyList = ['location', 'packing', 'busy'];

export function JourneyHighlights() {
  const { t } = useTranslation('home');

  return (
    <>
      <div className='scene'>
        <ul>
          {studyList.map((key, index) => (
            <li key={key} className='journey-step'>
              <div className='image'>
                <Image
                  src={`/images/${key}-img.png`}
                  alt=''
                  width={310}
                  height={184}
                  layout='intrinsic'
                  objectFit='contain'
                  className='blend'
                />
              </div>
              <p className='[ text-300 md:text-400 measure-compact ][ align-center ]'>
                {t(`sections.0.content.${index}`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .scene {
          --card-size-x: 343px;
          --card-size-y: 330px;
          background-color: hsl(var(--theme-color-bg));
          border-radius: 0.75rem;
          box-shadow: var(--card-shadow-focus);
          height: var(--card-size-y);
          overflow: hidden;
          margin-top: 1.5rem;
          perspective: 1000px;
          position: relative;
        }

        ul {
          height: 100%;
          left: 50%;
          position: absolute;
          transform: translateX(-50%);
          transform-style: preserve-3d;
          transition: transform var(--transition-duration)
            var(--transition-curve);
          width: var(--card-size-x);
        }

        li {
          --selection-bg: var(--color-light-highlight);

          background-color: hsl(var(--theme-color-bg));
          border-radius: 0.75rem;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          position: absolute;
        }

        li:nth-child(1) {
          transform: rotateY(0deg) translateZ(99px);
        }

        li:nth-child(2) {
          transform: rotateY(120deg) translateZ(99px);
        }

        li:nth-child(3) {
          transform: rotateY(240deg) translateZ(99px);
        }

        ul {
          transform: translateX(-50%) translateZ(-99px) rotateY(0deg);
        }

        li > * {
          margin-left: auto;
          margin-right: auto;
        }

        li p {
          padding: 1rem 0 0;
        }

        @media (min-width: 50em) {
          .scene {
            --card-size-x: 686px;
            --card-size-y: 234px;
            margin: 2rem auto 0;
            width: var(--card-size-x);
          }

          ul {
            width: var(--card-size-x);
          }

          li {
            align-items: center;
            flex-direction: row;
            margin: 0 auto;
            max-width: 80vw;
            padding: 0 1.5rem 0 0;
          }

          li:nth-child(1) {
            transform: rotateX(0deg) translateZ(186.48px);
          }

          li:nth-child(2) {
            transform: rotateX(120deg) translateZ(186.48px);
          }

          li:nth-child(3) {
            transform: rotateX(240deg) translateZ(186.48px);
          }

          ul {
            transform: translateX(-50%) translateZ(-186.48px) rotateX(0deg);
          }

          li p {
            flex-basis: 45%;
            padding: 0 0 0 1rem;
          }

          .image {
            padding: 1.5rem;
          }
        }

        @media (min-width: 65em) {
          // Reset carousel styles
          .scene {
            border-radius: 0;
            box-shadow: unset;
            height: unset;
            margin-top: 3.5rem;
            overflow: visible;
            width: unset;
          }

          ul {
            position: static;
            transform: unset;
            width: unset;
          }

          li {
            position: relative;
          }

          ul li {
            transform: unset;
          }

          ul {
            display: flex;
            justify-content: space-between;
            margin-left: auto;
            margin-right: auto;
            max-width: 80rem;
          }

          li {
            box-shadow: var(--card-shadow-main);
            flex-direction: column;
            max-width: 26rem;
            padding: 0 0 2rem;
            flex-basis: 33%;
          }

          li::before {
            --transition-duration: 700ms;

            border-radius: inherit;
            box-shadow: var(--card-shadow-focus);
            background-color: inherit;
            content: '';
            opacity: 0;
            position: absolute;
            transition: opacity var(--transition-duration)
              var(--transition-curve);
            z-index: -1;

            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
          }

          li.is-featured {
            z-index: 10;
          }

          li.is-featured::before {
            opacity: 1;
          }

          li p {
            padding: 0 2.5rem;
          }

          .image {
            padding: 2.5rem 0;
          }
        }
      `}</style>
    </>
  );
}
