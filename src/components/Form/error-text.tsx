export function ErrorText({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <span className='[ field__error ] [ text-100 md:text-300 ] [ align-center ]'>
        {children}
      </span>
      <style jsx>{`
        span {
          background-color: hsl(var(--color-accent-sea));
          border-radius: 0.25rem;
          color: hsl(var(--color-light-main));
          display: block;
          margin-top: 0.5rem;
          padding: 0.25em 1em;
        }
      `}</style>
    </>
  );
}
