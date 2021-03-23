import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import PlusIcon from './icon-plus.svg';
import MinusIcon from './icon-minus.svg';

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
    <AccordionItem className='accordion__item'>
      <h3>
        <AccordionButton className='accordion__button'>
          {item.title}
          <div className='accordion__icon' aria-hidden='true'>
            <PlusIcon className='icon__open' width={24} />
            <MinusIcon className='icon__close' width={24} />
          </div>
        </AccordionButton>
      </h3>
      <AccordionPanel className='accordion__content'>{children}</AccordionPanel>
    </AccordionItem>
  );
}

export { Item as AccordionItem, Menu as AccordionMenu };
