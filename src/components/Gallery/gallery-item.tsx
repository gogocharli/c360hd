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
        <div className='text'>
          <h4 className="[ text-300 md:text-400 ] [ weight-medium ]">{name}</h4>
          <p className="text-100">{category}</p>
        </div>
      </button>
      <style jsx>{`
        button {
          background: 0;
          border: 0;
          padding: 0;

          align-items: center;
          border-radius: .5rem;
          box-shadow:-10px 10px 20px rgba(203, 218, 230, 0.2), 10px -10px 20px rgba(216, 238, 238, 0.1);
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
          border-radius: 100%;
          height: 64px;
          overflow: hidden;
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
          justify-content: ${orientation == 'horizontal' ? 'flex-start' : 'center'};
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
  name: string;
  src: string;
}

export type { GalleryListItem };
