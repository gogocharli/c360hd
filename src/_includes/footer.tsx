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

          padding-bottom: 1.5rem;
          padding-top: 1.5rem;
        }

        footer nav {
          --flow-space: 3rem;
        }
      `}</style>
    </>
  );
}
