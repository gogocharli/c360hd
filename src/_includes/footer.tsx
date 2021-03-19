import { NavList, FootLinks } from '@components/nav-list';

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
