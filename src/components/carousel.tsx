import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export function HomeCarousel() {
  const { t } = useTranslation('home');
  const slidesList = ['trust', 'action', 'interest'];

  return (
    <ul>
      {slidesList.map((key, index) => (
        <li key={key}>
          <Image
            src={`/images/${key}-img.png`}
            alt=''
            width={308}
            height={288}
            className='blend'
          />
          <p>{t(`sections.1.content.${index}.title`)}</p>
          <p>{t(`sections.1.content.${index}.desc`)}</p>
        </li>
      ))}
    </ul>
  );
}
