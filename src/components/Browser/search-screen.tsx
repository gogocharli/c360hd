import { useTranslation } from 'next-i18next';

export function SearchScreen({ query = false }) {
  const { t } = useTranslation('home');
  const isDefault = query === false;

  return (
    <>
      <img src='/images/logo-google-img.png' alt='' className='logo' />
      <div className='search__wrapper'>
        <div className='search row'>
          <img src='/glyphs/glyph-search.svg' alt='' className='icon' />
          <span>{t('browser.query')}</span>
        </div>
        {query && (
          <>
            <div className='row first-result'>
              <div>
                <img
                  src='/glyphs/glyph-time.svg'
                  alt=''
                  className='icon'
                  loading='lazy'
                />
                <span>{t('browser.results.0')}</span>
              </div>
              <p>{t('browser.remove')}</p>
            </div>
            <div className='row'>
              <img
                src='/glyphs/glyph-search.svg'
                alt=''
                className='icon'
                loading='lazy'
              />
              <span>{t('browser.results.1')}</span>
            </div>
            <div className='row'>
              <img
                src='/glyphs/glyph-search.svg'
                alt=''
                className='icon'
                loading='lazy'
              />
              <span>{t('browser.results.2')}</span>
            </div>
            <div className='row'>
              <img
                src='/glyphs/glyph-search.svg'
                alt=''
                className='icon'
                loading='lazy'
              />
              <span>{t('browser.results.3')}</span>
            </div>
            <div className='row'>
              <img
                src='/glyphs/glyph-search.svg'
                alt=''
                className='icon'
                loading='lazy'
              />
              <span>{t('browser.results.4')}</span>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .logo {
          max-width: 40%;
        }

        .search__wrapper {
          background-color: hsl(var(--theme-color-bg));
          border-radius: 8px;
          box-shadow: -30px 30px 76px rgba(203, 218, 230, 0.7),
            30px -30px 80px rgba(216, 238, 238, 0.6);
          display: flex;
          flex-direction: column;
          margin-top: 3.5%;
          position: relative;
          width: 51.6%;
        }

        .search__wrapper::before {
          background-color: #cce9ff;
          content: '';
          height: 14.3%;
          opacity: 0;
          position: absolute;
          top: 23%;
          transform: translateY(0);
          width: 100%;
        }

        .row {
          align-items: center;
          display: flex;
          font-size: clamp(6px, calc(1vw + 0.1rem), 16px);
          margin-left: 4.6%;
          margin-right: 4.6%;
          position: relative;
          height: 100%;
          z-index: 2;
        }

        .row span {
          margin-left: 2.05%;
        }

        .row.first-result {
          justify-content: space-between;
        }

        .row.first-result div {
          align-items: center;
          display: flex;
          flex-grow: 1;
        }

        .row.first-result span {
          margin-left: 3%;
        }

        .row.first-result p {
          opacity: 0.5;
        }

        .row .icon {
          line-height: 1;
          max-width: 16px;
          opacity: 0.6;
          width: 3.7%;
        }
      `}</style>

      <style jsx>{`
        .search__wrapper {
          height: ${isDefault ? 11.22 : 52.6}%;
          border-radius: ${isDefault ? 20 : 8}px;
        }

        .row {
          height: ${isDefault ? 100 : 14.3}%;
        }

        .search {
          height: ${isDefault ? 100 : 23}%;
          box-shadow: ${isDefault ? '' : 'var(--browser-border-shadow)'};
        }

        @media (min-width: 50em) {
          .search__wrapper {
            border-radius: ${isDefault ? 20 : 16}px;
          }
        }

        @media (min-width: 65em) {
          .search__wrapper {
            border-radius: 20px;
          }
        }
      `}</style>
    </>
  );
}
