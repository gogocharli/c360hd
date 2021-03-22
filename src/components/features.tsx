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
    <ul>
      {featureList.map(({ key, width }, index) => (
        <li key={key}>
          <Image
            src={`/icons/icon-${key}.png`}
            alt=''
            width={width}
            height={72}
          />
          <p>{t(`sections.2.content.${index}.title`)}</p>
          <p>{t(`sections.2.content.${index}.desc`)}</p>
        </li>
      ))}
    </ul>
  );
}
