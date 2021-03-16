import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export function Header({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const { t } = useTranslation('common');

  return (
    <header role='banner' className='site-head'>
      <Link href='/'>
        <a className='site-head__brand' aria-label="Home – C360HD">
          {/* Import SVG */}
        </a>
      </Link>
      <nav className="[nav] [ site-head__nav ]">
        <ul >
          <li>
            <Link href='/questions'>
              <a className='site-head__brand'>{t('links.questions')}</a>
            </Link>
          </li>
          <li>
            <Link href='/examples'>
              <a className='site-head__brand'>{t('links.examples')}</a>
            </Link>
          </li>
          <li>
            <Link href='/pricing'>
              <a className='site-head__brand'>{t('links.pricing')}</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
