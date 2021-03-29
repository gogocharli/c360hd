import Image from 'next/image';

export function GalleryItem({
  name,
  category,
  src,
  orientation = 'vertical',
}: {
  name: string;
  category: string;
  src: string;
  orientation?: 'horizontal' | 'vertical';
}) {
  return (
    <>
      <button className='gallery__item'>
        <div className='img-wrapper'>
          <Image src={`/gallery/${src}.jpg`} alt='' width={96} height={96} />
        </div>
        <h4>{name}</h4>
        <p>{category}</p>
      </button>
      <style jsx>
        {`
          .img-wrapper {
            width: 64px;
            height: 64px;
            border-radius: 100%;
            overflow: hidden;
          }

          @supports (aspect-ratio: 1) {
            .img-wrapper {
              height: unset;
              aspect-ratio: 1;
            }
          }

          @media (min-width: 32em) {
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
          }
        `}
      </style>
    </>
  );
}

interface GalleryListItem {
  category: string;
  name: string;
  src: string;
}

export type { GalleryListItem };
