import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MapModal = dynamic(import('./gallery-modal'));

export function GalleryItem({
  client,
  orientation = 'vertical',
}: {
  client: GalleryListItem;
  orientation?: 'horizontal' | 'vertical';
}) {
  const [isExpanded, setExpanded] = useState(false);
  const { src, name, category } = client;
  const close = () => setExpanded(false);
  return (
    <>
      <button
        className='gallery__item'
        onClick={() => setExpanded((state) => !state)}
        aria-expanded={isExpanded}
      >
        <div className='img-wrapper'>
          <Image
            src={src || '/gallery/excel-plus-img.jpg'}
            alt=''
            width={96}
            height={96}
          />
        </div>
        <div className='text'>
          <h4 className='[ text-300 md:text-400 ] [ weight-medium ]'>{name}</h4>
          <p className='text-100'>{category}</p>
        </div>
      </button>
      {isExpanded && <MapModal address={client.address} close={close} />}
      <style jsx>{`
        button {
          background: 0;
          border: 0;
          padding: 0;

          align-items: center;
          border-radius: 0.5rem;
          box-shadow: -10px 10px 20px rgba(203, 218, 230, 0.2),
            10px -10px 20px rgba(216, 238, 238, 0.1);
          display: flex;
        }

        h4 {
          line-height: 1;
        }

        p {
          font-feature-settings: 'ss02' off;
          line-height: 1.33rem;
        }

        .img-wrapper {
          clip-path: circle();
          height: 64px;
          width: 64px;
        }

        @supports (aspect-ratio: 1) {
          .img-wrapper {
            height: unset;
            aspect-ratio: 1;
          }
        }

        @media (min-width: 50em) {
          .img-wrapper {
            width: 96px;
            height: 96px;
          }

          @supports (aspect-ratio: 1) {
            .img-wrapper {
              height: unset;
              aspect-ratio: 1;
            }
          }

          h4 {
            line-height: 1.2;
          }
        }
      `}</style>
      <style jsx>{`
        button {
          flex-direction: ${orientation == 'horizontal' ? 'row' : 'column'};
          justify-content: ${orientation == 'horizontal'
            ? 'flex-start'
            : 'center'};
          padding: ${orientation == 'horizontal' ? '1.5rem 2rem' : '1rem 0'};
        }

        .text {
          margin: ${orientation == 'horizontal' ? '0 0 0 1rem' : '1rem 0 0 0'};
          text-align: ${orientation == 'horizontal' ? 'left' : 'center'};
        }
      `}</style>
    </>
  );
}

interface GalleryListItem {
  category: string;
  created: string;
  name: string;
  src: string;
  address: GeoCode | string;
}

export interface GeoCode {
  lat: string;
  lng: string;
}
export type { GalleryListItem };
