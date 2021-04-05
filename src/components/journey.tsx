import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const studyList = ['location', 'packing', 'busy'];

export function JourneyHighlights() {
  const { t } = useTranslation('home');

  return (
    <>
      <ul>
        {studyList.map((key, index) => (
          <li key={key}>
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
      <style jsx>{`
        ul {
          margin-top: 1.5rem;
        }

        li {
          --color-selection: var(--color-light-highlight);

          border-radius: 0.75rem;
          box-shadow: var(--card-shadow-main);
          display: flex;
          flex-direction: column;
          padding: 2rem;
        }

        li > * {
          margin-left: auto;
          margin-right: auto;
        }

        li p {
          padding: 1rem 0 0;
        }

        li:focus {
          box-shadow: var(--card-shadow-focus);
        }

        @media (min-width: 50em) {
          li {
            align-items: center;
            flex-direction: row;
            margin: 0 auto;
            max-width: 80vw;
            padding: 0 1.5rem 0 0;
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
          ul {
            display: flex;
            justify-content: space-between;
            max-width: 80rem;
          }

          li {
            flex-direction: column;
            max-width: 26rem;
            padding: 0 0 2rem;
            flex-basis: 33%;
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
