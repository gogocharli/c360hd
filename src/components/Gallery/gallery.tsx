import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { GalleryRow } from './gallery-row';
import { useEffect, useReducer } from 'react';

const initalItems = [
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

export function Gallery() {
  const { t } = useTranslation('portfolio');
  const {
    query: { filter },
  } = useRouter();
  const [state, dispatch] = useReducer(
    categoryReducer,
    { search: '', filter, items: initalItems },
    initCategory
  );

  useEffect(() => {
    if (filter) {
      dispatch({ type: 'filter', filter: filter as string });
      return;
    }
    dispatch({ type: 'reset' });
  }, [filter]);

  const isIdle = state.filter == '';
  const isFiltered = state.filter !== '';
  const isNotFound = state.items.length === 0;

  return (
    <div className='gallery'>
      {isIdle && <InitialRows items={state.items} />}
      <Link href='/portfolio?filter=all'>
        <a>{t('buttonText')}</a>
      </Link>
    </div>
  );
}

function InitialRows({ items }: { items: GalleryListItem[] }) {
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

function categoryReducer(
  state: GalleryState,
  action: GalleryAction
): GalleryState {
  switch (action.type) {
    case 'reset': {
      return {
        search: '',
        filter: '',
        items: initalItems,
      };
    }
    case 'filter': {
      const { filter: newFilter } = action;
      const newList = initalItems.filter(
        filterByCategory(newFilter)
      ) as GalleryListItem[];

      return {
        search: '',
        filter: newFilter,
        items: newList,
      };
    }
    case 'search': {
      const { search } = action;
      const { items } = state;

      // Search trough the current items
      return {
        ...state,
        search,
      };
    }
    default:
      throw new Error(
        // @ts-ignore
        `Invalid action type "${action.type}" in categoryReducer`
      );
  }
}

function initCategory({
  filter = '',
  search = '',
  items: initalItems,
}: GalleryState): GalleryState {
  return {
    search,
    filter,
    items: filter ? initalItems.filter(filterByCategory(filter)) : initalItems,
  };
}

function filterByCategory(filter: string) {
  return function isFromCategory({ category: itemCategory }: GalleryListItem) {
    // In case of the recent or all filter, show everything
    if (filter === 'recent' || filter === 'all') return true;

    return itemCategory === filter;
  };
}

type GalleryAction =
  | { type: 'reset' }
  | { type: 'filter'; filter: string }
  | { type: 'search'; search: string };

interface GalleryListItem {
  category: string;
  name: string;
  src: string;
}

interface GalleryState {
  search: string;
  filter: string;
  items: GalleryListItem[] | undefined;
}
