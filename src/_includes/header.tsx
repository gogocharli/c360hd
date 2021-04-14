import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useMediaQuery } from '../hooks/useMediaQuery';
import { NavList, FootLinks } from '@components/nav-list';
import Symbol from '@components/logos/symbol-c360.svg';
import MenuIcon from '@components/glyph-bars.svg';
import { useTranslation } from 'next-i18next';
import { Button } from '@components/button';

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
      <Button href='#main-content' className='[ skip-link ] [ button ]'>
        {t('links.skip-link')}
      </Button>
      <header role='banner' className='[ site-head ] [ wrapper ]'>
        <Link href='/'>
          <a
            className='site-head__brand'
            aria-label={`${t('links.home')} - C360HD`}
          >
            <Symbol />
          </a>
        </Link>
        {isSmallViewPort ? (
          <AnimatePresence>
            <motion.div
              className='menu-wrapper'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* hidden to hide from everyone but screen reader users */}
              <span hidden id='menu-label'>
                Main Menu
              </span>
              <motion.button
                className='menu-toggle'
                id='menu-toggle'
                aria-labelledby='menu-label'
                aria-expanded={isMenuOpen}
                onClick={handleMenuToggle}
                whileTap={{ scale: 0.95 }}
              >
                <MenuIcon />
              </motion.button>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className='[ menu ]'
                    id='menu'
                    initial={{ clipPath: 'ellipse(0vmax 0vmax at 100% 0%)' }}
                    animate={{
                      clipPath: 'ellipse(120vmax 120vmax at 100% 0%)',
                    }}
                    exit={{
                      clipPath: 'ellipse(0vmax 0vmax at 100% 0%)',
                    }}
                  >
                    <div className='[ menu__wrapper ] [ flow ]'>
                      <nav className='[ nav ] [ menu__nav ]'>
                        <NavList />
                      </nav>
                      <FootLinks noLogo />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <motion.nav
              className='[ nav ] [ site-head__nav ]'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NavList reduced />
            </motion.nav>
          </AnimatePresence>
        )}
      </header>
      <style jsx>{`
        :global(.skip-link) {
          --default-bg: var(--theme-color-hg);
          --default-color: var(--theme-color-fg);

          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          z-index: 99; // Always keep on top
        }

        :global(.skip-link:not(:focus)) {
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
          color: inherit;
          height: 2rem;
          line-height: 1;
        }

        .site-head__brand > :global(svg) {
          width: 2rem;
        }

        .site-head__brand > :global(svg > *) {
          fill: currentColor;
        }

        :global(.menu) {
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
          will-change: clip-path;

          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          z-index: 10;
        }

        :global(.menu__wrapper) {
          --flow-space: 2rem;
          flex: 0;
          margin-top: -5rem;
        }

        :global(.menu-toggle) {
          background: 0;
          background-color: hsl(var(--theme-color-fg));
          border: 0;
          border-radius: 100px;
          box-sizing: content-box;
          height: 2rem;
          padding: 0;
          position: relative;
          transition: background-color 250ms ease-out;
          width: 3rem;
          z-index: 20;
        }

        :global(.menu-toggle rect) {
          fill: hsl(var(--theme-color-bg));
          transition: fill 250ms ease-out;
        }

        :global(.menu-toggle[aria-expanded='true']) {
          background-color: hsl(var(--theme-color-bg));
        }

        :global(.menu-toggle[aria-expanded='true'] rect) {
          fill: hsl(var(--theme-color-fg));
        }

        .nav__list {
          display: flex;
          align-items: center;
        }

        @media (min-width: 32em) {
          .site-head__brand {
            height: 4rem;
          }

          .site-head__brand > :global(svg) {
            width: 4rem;
          }
        }

        @media (min-width: 65em) {
          header {
            max-width: min(66vw, 90rem);
          }
        }
      `}</style>

      <style jsx global>{`
        body {
          overflow-y: ${isMenuOpen ? 'hidden' : 'auto'};
        }
      `}</style>
    </>
  );
}
