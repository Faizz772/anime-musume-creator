import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-[background-color,border-color,color,translate,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px";

const styles = {
  primary:
    "bg-accent text-ice hover:bg-accent-2",
  secondary:
    "border border-line bg-transparent text-text hover:border-accent/60 hover:bg-surface",
} as const;

type ActionProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  external?: boolean;
  className?: string;
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ActionProps) {
  const classes = `${base} ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
