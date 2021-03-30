import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useMediaQuery } from '../hooks/useMediaQuery';
import { NavList, FootLinks } from '@components/nav-list';
import Symbol from '@components/logos/symbol-c360.svg';
import MenuIcon from '@components/glyph-bars.svg';
import { useTranslation } from 'next-i18next';

export function Header() {
  const isSmallViewPort = useMediaQuery('(max-width: 30em)');
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
              <div className='[ menu ] [ flow ]' id='menu'>
                <nav className='[ nav ] [ menu__nav ]'>
                  <NavList />
                </nav>
                <FootLinks />
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
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.75rem;
          padding-top: 0.75rem;
        }

        .site-head__brand {
          line-height: 1;
        }

        .menu {
          --flow-space: 3rem;

          background-color: hsl(var(--color-dark-main));
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
      `}</style>

      <style jsx global>{`
        body {
          // overflow-y: ${isMenuOpen ? 'hidden' : 'auto'};
        }
      `}</style>

      <style jsx global>{`
        .site-head__brand svg {
          width: 2rem;
        }
      `}</style>
    </>
  );
}
