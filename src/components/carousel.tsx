import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const slidesList = ['trust', 'action', 'interest'];

export function HomeCarousel() {
  const { t } = useTranslation('home');

  return (
    <ul>
      {slidesList.map((key, index) => (
        <li key={key}>
          <Image
            src={`/images/${key}-img.png`}
            alt=''
            width={308}
            height={288}
          />
          <p>{t(`sections.1.content.${index}.title`)}</p>
          <p>{t(`sections.1.content.${index}.desc`)}</p>
        </li>
      ))}
    </ul>
  );
}
