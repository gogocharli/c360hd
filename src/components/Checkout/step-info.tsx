import { useTranslation } from 'next-i18next';

export function StepInfo({ step }: { step: number }) {
  const { t } = useTranslation('checkout');
  return (
    <>
      <div className='[ info ] [ flow align-center ]'>
        <h1 className='[ text-600 ] [ tracking-tight leading-flat measure-micro ]'>
          {t(`steps.${step}.title`)}
        </h1>
        <p className='text-300 measure-short'>{t(`steps.${step}.desc`)}</p>
        <p className='[ count ] [ weight-bold text-300 ] '>{step + 1} / 5</p>
      </div>
      <style jsx>{`
        .info {
          --flow-space: 1rem;

          background-color: hsl(var(--theme-color-tint));
          border-radius: var(--border-radius);
          padding: 2.5rem 0.5rem;
        }

        .info > * {
          margin-left: auto;
          margin-right: auto;
        }

        .info .count {
          background-color: hsl(220 35% 44%);
          border-radius: 2em;
          letter-spacing: -0.05em;
          line-height: 1;
          padding: 1rem 1.5rem;
          margin-top: calc(var(--flow-space) * 2);
          width: fit-content;
        }

        @media (min-width: 65em) {
          .info {
            display: flex;
            flex-direction: column;
            grid-column: 1 / span 5;
            place-content: center;
          }
        }
      `}</style>
    </>
  );
}
