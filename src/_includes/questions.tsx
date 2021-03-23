import { useTranslation } from 'next-i18next';
import { AccordionItem, AccordionMenu } from '@components/Accordion';

const questionsList = [
  'virtual',
  'profile',
  'payment',
  'photos',
  'time',
  'discount',
];

export function Questions() {
  const { t } = useTranslation('questions');

  const menuItems = questionsList.map((question, i) => ({
    value: question,
    title: t(`questions.${i}.title`),
    content: t(`questions.${i}.desc`),
  }));

  return (
    <article>
      <h2>{t('heading')}</h2>
      {/* @todo replace by a more customizable component */}
      <AccordionMenu>
        {menuItems.map(({ content, ...item }) => (
          <AccordionItem item={item} key={item.value}>
            <p>{content}</p>
          </AccordionItem>
        ))}
      </AccordionMenu>
    </article>
  );
}
