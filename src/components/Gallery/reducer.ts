import type { GalleryListItem } from './gallery-item';
import { initalItems } from './gallery-items';

type GalleryAction =
  | { type: 'reset' }
  | { type: 'filter'; filter: string }
  | { type: 'search'; query: string };

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
      const { query } = action;
      const { items, filter, search } = state;

      /*
        Search through the current items if there's any
        When the user removes characters search against 
        the original filtered list
        Otherwise, return an empty list. We know they can't be
        any more matches so no need to repopulate the list
       */
      const itemList =
        items.length > 0
          ? items
          : query.length < search.length
          ? initalItems.filter(filterByCategory(filter || 'all'))
          : [];

      // Get items which match the search query
      // TODO change from linear search to hash function indexing
      const newList = itemList.filter((item) => item.name.includes(query));
      return {
        ...state,
        search: query,
        items: newList,
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
