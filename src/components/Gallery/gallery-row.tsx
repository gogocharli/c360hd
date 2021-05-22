import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { GalleryItem, GalleryListItem } from './gallery-item';
import { useMediaQuery } from 'hooks/useMediaQuery';

export function GalleryRow({
  category,
  itemList,
  all = false,
}: {
  category: string;
  itemList: GalleryListItem[];
  all?: boolean;
}) {
  const { t } = useTranslation('portfolio');
  const isSmallViewport = useMediaQuery('(max-width: 50em)');

  const isCompleteList = all;
  const isCarousel = isSmallViewport && !isCompleteList;
  const orientation =
    isSmallViewport && isCompleteList ? 'horizontal' : 'vertical';

  return (
    <>
      <div className='gallery__row flow'>
        <div className='row__header'>
          <h3 className='[ text-400 md:text-500 ] [ weight-normal leading-flat ]'>
            {t(`categories.${category}`)}
          </h3>
          {/* Remove the link to show all when all items
         in the list are already there */}
          {!isCompleteList && (
            <Link href={`/portfolio?filter=${category}`} scroll={false}>
              <a className='[ text-300 ] [ no-deco weight-bold ]'>
                {t('buttonText')}
              </a>
            </Link>
          )}
        </div>
        <div className='row__content'>
          {itemList.map(({ name, category, ...props }) => (
            <GalleryItem
              client={{
                name,
                category: `${t(`categories.${category}`)}`,
                ...props,
              }}
              key={name}
              orientation={orientation}
            />
          ))}
        </div>
        {isCarousel && (
          <div className='carousel__scroll'>
            <button>
              <span className='visually-hidden'>Scroll to 1st</span>
            </button>
            <button>
              <span className='visually-hidden'>Scroll to 2nd</span>
            </button>
            <button>
              <span className='visually-hidden'>Scroll to last</span>
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .gallery__row > * {
          --flow-space: 1rem;
        }

        .row__header {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }

        .row__header a {
          color: inherit;
        }

        .row__content {
          display: flex;
        }

        .carousel__scroll {
          display: flex;
          justify-content: center;
        }

        .carousel__scroll > button {
          background-color: hsl(var(--theme-color-hg));
          border: 0;
          border-radius: 50%;
          height: 8px;
          padding: 0;
          width: 8px;
        }

        .carousel__scroll > * + * {
          margin-left: 8px;
        }

        @media (min-width: 50em) {
          .gallery__row > * {
            --flow-space: 2rem;
          }

          .row__content {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: repeat(auto-fill, 12rem);
            grid-gap: 1rem;
          }
        }

        @media (min-width: 65em) {
          .row__content {
            --auto-grid-min-size: 310px;
          }
        }
      `}</style>

      <style jsx>{`
        .row__content {
          flex-direction: ${isCarousel ? 'row' : 'column'};
          overflow: ${isCarousel ? 'auto' : 'unset'};
          scroll-snap-type: ${isCarousel ? 'inline mandatory' : ''};
        }

        .row__content > :global(*) {
          flex: ${isCarousel ? '0 0 66vw' : ''};
          max-width: ${isCarousel ? '20rem' : 'unset'};
          scroll-snap-align: center;
        }

        .row__content > :global(* + *) {
          margin-left: ${isCarousel ? '1rem' : 0};
        }
      `}</style>
    </>
  );
}

export function InitialRows({ items }: { items: GalleryListItem[] }) {
  // Index the list by category

  const categories = items.reduce<{
    [k: string]: GalleryListItem[] | undefined;
  }>((acc, item) => {
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
