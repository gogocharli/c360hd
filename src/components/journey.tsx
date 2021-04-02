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
            <Image
              src={`/images/${key}-img.png`}
              alt=''
              width={310}
              height={184}
              layout='intrinsic'
              objectFit='contain'
              className='blend'
            />
            <p className='[ text-300 md:text-400  ][ align-center ]'>
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
          border-radius: 0.75rem;
          box-shadow: var(--card-shadow-main);
          display: flex;
          flex-direction: column;
          padding: 2rem;
        }

        li p {
          padding: 1rem 2rem 0;
        }

        li:focus {
          box-shadow: var(--card-shadow-focus);
        }
      `}</style>
    </>
  );
}
