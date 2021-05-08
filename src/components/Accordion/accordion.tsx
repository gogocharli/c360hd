import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useAccordionContext,
} from '@reach/accordion';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Menu({ children }: { children: React.ReactNode }) {
  return <Accordion collapsible>{children}</Accordion>;
}

function Item({
  children,
  item,
  index,
}: {
  children: React.ReactNode;
  item: { value: string; title: string };
  index: number;
}) {
  const { openPanels } = useAccordionContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    index == openPanels[0] ? setIsOpen(true) : setIsOpen(false);
  }, [openPanels]);

  return (
    <>
      <AccordionItem className='accordion__item' data-selected={isOpen}>
        <h3 className='text-300 md:text-400 weight-normal'>
          <AccordionButton
            className='accordion__button'
            onClick={() => setIsOpen((s) => !s)}
          >
            {item.title}
            <div className='accordion__icon' aria-hidden='true'>
              <AnimatePresence>
                {isOpen ? (
                  <motion.svg
                    width={24}
                    height={24}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    initial={{ rotateX: 180 }}
                    animate={{ rotateX: 0 }}
                    exit={{ rotateX: -180 }}
                    className='icon__close'
                  >
                    <path
                      d='M5 10.957l-.002 2.114 14 .011L19 10.97l-14-.012z'
                      fill='#E8F5FF'
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    width={24}
                    height={24}
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    initial={{ rotateX: 180 }}
                    animate={{ rotateX: 0 }}
                    exit={{ rotateX: -180 }}
                    className='icon__open'
                  >
                    <path
                      d='m18.493 14.082-5.847-.005-.005 5.93-2.333-.002.005-5.93-5.82-.004.002-2.114 5.82.005.005-5.957 2.333.002-.005 5.957 5.847.004-.002 2.114z'
                      fill='#E8F5FF'
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>
          </AccordionButton>
        </h3>
        <AccordionPanel>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
                className='accordion__content'
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </AccordionPanel>
      </AccordionItem>
      <style jsx>{`
        :global(.accordion__item) {
          --default-shadow: 0px 0px 5px rgba(39, 61, 99, 0.8),
            0px 0px 5px rgba(39, 61, 99, 0.6);
          --focus-shadow: 0px 0px 5px 5px rgba(194, 228, 255, 0.2),
            0px 0px 5px rgba(39, 61, 99, 0.6);

          border-radius: 0.5rem;
          box-shadow: 0px 0px 5px rgba(39, 61, 99, 0.8),
            0px 0px 5px rgba(39, 61, 99, 0.6);
          color: hsl(var(--color-light-main));
          padding: 0.75rem 0.5rem;
          text-align: left;
          transition: box-shadow var(--transition-duration)
            var(--transition-curve);
        }

        :global(.accordion__item[data-selected='true']) {
          box-shadow: var(--focus-shadow);
        }

        h3 {
          display: flex;
          padding: 0.375rem 0.75rem;
        }

        :global(.accordion__button) {
          align-items: center;
          background: 0;
          background-color: hsl(var(--color-dark-main));
          border: 0;
          color: inherit;
          display: flex;
          flex-grow: 1;
          justify-content: space-between;
          line-height: 1.2;
          padding: 0; // Remove button padding from browser
          text-align: left;
        }

        :global(.accordion__content > p) {
          font-size: 0.8rem;
          padding: 0.5rem 0.75rem;
        }

        :global(.accordion__icon) {
          height: 1.5rem;
          margin-left: 0.5rem;
        }

        @media (min-width: 50em) {
          :global(.accordion__content > p) {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export { Item as AccordionItem, Menu as AccordionMenu };
