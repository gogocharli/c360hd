import type { GalleryListItem } from './gallery-item';
import { initalItems } from './gallery-items';

type GalleryAction =
  | { type: 'reset' }
  | { type: 'filter'; filter: string }
  | { type: 'search'; search: string };

interface GalleryState {
  search: string;
  filter: string;
  items: GalleryListItem[] | undefined;
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

export { categoryReducer, initCategory };
