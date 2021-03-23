import { useTranslation } from 'next-i18next';

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

  return (
    <article>
      <h2>{t('heading')}</h2>
      {/* @todo replace by a more customizable component */}
      {questionsList.map((question, i) => (
        <details key={question}>
          <summary>{t(`questions.${i}.title`)}</summary>
          {t(`questions.${i}.desc`)}
        </details>
      ))}
    </article>
  );
}
