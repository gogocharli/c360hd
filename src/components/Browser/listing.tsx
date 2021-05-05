import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { motion, Variants } from 'framer-motion';

export function Listing() {
  const { t } = useTranslation('home');
  return (
    <>
      <motion.div
        className='listing'
        variants={listingVariants}
        initial='close'
        animate='open'
        exit='exit'
      >
        <motion.div className='images' variants={itemVariants}>
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
        </motion.div>
        <motion.div className='title' variants={itemVariants}>
          <motion.div className='name' variants={itemVariants}>
            Morency Coiffure
          </motion.div>
          <motion.div className='actions' variants={itemVariants}>
            <p className='btn weight-bold'>Directions</p>
            <p className='btn weight-bold'>{t('browser.listing.save')}</p>
          </motion.div>
          <motion.div className='ratings' variants={itemVariants}>
            <p>
              4.5 <img src='/browser/glyph-rating.svg' alt='' />
              <span className='text-light'>
                17 {t('browser.listing.reviews')}
              </span>
            </p>
          </motion.div>
          <motion.div
            className='description text-light'
            variants={itemVariants}
          >
            <p>{t('browser.listing.description')}</p>
          </motion.div>
        </motion.div>
        <motion.div className='extra' variants={itemVariants}>
          <motion.div className='info flow' variants={itemVariants}>
            <p>
              <span className='weight-bold'>
                {t('browser.listing.address')} :
              </span>{' '}
              629 Rue Jarry E, Montréal, QC H2P 1V8
            </p>
            <p>
              <span className='weight-bold'>
                {t('browser.listing.hours.0')}
              </span>{' '}
              · {t('browser.listing.hours.1')}
            </p>
            <p>
              <span className='weight-bold'>
                {t('browser.listing.phone')} :
              </span>{' '}
              (514) 277-9171
            </p>
            <p className='suggestions text-light'>
              {t('browser.listing.edit')}
            </p>
          </motion.div>
          <motion.div className='share' variants={itemVariants}>
            <p>
              <span className='weight-bold'>
                {t('browser.listing.share.0')}
              </span>{' '}
              {t('browser.listing.share.1')}
            </p>
          </motion.div>
          <motion.div className='questions' variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <p className='questions__title weight-bold'>
                {t('browser.listing.questions.0')}
              </p>
              <p className='text-light'>{t('browser.listing.questions.1')}</p>
            </motion.div>
            <p className='btn weight-bold'>
              {t('browser.listing.questions.2')}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      <style jsx>{`
        :global(.listing) {
          border-radius: 4px;
          box-shadow: -30px 30px 76px rgba(203, 218, 230, 0.5),
            30px -30px 80px rgba(216, 238, 238, 0.4);
          display: flex;
          flex-basis: 36.2%;
          flex-direction: column;
          flex-grow: 0;
          font-feature-settings: 'ss02' off;
          font-size: clamp(3px, calc(0.5vw + 0.1rem), 8px);
          height: 100%;
          line-height: 1;
          overflow: hidden;
        }

        :global(.images) {
          display: flex;
          flex-basis: 30%;
        }

        :global(.images > *) {
          position: relative;
        }

        :global(.photos) {
          flex-basis: 48.5%;
        }

        :global(.photos::after) {
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

        :global(.map) {
          flex-basis: 51.5%;
        }

        :global(.map::after) {
          content: url('/browser/glyph-expand.svg');
          position: absolute;
          right: 6.25%;
          top: 6.25%;
          width: 15.26%;
        }

        :global(.title, .info, .share) {
          box-shadow: var(--browser-border-shadow);
        }

        :global(.title) {
          display: flex;
          flex-direction: column;
          flex-basis: 26.2%;
          justify-content: center;
          padding-left: 5.29%;
        }

        :global(.title > * + *) {
          margin-top: 1em;
        }

        :global(.name) {
          font-size: 2.25em;
        }

        :global(.actions) {
          display: flex;
        }

        :global(.actions p) {
          width: 22.36%;
        }

        :global(.ratings img) {
          display: inline-block;
          height: clamp(3px, calc(0.5vw + 0.1rem), 8px);
          vertical-align: bottom;
        }

        :global(.info) {
          --flow-space: 1em;
          padding-bottom: 1em;
        }

        :global(.suggestions) {
          margin-top: 2em;
        }

        :global(.share) {
          padding: 1em 0;
        }

        :global(.questions) {
          align-items: center;
          display: flex;
          margin-top: 2em;
        }

        :global(.questions__title) {
          font-size: 1.5em;
          margin-bottom: 0.5em;
        }

        :global(.questions .btn) {
          margin-left: 13.5%;
          padding-left: 0.5em;
          padding-right: 0.5em;
        }

        :global(.extra) {
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
          :global(.listing) {
            border-radius: 8px;
          }
        }
      `}</style>
    </>
  );
}

const listingVariants: Variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
  close: {
    x: 500,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  exit: {
    opacity: 0,
    x: 500,
    transition: {
      duration: 0.5,
    },
  },
};

const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        stiffness: 1000,
        velocity: -50,
      },
      staggerChildren: 0.05,
      delayChilren: 0.5,
    },
  },
  close: {
    y: '40%',
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      staggerChildren: 0.05,
    },
  },
};
