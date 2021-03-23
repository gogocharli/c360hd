import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import PlusIcon from './icon-plus.svg';
import MinusIcon from './icon-minus.svg';

import * as styles from './styles.module.css';

function Menu({ children }: { children: React.ReactNode }) {
  return <Accordion collapsible>{children}</Accordion>;
}

function Item({
  children,
  item,
}: {
  children: React.ReactNode;
  item: { value: string; title: string };
}) {
  return (
    <>
      <AccordionItem className={styles.accordionItem}>
        <h3>
          <AccordionButton className={styles.accordionButton}>
            {item.title}
            <div className='accordion__icon' aria-hidden='true'>
              <PlusIcon className={styles.icon} width={24} />
              <MinusIcon className={styles.icon} width={24} />
            </div>
          </AccordionButton>
        </h3>
        <AccordionPanel>{children}</AccordionPanel>
      </AccordionItem>
    </>
  );
}

export { Item as AccordionItem, Menu as AccordionMenu };
