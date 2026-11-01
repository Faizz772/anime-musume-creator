import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-200";

const styles = {
  primary: "bg-accent text-night hover:bg-ice",
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
