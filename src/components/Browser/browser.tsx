import { useState } from 'react';
import { Listing } from './listing';
import { LoadingBars } from './loading-bars';
import { SearchScreen } from './search-screen';

export function Browser() {
  const [screen, setScreen] = useState<'idle' | 'query' | 'results'>('idle');

  return (
    <>
      <div id='browser' className='browser' aria-hidden='true'>
        <div className='browser__wrapper'>
          <div className='browser__content'>
            {screen === 'results' ? (
              <>
                <LoadingBars />
                <Listing />
                <video loop preload='metadata' width={917} tabIndex={-1}>
                  <source
                    src='/browser/morency-coiffure.webm'
                    type='video/webm'
                  />
                  <source
                    src='/browser/morency-coiffure.mp4'
                    type='video/mp4'
                  />
                </video>
              </>
            ) : screen === 'query' ? (
              <SearchScreen query />
            ) : (
              <SearchScreen />
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .browser {
          --theme-color-bg: var(--color-light-main);
          --theme-color-fg: var(--color-dark-main);
          --theme-color-hg: var(--color-light-highlight);
          --browser-border-shadow: 0px 1px 0px rgba(142, 175, 255, 0.21);

          border-radius: 4px;
          box-sizing: content-box;
          box-shadow: 0px 0px 20px 2px rgb(73 99 151 / 0.3);
          color: hsl(var(--theme-color-fg));
          line-height: 1;
          margin: 1.5rem auto 0;
          overflow: hidden;
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
          pointer-events: none;
          position: absolute;
          top: var(--menu-size);
          width: 100%;
        }

        video {
          border-bottom: 2px solid hsl(var(--color-dark-highlight));
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }

        @media (min-width: 50em) {
          .browser__content {
            --menu-size: 48px;
          }
        }

        @media (min-width: 65em) {
          .browser {
            margin-top: 2.5rem;
          }

          .browser__content {
            --menu-size: 56px;
          }
        }
      `}</style>
      <style jsx>{`
        .browser__content {
          flex-direction: ${screen === 'results' ? 'row' : 'column'};
          justify-content: ${screen === 'results' ? 'space-between' : 'center'};
        }
      `}</style>
    </>
  );
}
