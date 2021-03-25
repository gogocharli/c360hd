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
        <a>{t('skip-link')}</a>
      </Link>
      <header role='banner' className='site-head'>
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
              <div className='menu' id='menu'>
                <nav>
                  <NavList />
                </nav>
                <FootLinks />
              </div>
            )}
          </div>
        ) : (
          <nav>
            <NavList reduced />
          </nav>
        )}
      </header>
    </>
  );
}
