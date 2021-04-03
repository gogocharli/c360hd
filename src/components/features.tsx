import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const featureList = [
  { key: 'show', width: 76 },
  { key: 'activity', width: 78 },
  { key: 'shield', width: 75 },
];

export function Features() {
  const { t } = useTranslation('home');

  return (
    <>
      <ul className='align-center'>
        {featureList.map(({ key, width }, index) => (
          <li key={key}>
            <div className='image'>
              <Image
                src={`/icons/icon-${key}.png`}
                alt=''
                width={width}
                height={96}
                objectFit='contain'
              />
            </div>
            <div className='[ content ] [ flow ]'>
              <h3 className='[ text-500 lg:text-600 ] [ weight-bold ]'>
                <span className='ital'>{t(`sections.2.more`)} </span>
                {t(`sections.2.content.${index}.title`)}
              </h3>
              <p>{t(`sections.2.content.${index}.desc`)}</p>
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
          width: 23ch;
        }

        .image {
          height: 3.6em;
        }

        .content {
          --flow-space: 0.5rem;

          margin-top: 1.5rem;
        }
      `}</style>
    </>
  );
}
