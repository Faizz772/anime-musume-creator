import Link from "next/link";
import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

export function TextLink({ href, children, external = false }: TextLinkProps) {
  const className =
    "group inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-accent transition-colors duration-200 hover:text-ice";
  const content = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
