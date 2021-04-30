import type { GalleryListItem } from './gallery-item';

type GalleryAction =
  | { type: 'reset' }
  | { type: 'filter'; filter: string }
  | { type: 'search'; query: string };

interface GalleryState {
  search: string;
  filter: string;
  items?: GalleryListItem[] | undefined;
  initialItems: GalleryListItem[];
}

function categoryReducer(
  state: GalleryState,
  action: GalleryAction,
): GalleryState {
  switch (action.type) {
    case 'reset': {
      const { initialItems } = state;
      return {
        search: '',
        filter: '',
        items: initialItems,
        initialItems,
      };
    }
    case 'filter': {
      const { filter: newFilter } = action;
      const { initialItems } = state;
      const newList = initialItems.filter(
        filterByCategory(newFilter),
      ) as GalleryListItem[];

      return {
        ...state,
        search: '',
        filter: newFilter,
        items: newList,
      };
    }
    case 'search': {
      const { query } = action;
      const { items, filter, search, initialItems } = state;

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
          ? initialItems.filter(filterByCategory(filter || 'all'))
          : [];

      // Get items which match the search query
      // TODO change from linear search to hash function indexing
      const newList = itemList.filter((item) =>
        item.name.toLowerCase().includes(query),
      );
      return {
        ...state,
        search: query,
        items: newList,
      };
    }
    default:
      throw new Error(
        // @ts-ignore
        `Invalid action type "${action.type}" in categoryReducer`,
      );
  }
}

function initCategory({
  filter = '',
  search = '',
  initialItems,
}: GalleryState): GalleryState {
  return {
    search,
    filter,
    items: filter
      ? initialItems.filter(filterByCategory(filter))
      : initialItems,
    initialItems: initialItems,
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
