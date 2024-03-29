import { NavList, FootLinks } from '@components/nav-list';

export function Footer() {
  return (
    <>
      <footer className='[ site-foot ]'>
        <nav className='[ nav ] [ flow wrapper ]'>
          <NavList />
          <FootLinks />
        </nav>
      </footer>
      <style jsx>{`
        footer {
          --theme-color-bg: var(--color-dark-main);
          --theme-color-fg: var(--color-light-main);
          --theme-color-hg: var(--color-dark-highlight);

          background-color: hsl(var(--theme-color-bg));
          color: hsl(var(--theme-color-fg));
          margin-top: 3rem;
          padding-bottom: 1.5rem;
          padding-top: 1.5rem;
        }

        footer nav {
          --flow-space: 3rem;
        }

        footer :global(.button) {
          --default-bg: var(--color-dark-tint);
        }

        @media (min-width: 40em) {
          footer {
            margin-top: 5.5rem;
            padding-bottom: 4rem;
            padding-top: 4rem;
          }

          footer nav {
            display: grid;
            grid-template-columns: var(--grid-md);
          }
        }

        @media (min-width: 65em) {
          footer {
            padding-bottom: 5rem;
            padding-top: 5rem;
          }
        }
      `}</style>
    </>
  );
}
