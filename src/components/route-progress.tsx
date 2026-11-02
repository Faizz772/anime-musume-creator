"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Phase = "idle" | "loading" | "done";
type TimerKey = "start" | "done" | "safety";
type Timers = Partial<Record<TimerKey, number>>;

function clearTimer(timers: Timers, key: TimerKey) {
  const id = timers[key];
  if (id !== undefined) {
    window.clearTimeout(id);
    timers[key] = undefined;
  }
}

export function RouteProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const active = useRef(false);
  const timers = useRef<Timers>({});

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      clearTimer(timers.current, "start");
      clearTimer(timers.current, "done");
      active.current = false;
      setPhase("idle");

      timers.current.start = window.setTimeout(() => {
        active.current = true;
        setPhase("loading");
      }, 120);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    clearTimer(timers.current, "start");
    if (!active.current) return;

    clearTimer(timers.current, "safety");
    setPhase("done");
    clearTimer(timers.current, "done");
    timers.current.done = window.setTimeout(() => {
      active.current = false;
      setPhase("idle");
    }, 400);
  }, [pathname]);

  useEffect(() => {
    if (phase !== "loading") return;
    const timerState = timers.current;
    clearTimer(timerState, "safety");
    timerState.safety = window.setTimeout(() => {
      active.current = false;
      setPhase("idle");
    }, 5000);
    return () => clearTimer(timerState, "safety");
  }, [phase]);

  useEffect(() => {
    const timerState = timers.current;
    return () => {
      clearTimer(timerState, "start");
      clearTimer(timerState, "done");
      clearTimer(timerState, "safety");
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
      >
        <div
          className={`h-full origin-left bg-accent transition-[scale,opacity] duration-300 ease-out ${
            phase === "loading"
              ? "scale-x-[0.8] opacity-100"
              : phase === "done"
                ? "scale-x-100 opacity-0"
                : "scale-x-0 opacity-0"
          }`}
        />
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {phase === "loading" ? "Memuat halaman" : ""}
      </span>
    </>
  );
}
