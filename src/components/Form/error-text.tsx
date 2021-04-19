export function ErrorText({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <span className='[ field__error ] [ text-100 ]'>
        &#9888; {children} &#9888;
      </span>
      <style jsx>{`
        span {
          display: block;
        }
      `}</style>
    </>
  );
}
