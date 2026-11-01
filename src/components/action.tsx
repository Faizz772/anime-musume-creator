import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-colors";

const styles = {
  primary:
    "bg-gradient-to-r from-pink to-purple text-night hover:from-blossom hover:to-pink",
  secondary:
    "border border-line bg-surface text-text hover:border-pink/50 hover:bg-surface-2",
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
