import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const featureList = [
  { key: 'show', width: 108, height: 102 },
  { key: 'activity', width: 106, height: 98 },
  { key: 'shield', width: 108, height: 103 },
];

export function Features() {
  const { t } = useTranslation('home');

  return (
    <>
      <ul className='align-center'>
        {featureList.map(({ key, width, height }, index) => (
          <li key={key}>
            <div className='image'>
              <Image
                src={`/icons/icon-${key}.png`}
                alt=''
                width={width}
                height={height}
                layout='intrinsic'
                objectFit='contain'
              />
            </div>
            <div className='[ content ] [ flow ]'>
              <h3 className='[ text-500 lg:text-550 ] [ weight-bold ]'>
                <span className='ital'>{t(`sections.2.more`)} </span>
                {t(`sections.2.content.${index}.title`)}
              </h3>
              <p className='text-300 lg:text-400'>
                {t(`sections.2.content.${index}.desc`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          padding: 0;
        }

        li + li {
          margin-top: 2.5rem;
        }

        p {
          margin-left: auto;
          margin-right: auto;
          max-width: 23ch;
        }

        .image {
          height: 3.6em;
          margin-left: auto;
          margin-right: auto;
          max-width: 5rem;
        }

        .content {
          --flow-space: 0.5rem;

          margin-top: 1.5rem;
        }

        @media (min-width: 50em) {
          ul {
            display: flex;
            justify-content: center;
          }

          li {
            align-items: center;
            display: flex;
            flex-direction: column;
          }

          li + li {
            margin-top: 0;
            margin-left: 2rem;
          }

          .image {
            margin: 0;
            max-width: 5.5rem;
          }
        }

        @media (min-width: 65em) {
          li + li {
            margin-left: 3rem;
          }

          .image {
            height: 6rem;
            max-width: 6.75rem;
          }
        }
      `}</style>
    </>
  );
}
