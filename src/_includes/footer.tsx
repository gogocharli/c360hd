import { NavList, FootLinks } from './nav-list';

export function Footer() {
  return (
    <footer className='site-foot'>
      <nav>
        <NavList />
        <FootLinks />
      </nav>
    </footer>
  );
}
