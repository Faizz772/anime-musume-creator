"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BottomNav } from "@/components/bottom-nav";

type SiteChromeProps = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function SiteChrome({ header, footer, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {isAdmin ? null : header}
      <div className="flex-1">{children}</div>
      {isAdmin ? null : footer}
      {isAdmin ? (
        null
      ) : (
        <>
          <div aria-hidden="true" className="h-24 md:h-20" />
          <BottomNav />
        </>
      )}
    </>
  );
}
