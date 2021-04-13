import Image from 'next/image';
import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { GalleryRow, InitialRows } from './gallery-row';
import { initalItems } from './gallery-items';
import { categoryReducer, initCategory } from './reducer';
import { Button } from '@components/button';

export function Gallery({ search }: { search: string }) {
  const { t } = useTranslation('portfolio');
  const {
    query: { filter },
  } = useRouter();
  const [state, dispatch] = useReducer(
    categoryReducer,
    { search: '', filter, items: initalItems },
    initCategory,
  );

  useEffect(() => {
    if (filter) {
      dispatch({ type: 'filter', filter: filter as string });
      return;
    }
    dispatch({ type: 'reset' });
  }, [filter]);

  useEffect(() => {
    if (search == '') {
      filter
        ? dispatch({ type: 'filter', filter: filter as string })
        : dispatch({ type: 'reset' });
      return;
    }

    dispatch({ type: 'search', query: search.toLowerCase() });
  }, [search]);

  const isIdle = state.filter == '';
  const hasResults = state.items.length !== 0;

  return (
    <>
      <div className='gallery flow'>
        {hasResults ? (
          isIdle ? (
            <InitialRows items={state.items} />
          ) : (
            <GalleryRow category={state.filter} itemList={state.items} all />
          )
        ) : (
          <div className='error'>
            <Image
              src='/images/magnifier-img.png'
              alt=''
              width={48}
              height={48}
              className='blend'
            />
            <p className='align-center measure-short'>
              {t('search.noResults')}
            </p>
          </div>
        )}
        {/* Return to the idle state when every client is listed */}
        <Button href='/portfolio?filter=all'>
          {state.filter == 'all' ? t('sort') : t('buttonText')}
        </Button>
      </div>
      <style jsx>{`
        .gallery {
          --flow-space: 2.5rem;
          display: flex;
          flex-direction: column;
        }

        .gallery > :global(.button) {
          --default-color: var(--color-dark-main);

          align-self: center;
          margin-top: 4rem;
        }

        .error {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1.5rem 0;
        }

        .error p {
          margin-top: 1.5rem;
        }
      `}</style>
    </>
  );
}
