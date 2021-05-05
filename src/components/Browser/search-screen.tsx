import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const resultsVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  close: {
    y: '-100%',
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const searchVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 1 },
  },
  close: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export function SearchScreen({ query = false }) {
  const { t } = useTranslation('home');
  const isDefault = query === false;
  const queryText = t('browser.query');

  return (
    <>
      <img src='/images/logo-google-img.png' alt='' className='logo' />
      <motion.div
        layout
        style={{
          borderRadius: query ? 8 : 20,
          height: query ? '52.6%' : '11.22%',
        }}
        className='search__wrapper'
        variants={searchVariants}
        initial='close'
        animate={query && 'open'}
      >
        <div className='search row'>
          <img src='/glyphs/glyph-search.svg' alt='' className='icon' />
          {query && (
            <motion.p
              className='query-text'
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.2,
                    duration: 1,
                  },
                },
                close: {
                  transition: { staggerChildren: 0.05 },
                },
              }}
              initial='close'
              animate='open'
            >
              {queryText.split('').map((s, i) => (
                <motion.span
                  variants={{
                    open: { display: 'inline' },
                    close: { display: 'none' },
                  }}
                  key={`${s}-${i}`}
                >
                  {s}
                </motion.span>
              ))}
            </motion.p>
          )}
        </div>
        <AnimatePresence>
          {query && (
            <>
              <motion.div
                className='row first-result'
                variants={resultsVariants}
              >
                <div>
                  <img
                    src='/glyphs/glyph-time.svg'
                    alt=''
                    className='icon'
                    loading='lazy'
                  />
                  <span className='row__text'>{t('browser.results.0')}</span>
                </div>
                <p>{t('browser.remove')}</p>
              </motion.div>
              {Array.from(new Array(4), (_, i) => (
                <motion.div
                  className='row'
                  key={`row-${i}`}
                  variants={resultsVariants}
                >
                  <img
                    src='/glyphs/glyph-search.svg'
                    alt=''
                    className='icon'
                    loading='lazy'
                  />
                  <span className='row__text'>
                    {t(`browser.results.${i + 1}`)}
                  </span>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        @keyframes selection {
          0% {
            opacity: 0;
          }

          50% {
            opacity: 1;
          }

          100% {
            opacity: 1;
            transform: translateY(100%);
          }
        }

        .logo {
          max-width: 40%;
        }

        :global(.search__wrapper) {
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

        :global(.search__wrapper::before) {
          animation: selection 1s var(--transition-curve) 2000ms;
          animation-fill-mode: forwards;
          background-color: #cce9ff;
          content: '';
          height: 14.3%;
          opacity: 0;
          position: absolute;
          top: 23%;
          transform: translateY(0);
          width: 100%;
        }

        :global(.row) {
          align-items: center;
          display: flex;
          font-size: clamp(6px, calc(1vw + 0.1rem), 16px);
          margin-left: 4.6%;
          margin-right: 4.6%;
          position: relative;
          height: 100%;
          z-index: 2;
        }

        :global(.row__text, .query-text) {
          margin-left: 2.05%;
        }

        :global(.row.first-result) {
          justify-content: space-between;
        }

        :global(.row.first-result div) {
          align-items: center;
          display: flex;
          flex-grow: 1;
        }

        :global(.row.first-result span) {
          margin-left: 3%;
        }

        :global(.row.first-result p) {
          opacity: 0.5;
        }

        :global(.row .icon) {
          line-height: 1;
          max-width: 16px;
          opacity: 0.6;
          width: 3.7%;
        }

        @media (min-width: 65em) {
          :global(.search__wrapper) {
            border-radius: 20px;
          }
        }
      `}</style>

      <style jsx>{`
        :global(.row) {
          height: ${isDefault ? 100 : 14.3}%;
        }

        :global(.search) {
          height: ${isDefault ? 100 : 23}%;
          box-shadow: ${isDefault ? '' : 'var(--browser-border-shadow)'};
        }

        :global(.search__wrapper::before) {
          display: ${isDefault ? 'none' : 'block'};
          animation-play-state: ${isDefault ? 'paused' : 'running'};
        }

        @media (min-width: 50em) {
          :global(.search__wrapper) {
            border-radius: ${isDefault ? 20 : 16}px;
          }
        }
      `}</style>
    </>
  );
}
