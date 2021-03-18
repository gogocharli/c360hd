import Link from 'next/link';
import { NavList, FootLinks } from './nav-list';
import Symbol from 'components/logos/symbol-c360.svg';
import { useMediaQuery } from '../hooks/useMediaQuery';

export function Header() {
  const match = useMediaQuery('(max-width: 30em)');
  return (
    <header role='banner' className='site-head'>
      <Link href='/'>
        <a className='site-head__brand' aria-label='Home – C360HD'>
          <Symbol />
        </a>
      </Link>
      {match ? (
        <div>
          <nav>
            <NavList />
          </nav>
          <FootLinks />
        </div>
      ) : (
        <nav>
          <NavList reduced />
        </nav>
      )}
    </header>
  );
}
