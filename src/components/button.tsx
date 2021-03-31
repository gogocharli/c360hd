import React, { LegacyRef, MouseEvent } from 'react';
import Link from 'next/link';

type ButtonType = HTMLAnchorElement | HTMLButtonElement;

// TODO refactor this with a render prop
export function Button({
  href,
  onClick,
  type = 'primary',
  className,
  children,
}: {
  href?: string;
  type?: 'primary' | 'secondary';
  onClick?: any;
  className?: string;
  children: React.ReactNode;
}) {
  const buttonRef = React.useRef<ButtonType>();
  const bgSize = -200;

  function transformOnHover(e: MouseEvent<ButtonType>) {
    const target = buttonRef.current;
    const { x, y } = target.getBoundingClientRect();
    const offsetX = e.clientX - x;
    const offsetY = e.clientY - y;

    const translate = `${bgSize + offsetX}px, ${bgSize + offsetY}px`;

    target.style.setProperty('--hover-translate', translate);
  }

  return (
    <>
      {href ? (
        <Link href={href}>
          <a
            className={`[ ${className} ] [ button ss02 ] [ text-300 ]`}
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
          className={`[ ${className} ] [ button ss02 ] [ text-300 ]`}
          data-variant={type}
          onMouseEnter={transformOnHover}
          onMouseLeave={transformOnHover}
          onClick={onClick}
          ref={buttonRef as LegacyRef<HTMLButtonElement>}
        >
          {children}
        </button>
      )}
    </>
  );
}
