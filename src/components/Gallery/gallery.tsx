import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { GalleryRow } from './gallery-row';

export function Gallery() {
  const { t } = useTranslation('portfolio');

  const itemList = [
    { category: 'fashion', name: 'Espace Flo', src: 'espace-flo-img' },
    {
      category: 'resto',
      name: 'Superfood St-Laurent',
      src: 'superfood-st-laurent-img',
    },
    { category: 'fashion', name: 'Excel Plus', src: 'excel-plus-img' },
    {
      category: 'fashion',
      name: 'Air Clothes St-Denis',
      src: 'air-clothes-st-denis-img',
    },
    {
      category: 'fashion',
      name: 'Felix Brown Shoes',
      src: 'felix-brown-shoes-img',
    },
    {
      category: 'nursery',
      name: 'Garderie Le Rucher',
      src: 'garderie-le-rucher-img',
    },
    {
      category: 'nursery',
      name: 'Centre Educatif',
      src: 'centre-educatif-img',
    },
    { category: 'nursery', name: 'Bébés en Vrac', src: 'bebes-en-vrac-img' },
  ];

  const recentList = itemList.slice(0, 3);
  const fashionList = itemList.filter(({ category }) => category === 'fashion');
  const nurseryList = itemList.filter(({ category }) => category === 'nursery');

  return (
    <div className='gallery'>
      <GalleryRow category='recent' itemList={recentList} />
      <GalleryRow category='fashion' itemList={fashionList} />
      <GalleryRow category='nursery' itemList={nurseryList} />

      <Link href='/portfolio?filter=all'>
        <a>{t('buttonText')}</a>
      </Link>
    </div>
  );
}
