import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export function Browser() {
  const [screen, setScreen] = useState('query');

  return (
    <>
      <div id='browser' className='browser'>
        <div className='browser__wrapper'>
          <div className='browser__content'>
            {screen === 'results' ? (
              <>{/* Add the listing and loading */}</>
            ) : (
              <>
                <img
                  src='/images/logo-google-img.png'
                  alt=''
                  className='logo'
                />
                <div className='search__wrapper'>
                  <div className='search row'>
                    <img
                      src='/glyphs/glyph-search.svg'
                      alt=''
                      className='icon'
                    />
                    <span>Salon de coiffure</span>
                  </div>
                  {screen === 'query' && (
                    <>
                      <div className='row first-result'>
                        <div>
                          <img
                            src='/glyphs/glyph-time.svg'
                            alt=''
                            className='icon'
                            loading='lazy'
                          />
                          <span>Salon de coiffure</span>
                        </div>
                        <p>Remove</p>
                      </div>
                      <div className='row'>
                        <img
                          src='/glyphs/glyph-search.svg'
                          alt=''
                          className='icon'
                          loading='lazy'
                        />
                        <span>Salon de coiffure</span>
                      </div>
                      <div className='row'>
                        <img
                          src='/glyphs/glyph-search.svg'
                          alt=''
                          className='icon'
                          loading='lazy'
                        />
                        <span>Salon de coiffure</span>
                      </div>
                      <div className='row'>
                        <img
                          src='/glyphs/glyph-search.svg'
                          alt=''
                          className='icon'
                          loading='lazy'
                        />
                        <span>Salon de coiffure</span>
                      </div>
                      <div className='row'>
                        <img
                          src='/glyphs/glyph-search.svg'
                          alt=''
                          className='icon'
                          loading='lazy'
                        />
                        <span>Salon de coiffure</span>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .browser {
          --theme-color-bg: var(--color-light-main);
          --theme-color-fg: var(--color-dark-main);
          --theme-color-hg: var(--color-light-highlight);

          border-radius: 4px;
          box-sizing: content-box;
          box-shadow: 0px 0px 20px 2px rgb(73 99 151 / 0.3);
          color: hsl(var(--theme-color-fg));
          line-height: 1;
          margin-left: auto;
          margin-right: auto;
          overflow: hidden;
          pointer-events: none;
          position: relative;
          width: min(91.5vw, 917px);
          z-index: 5;
        }

        .browser__wrapper {
          background: url('/images/browser-img.svg');
          background-repeat: no-repeat;
          background-color: inherit;
          background-size: contain;
          height: 0;
          padding: 58% 0 0; // Conserve aspect ratio
        }

        .browser__content {
          --menu-size: 10.5%;

          align-items: center;
          display: flex;
          flex-direction: column;
          height: calc(100% - var(--menu-size));
          justify-content: center;
          left: 0;
          margin-left: auto;
          margin-right: auto;
          padding: 2.617% 4.362%;
          position: absolute;
          top: var(--menu-size);
          width: 100%;
        }

        .browser__content .logo {
          max-width: 40%;
        }

        .search__wrapper {
          background-color: hsl(var(--theme-color-bg));
          border-radius: 8px;
          box-shadow: -30px 30px 76px rgba(203, 218, 230, 0.7),
            30px -30px 80px rgba(216, 238, 238, 0.6);
          display: flex;
          flex-direction: column;
          height: 11.22%;
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

        @media (min-width: 50em) {
          .browser {
            width: 786px;
          }

          .browser__content {
            --menu-size: 48px;
          }

          .search__wrapper {
            border-radius: 16px;
          }
        }

        @media (min-width: 65em) {
          .browser {
            width: 917px;
          }

          .browser__content {
            --menu-size: 56px;
          }

          .search__wrapper {
            border-radius: 10px;
          }
        }
      `}</style>

      <style jsx>{`
        .search__wrapper {
          height: ${screen === 'default' ? 100 : 52.6}%;
        }

        .row {
          height: ${screen === 'default' ? 100 : 14.3}%;
        }

        .search {
          height: ${screen === 'default' ? 100 : 23}%;
          box-shadow: ${screen === 'default'
            ? ''
            : '0px 1px 0px rgba(142, 175, 255, 0.21)'};
        }
      `}</style>
    </>
  );
}
