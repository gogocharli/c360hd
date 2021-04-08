import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export function Listing() {
  const { t } = useTranslation('home');
  return (
    <>
      <div className='listing'>
        <div className='images'>
          <div className='photos' data-content='See photos'>
            <Image
              src='/browser/morency-center-img.jpg'
              width={147}
              height={128}
              alt='Morency Salon'
            />
          </div>
          <div className='map'>
            <Image
              src='/browser/morency-map-img.jpg'
              width={156}
              height={128}
              alt='Morency Salon'
            />
          </div>
        </div>
        <div className='title'>
          <div className='name'>Morency Coiffure</div>
          <div className='actions'>
            <p className='btn weight-bold'>Directions</p>
            <p className='btn weight-bold'>{t('browser.listing.save')}</p>
          </div>
          <div className='ratings'>
            <p>
              4.5 <img src='/browser/glyph-rating.svg' alt='' />
              <span className='text-light'>
                17 {t('browser.listing.reviews')}
              </span>
            </p>
          </div>
          <div className='description text-light'>
            <p>{t('browser.listing.description')}</p>
          </div>
        </div>
        <div className='extra'>
          <div className='info flow'>
            <p>
              <span className='weight-bold'>
                {t('browser.listing.address')} :
              </span>{' '}
              629 Rue Jarry E, Montréal, QC H2P 1V8
            </p>
            <p>
              <span className='weight-bold'>
                {t('browser.listing.hours.0')}
              </span>{' '}
              · {t('browser.listing.hours.1')}
            </p>
            <p>
              <span className='weight-bold'>
                {t('browser.listing.phone')} :
              </span>{' '}
              (514) 277-9171
            </p>
            <p className='suggestions text-light'>
              {t('browser.listing.edit')}
            </p>
          </div>
          <div className='share'>
            <p>
              <span className='weight-bold'>
                {t('browser.listing.share.0')}
              </span>{' '}
              {t('browser.listing.share.1')}
            </p>
          </div>
          <div className='questions'>
            <div>
              <p className='questions__title weight-bold'>
                {t('browser.listing.questions.0')}
              </p>
              <p className='text-light'>{t('browser.listing.questions.1')}</p>
            </div>
            <p className='btn weight-bold'>
              {t('browser.listing.questions.2')}
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .listing {
          border-radius: 4px;
          box-shadow: -30px 30px 76px rgba(203, 218, 230, 0.5),
            30px -30px 80px rgba(216, 238, 238, 0.4);
          display: flex;
          flex-basis: 36.2%;
          flex-direction: column;
          flex-grow: 0;
          font-feature-settings: 'ss02' off;
          font-size: clamp(3px, calc(0.5vw + 0.1rem), 8px);
          height: 100%;
          line-height: 1;
          overflow: hidden;
        }

        .images {
          display: flex;
          flex-basis: 30%;
        }

        .images > * {
          position: relative;
        }

        .photos {
          flex-basis: 48.5%;
        }

        .photos::after {
          background-image: linear-gradient(
            to bottom,
            rgba(0, 23, 55, 0.6),
            rgba(0, 23, 55, 0.6)
          );
          bottom: 0;
          color: hsl(var(--theme-color-bg));
          content: attr(data-content);
          padding: 0.75em;
          position: absolute;
          right: 0;
        }

        .map {
          flex-basis: 51.5%;
        }

        .map::after {
          content: url('/browser/glyph-expand.svg');
          position: absolute;
          right: 6.25%;
          top: 6.25%;
          width: 15.26%;
        }

        .title,
        .info,
        .share {
          box-shadow: var(--browser-border-shadow);
        }

        .title {
          display: flex;
          flex-direction: column;
          flex-basis: 26.2%;
          justify-content: center;
          padding-left: 5.29%;
        }

        .title > * + * {
          margin-top: 1em;
        }

        .name {
          font-size: 2.25em;
        }

        .actions {
          display: flex;
        }

        .actions p {
          width: 22.36%;
        }

        .ratings img {
          display: inline-block;
          height: clamp(3px, calc(0.5vw + 0.1rem), 8px);
          vertical-align: bottom;
        }

        .info {
          --flow-space: 1em;
          padding-bottom: 1em;
        }

        .suggestions {
          margin-top: 2em;
        }

        .share {
          padding: 1em 0;
        }

        .questions {
          align-items: center;
          display: flex;
          margin-top: 2em;
        }

        .questions__title {
          font-size: 1.5em;
          margin-bottom: 0.5em;
        }

        .questions .btn {
          margin-left: 13.5%;
          padding-left: 0.5em;
          padding-right: 0.5em;
        }

        .extra {
          flex-grow: 1;
          padding: 2.641% 5.281% 0;
        }

        .btn {
          align-items: center;
          background-color: hsl(207 100% 92%);
          border-radius: 2px;
          display: flex;
          justify-content: center;
          max-width: 72px;
          padding: 1em 0;
        }

        .btn + .btn {
          margin-left: 0.5em;
        }

        .text-light {
          color: hsl(var(--color-dark-tint));
        }

        @media (min-width: 50em) {
          .listing {
            border-radius: 8px;
          }
        }
      `}</style>
    </>
  );
}
