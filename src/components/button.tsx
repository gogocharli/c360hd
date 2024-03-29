import React, { MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type ButtonType = HTMLAnchorElement | HTMLButtonElement;

export function Button({
  href,
  locale,
  type,
  className,
  children,
  scroll,
}: {
  href: string;
  locale?: string;
  type?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
  scroll?: boolean;
}): JSX.Element;

export function Button({
  onClick,
  type,
  form,
  disabled,
  className,
  children,
}: {
  onClick?: Function;
  type?: 'primary' | 'secondary';
  form?: boolean | string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}): JSX.Element;

export function Button({
  href,
  locale,
  onClick,
  type = 'primary',
  form = false,
  className,
  disabled = false,
  scroll = true,
  children,
}: {
  href?: string;
  locale?: string;
  type?: 'primary' | 'secondary';
  form?: boolean | string;
  onClick?: any;
  className?: string;
  disabled?: boolean;
  scroll?: boolean;
  children: React.ReactNode;
}) {
  const bgSize = -400;

  /**
   * Update the translate options for the element in order
   * for the pseudo-element to foloow mouse on enter and leave
   */
  function transformOnHover(e: MouseEvent<ButtonType>) {
    const target = e.currentTarget;
    const { x, y } = target.getBoundingClientRect();
    const offsetX = e.clientX - x;
    const offsetY = e.clientY - y;

    const translate = `${bgSize + offsetX}px, ${bgSize + offsetY}px`;

    target.style.setProperty('--hover-translate', translate);
  }

  const formName = typeof form == 'string' ? { form } : {};
  const { locale: routerLocale } = useRouter();
  return (
    <>
      {href ? (
        <Link href={href} locale={locale ?? routerLocale} scroll={scroll}>
          <a
            className={`[ ${className ?? ''} ] [ button ss02 ] [ text-300 ]`}
            data-variant={type}
            onMouseEnter={transformOnHover}
            onMouseLeave={transformOnHover}
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
          type={form ? 'submit' : 'button'}
          disabled={disabled}
          {...formName}
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

        .button > :global(* + *) {
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  );
}
