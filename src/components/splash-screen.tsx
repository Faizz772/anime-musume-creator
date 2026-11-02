"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MIN_SHOW = 1900;
const FADE = 600;

type Phase = "visible" | "hiding" | "gone";

export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const minShow = reduced ? 300 : MIN_SHOW;
    const timer = window.setTimeout(() => setPhase("hiding"), minShow);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "hiding") return;
    const timer = window.setTimeout(() => setPhase("gone"), FADE);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className={`splash-screen${phase === "hiding" ? " is-hidden" : ""}`}
    >
      <div className="splash-mark">
        <Image
          src="/logo.webp"
          alt=""
          width={56}
          height={56}
          priority
          className="size-full scale-125 object-cover"
        />
      </div>
      <p className="splash-name">Clan Anime Musume</p>
      <p className="splash-sub">Creator</p>
      <div className="splash-track">
        <span />
      </div>
    </div>
  );
}
