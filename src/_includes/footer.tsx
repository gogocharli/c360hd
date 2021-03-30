import { NavList, FootLinks } from '@components/nav-list';

export function Footer() {
  return (
    <>
      <footer className='[ site-foot ] [ wrapper ]'>
        <nav className='[ nav ] [ flow ]'>
          <NavList />
          <FootLinks />
        </nav>
      </footer>
      <style jsx>{`
        footer {
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
