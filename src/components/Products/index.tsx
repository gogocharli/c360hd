import { useTranslation } from 'next-i18next';

export function Product({ name }: { name: 'classic' | 'special' }) {
  const { t } = useTranslation('pricing');

  const products = { classic: 595, special: 795 };

  return (
    <article className='pricing-card'>
      <h2>{t(`${name}.title`)}</h2>
      <ul>
        <li>{t(`${name}.perks.panos`)}</li>
        <li>{t(`${name}.perks.photos`)}</li>
        <li>{t(`${name}.perks.public`)}</li>
        <li>{t(`${name}.perks.facebook`)}</li>
        <li>{t(`${name}.perks.web`)}</li>
        <li>{t(`${name}.perks.shoots`)}</li>
      </ul>
      <div className='price__container'>
        <p className='price'>
          <span className='visually-hidden'>Price: </span>${products[name]}
        </p>
        {name == 'special' && <p>{t('special.perks.extra')}</p>}
      </div>
      {/* Include button */}
    </article>
  );
}
