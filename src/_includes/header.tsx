import Link from 'next/link';
import { NavList, FootLinks } from './nav-list';
import Symbol from 'components/logos/symbol-c360.svg';

export function Header() {
  return (
    <header role='banner' className='site-head'>
      <Link href='/'>
        <a className='site-head__brand' aria-label='Home – C360HD'>
          <Symbol />
        </a>
      </Link>
      <nav>
        <NavList reduced />
      </nav>

      <div>
        <nav>
          <NavList />
        </nav>
        <FootLinks />
      </div>
    </header>
  );
}
