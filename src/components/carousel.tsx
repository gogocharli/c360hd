import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export function HomeCarousel() {
  const { t } = useTranslation('home');
  const slidesList = ['trust', 'action', 'interest'];

  return (
    <>
      <ul>
        {slidesList.map((key, index) => (
          <li key={key}>
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
              <h3 className='[ text-550 lg:text-600 ] [ measure-micro leading-flat ]'>
                {t(`sections.1.content.${index}.title`)}
              </h3>
              <p className='[ text-300 ]'>
                {t(`sections.1.content.${index}.desc`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          padding: 0 1rem;
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

        .image {
          height: 224px;
          width: 240px;
        }

        .content {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
}
