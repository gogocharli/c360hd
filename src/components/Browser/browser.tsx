import { useState } from 'react';
import Image from 'next/image';
import { SearchScreen } from './search-screen';

export function Browser() {
  const [screen, setScreen] = useState('results');

  return (
    <>
      <div id='browser' className='browser'>
        <div className='browser__wrapper'>
          <div className='browser__content'>
            {screen === 'results' ? (
              <>
                <div className='loading'></div>
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
                      <p className='btn weight-bold'>Save</p>
                    </div>
                    <div className='ratings'>
                      <p>
                        4.5 <img src='/browser/glyph-rating.svg' alt='' />
                        <span className='text-light'>17 Google Reviews</span>
                      </p>
                    </div>
                    <div className='description text-light'>
                      <p>Hair salon in Montreal, Quebec</p>
                    </div>
                  </div>
                  <div className='extra'>
                    <div className='info flow'>
                      <p>
                        <span className='weight-bold'>Address :</span> 629 Rue
                        Jarry E, Montréal, QC H2P 1V8
                      </p>
                      <p>
                        <span className='weight-bold'>Hours : Open</span> ·
                        Closes 9 p.m.
                      </p>
                      <p>
                        <span className='weight-bold'>Phone :</span> (514)
                        277-9171
                      </p>
                      <p className='suggestions text-light'>
                        Suggest an edit · Own this business?
                      </p>
                    </div>
                    <div className='share'>
                      <p>
                        <span className='weight-bold'>Know this place? :</span>{' '}
                        Share the latest info
                      </p>
                    </div>
                    <div className='questions'>
                      <div>
                        <p className='questions__title weight-bold'>
                          Questions and Answers
                        </p>
                        <p className='text-light'>
                          Be the first to ask a question
                        </p>
                      </div>
                      <p className='btn weight-bold'>Ask a question</p>
                    </div>
                  </div>
                </div>
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
          margin-left: auto;
          margin-right: auto;
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

        // Results
        .loading,
        .listing {
          flex-grow: 0;
          height: 100%;
        }

        .loading {
          flex-basis: 49%;
        }

        .listing {
          border-radius: 4px;
          box-shadow: -30px 30px 76px rgba(203, 218, 230, 0.5),
            30px -30px 80px rgba(216, 238, 238, 0.4);
          display: flex;
          flex-basis: 36.2%;
          flex-direction: column;
          font-feature-settings: 'ss02' off;
          font-size: clamp(3px, calc(0.5vw + 0.1rem), 8px);
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
          .browser {
            width: 786px;
          }

          .browser__content {
            --menu-size: 48px;
          }

          .listing {
            border-radius: 8px;
          }
        }

        @media (min-width: 65em) {
          .browser {
            width: 917px;
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
