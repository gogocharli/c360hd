import React, { LegacyRef, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type ButtonType = HTMLAnchorElement | HTMLButtonElement;

// TODO refactor this with a render prop
export function Button({
  href,
  locale,
  onClick,
  type = 'primary',
  className,
  children,
}: {
  href?: string;
  locale?: string;
  type?: 'primary' | 'secondary';
  onClick?: any;
  className?: string;
  children: React.ReactNode;
}) {
  const buttonRef = React.useRef<ButtonType>();
  const bgSize = -400;

  /**
   * Update the translate options for the element in order
   * for the pseudo-element to foloow mouse on enter and leave
   */
  function transformOnHover(e: MouseEvent<ButtonType>) {
    const target = buttonRef.current;
    const { x, y } = target.getBoundingClientRect();
    const offsetX = e.clientX - x;
    const offsetY = e.clientY - y;

    const translate = `${bgSize + offsetX}px, ${bgSize + offsetY}px`;

    target.style.setProperty('--hover-translate', translate);
  }

  const { locale: routerLocale } = useRouter();
  return (
    <>
      {href ? (
        <Link href={href} locale={locale ?? routerLocale}>
          <a
            className={`[ ${className ?? ''} ] [ button ss02 ] [ text-300 ]`}
            data-variant={type}
            onMouseEnter={transformOnHover}
            onMouseLeave={transformOnHover}
            ref={buttonRef as LegacyRef<HTMLAnchorElement>}
          >
            {children}
          </a>
        </Link>
      ) : (
        <button
          className={`[ ${className ?? ''} ] [ button ss02 ] [ text-300 ]`}
          data-variant={type}
          onMouseEnter={transformOnHover}
          onMouseLeave={transformOnHover}
          onClick={onClick}
          ref={buttonRef as LegacyRef<HTMLButtonElement>}
        >
          {children}
        </button>
      )}
      <style jsx>{`
        .button {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }
      `}</style>

      <style jsx global>{`
        .button > * + * {
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  );
}
