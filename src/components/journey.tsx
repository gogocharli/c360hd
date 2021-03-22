import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const studyList = ['location', 'packing', 'busy'];

export function JourneyHighlights() {
  const { t } = useTranslation('home');

  return (
    <ul>
      {studyList.map((key, index) => (
        <li key={key}>
          <Image
            src={`/images/${key}-img.png`}
            alt=''
            width={310}
            height={184}
          />
          <p>{t(`sections.0.content.${index}`)}</p>
        </li>
      ))}
    </ul>
  );
}
