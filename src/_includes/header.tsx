import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useMediaQuery } from '../hooks/useMediaQuery';
import { NavList, FootLinks } from '@components/nav-list';
import Symbol from '@components/logos/symbol-c360.svg';
import MenuIcon from '@components/glyph-bars.svg';
import { useTranslation } from 'next-i18next';

export function Header() {
  const isSmallViewPort = useMediaQuery('(max-width: 32em)');
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation('common');

  // Make sure to close the menu when the viewport grows
  // otherwise it can remain open once it shrinks back
  useEffect(() => {
    if (!isSmallViewPort) {
      setMenuOpen(false);
    }
  }, [isSmallViewPort]);

  function handleMenuToggle() {
    setMenuOpen((prevState) => !prevState);
  }

  return (
    <>
      <Link href='#main-content'>
        <a className='[ skip-link ] [ button ]'>{t('skip-link')}</a>
      </Link>
      <header role='banner' className='[ site-head ] [ wrapper ]'>
        <Link href='/'>
          <a className='site-head__brand' aria-label='Home – C360HD'>
            <Symbol />
          </a>
        </Link>
        {isSmallViewPort ? (
          <div className='menu-wrapper'>
            {/* hidden to hide from everyone but screen reader users */}
            <span hidden id='menu-label'>
              Main Menu
            </span>
            <button
              className='menu-toggle'
              id='menu-toggle'
              aria-labelledby='menu-label'
              aria-expanded={isMenuOpen}
              onClick={handleMenuToggle}
            >
              <MenuIcon />
            </button>
            {isMenuOpen && (
              <div className='[ menu ]' id='menu'>
                <div className='[ menu__wrapper ] [ flow ]'>
                  <nav className='[ nav ] [ menu__nav ]'>
                    <NavList />
                  </nav>
                  <FootLinks noLogo />
                </div>
              </div>
            )}
          </div>
        ) : (
          <nav className='[ nav ] [ site-head__nav ]'>
            <NavList reduced />
          </nav>
        )}
      </header>
      <style jsx>{`
        .skip-link {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          z-index: 99; // Always keep on top
        }

        .skip-link:not(:focus) {
          // Visually hide when not focused
          border: 0;
          clip: rect(0 0 0 0);
          height: auto;
          margin: 0;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
          white-space: nowrap;
        }

        header {
          align-items: center;
          background-color: hsl(var(--theme-color-bg));
          color: hsl(var(--theme-color-fg));
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.75rem;
          padding-top: 0.75rem;
        }

        .site-head__brand {
          line-height: 1;
          color: inherit;
        }

        .menu {
          --theme-color-bg: var(--color-dark-main);
          --theme-color-fg: var(--color-light-main);
          --theme-color-hg: var(--color-dark-highlight);

          background-color: hsl(var(--theme-color-bg));
          color: hsl(var(--theme-color-fg));
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100vh;
          padding: 1.5rem 1rem;
          position: absolute;

          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          z-index: 10;
        }

        .menu__wrapper {
          --flow-space: 2rem;
          flex-grow: 1;
        }

        .menu-toggle {
          background: 0;
          background-color: hsl(var(--theme-color-fg));
          border: 0;
          border-radius: 100px;
          box-sizing: content-box;
          height: 2rem;
          padding: 0;
          position: relative;
          width: 3rem;
          z-index: 20;
        }

        .nav__list {
          display: flex;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        body {
          overflow-y: ${isMenuOpen ? 'hidden' : 'auto'};
        }
      `}</style>

      <style jsx global>{`
        .site-head__brand svg {
          width: 2rem;
        }

        .site-head__brand svg > * {
          fill: currentColor;
        }

        .menu-toggle rect {
          fill: hsl(var(--theme-color-bg));
        }

        .menu-toggle[aria-expanded='true'] {
          background-color: hsl(var(--theme-color-bg));
        }

        .menu-toggle[aria-expanded='true'] rect {
          fill: hsl(var(--theme-color-fg));
        }

        @media (min-width: 32em) {
          .site-head__brand svg {
            width: 4rem;
          }
        }
      `}</style>
    </>
  );
}
