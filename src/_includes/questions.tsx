import { useTranslation } from 'next-i18next';
import { AccordionItem, AccordionMenu } from '@components/Accordion/accordion';

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
    <>
      <article id='faq' className='wrapper align-center'>
        <h2 className='[ text-500 md:text-550 lg:text-600 ] [ leading-flat lg:tracking-tight ]'>
          {t('heading')}
        </h2>
        <AccordionMenu>
          {menuItems.map(({ content, ...item }) => (
            <AccordionItem item={item} key={item.value}>
              <p
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </AccordionItem>
          ))}
        </AccordionMenu>
      </article>

      <style jsx>{`
        article {
          max-width: 35rem;
          padding: 2rem;
        }

        h2 {
          margin: 0 auto 2.5rem;
        }

        :global(div[data-reach-accordion] > * + *) {
          margin-top: 1rem;
        }

        @media (min-width: 65em) {
          article {
            max-width: 46.5rem;
          }

          h2 {
            margin-bottom: 3.5rem;
          }
        }
      `}</style>
    </>
  );
}
