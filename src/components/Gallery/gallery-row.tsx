import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { GalleryItem, GalleryListItem } from './gallery-item';

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

export function InitialRows({ items }: { items: GalleryListItem[] }) {
  // Index the list by category
  const categories = items.reduce((acc, item) => {
    const category = item.category;

    if (acc[category] == undefined) {
      acc[category] = [];
      acc[category].push(item);
    } else {
      acc[category].push(item);
    }

    return acc;
  }, {});

  // Show the first two lists with more than three items (layout requirement)
  const isLongerThan3 = ([, itemList]: [string, GalleryListItem[]]) =>
    itemList.length >= 3;

  const categoriesList = Object.entries(categories)
    .filter(isLongerThan3)
    .slice(0, 2) as [string, GalleryListItem[]][];

  return (
    <>
      {/* @todo create a recent list based on a date key in the final version */}
      <GalleryRow category='recent' itemList={items.slice(0, 3)} />
      {categoriesList.map(([category, itemList]) => (
        <GalleryRow
          category={category}
          itemList={itemList.slice(0, 3)}
          key={category}
        />
      ))}
    </>
  );
}
