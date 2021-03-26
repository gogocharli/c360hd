import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { GalleryItem } from './gallery-item';

export function GalleryRow({
  category,
  itemList,
  carousel = false,
}: {
  category: string;
  itemList: { category: string; name: string; src: string }[];
  carousel?: boolean;
}) {
  const { t } = useTranslation('portfolio');

  return (
    <div className='gallery__row'>
      <div className='row__header'>
        <h3>{t(`categories.${category}`)}</h3>
        <Link href={`/portfolio?filter=${category}`}>
          <a>{t('buttonText')}</a>
        </Link>
      </div>
      <div className='row__content'>
        {itemList.map(({ category, name, src }) => (
          <GalleryItem
            category={t(`categories.${category}`)}
            name={name}
            src={src}
            key={name}
          />
        ))}
      </div>
    </div>
  );
}
