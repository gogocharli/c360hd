export function Browser() {
  return (
    <>
      <div id='browser' className='browser'>
        <div className='browser__wrapper'>
          <div className='browser__content'>
            <img src='/images/logo-google-img.png' alt='' className='logo' />
            <div className='search__wrapper'>
              <div className='search row'>
                <img src='/icons/icon-search.svg' alt='' className='icon' />
                <span></span>
              </div>
            </div>
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
          overflow: hidden;
          margin-left: auto;
          margin-right: auto;
          pointer-events: none;
          position: relative;
          width: min(91.5vw, 917px);
          z-index: 5;
        }

        .browser * {
          // box-sizing: inherit;
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
          border-radius: 20px;
          box-shadow: -30px 30px 76px rgba(203, 218, 230, 0.7),
            30px -30px 80px rgba(216, 238, 238, 0.6);
          display: flex;
          flex-direction: column;
          height: 10%;
          margin-top: 3.5%;
          position: relative;
          width: 47.11%;
        }

        .search {
          align-items: center;
          display: flex;
          height: 100%;
        }

        .search .icon {
          width: 3.7%;
          margin-left: 3.7%;
          max-width: 16px;
        }

        @media (min-width: 50em) {
          .browser {
            width: 786px;
          }

          .browser__content {
            --menu-size: 48px;
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
    </>
  );
}
