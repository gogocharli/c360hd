import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';

export function GalleryItem({
  client,
  orientation = 'vertical',
}: {
  client: GalleryListItem;
  orientation?: 'horizontal' | 'vertical';
}) {
  const { src, name, category } = client;

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className='gallery__item'>
          <div className='img-wrapper'>
            <Image
              src={src || '/gallery/excel-plus-img.jpg'}
              alt=''
              width={96}
              height={96}
            />
          </div>
          <div className='text'>
            <h4 className='[ text-300 md:text-400 ] [ weight-medium ]'>
              {name}
            </h4>
            <p className='text-100'>{category}</p>
          </div>
        </Dialog.Trigger>
        <Dialog.Overlay className='modal-overlay' />
        <Dialog.Content className='gallery__modal'>
          <StreetViewModal address={client.address} />
        </Dialog.Content>
      </Dialog.Root>
      <style jsx>{`
        :global(.gallery__item) {
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

        :global(.gallery__modal) {
          // Aspect ratio 16/9
          height: 0;
          width: 80vw;
          overflow: hidden;
          position: fixed;
          padding-top: 56.25%;

          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        :global(.modal-overlay) {
          background-color: hsl(var(--color-dark-main) / 70%);
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
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
        :global(.gallery__item) {
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

function StreetViewModal({ address }: { address: string | GeoCode }) {
  /**
   * The address can either be a string or a lat, lng tuple. The maps api expects either in a string
   * format so we create the url based on which of the types was provided at build time.
   */
  address =
    typeof address == 'object' ? `${address.lat}, ${address.lng}` : address;
  const mapsUrl = new URL(
    `https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&location=${address}`,
  ).href;

  return (
    <>
      <iframe src={mapsUrl} loading='lazy' allowFullScreen />
      <style jsx>{`
        iframe {
          border: 0;
          border-radius: 0.5rem;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
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
