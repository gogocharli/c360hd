import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlusIcon from './icon-plus.svg';
import MinusIcon from './icon-minus.svg';

function Menu({ children }: { children: React.ReactNode }) {
  return <Accordion collapsible>{children}</Accordion>;
}

const MotionIconPlus = motion(PlusIcon);
const MotionIconMinus = motion(MinusIcon);

function Item({
  children,
  item,
}: {
  children: React.ReactNode;
  item: { value: string; title: string };
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AccordionItem className='accordion__item'>
        <h3 className='text-300 md:text-400 weight-normal'>
          <AccordionButton
            className='accordion__button'
            onClick={() => setIsOpen((s) => !s)}
          >
            {item.title}
            <div className='accordion__icon' aria-hidden='true'>
              <AnimatePresence>
                {isOpen ? (
                  <MotionIconMinus
                    initial={{ rotateX: 180 }}
                    animate={{ rotateX: 0 }}
                    exit={{ rotateX: -180 }}
                    className='icon__close'
                    width={24}
                  />
                ) : (
                  <MotionIconPlus
                    initial={{ rotateX: 180 }}
                    animate={{ rotateX: 0 }}
                    exit={{ rotateX: -180 }}
                    className='icon__open'
                    width={24}
                  />
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
          border-radius: 0.5rem;
          box-shadow: 0px 0px 5px rgba(39, 61, 99, 0.8),
            0px 0px 5px rgba(39, 61, 99, 0.6);
          color: hsl(var(--color-light-main));
          padding: 0.75rem 0.5rem;
          text-align: left;
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
