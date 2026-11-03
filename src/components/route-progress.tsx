"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Phase = "idle" | "loading" | "done";
type TimerKey = "done" | "safety" | "initial";
type Timers = Partial<Record<TimerKey, number>>;

const MIN_VISIBLE = 400;
const NAV_MIN = 1000;
const DONE_HOLD = 450;
const SAFETY = 5000;

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
  const [run, setRun] = useState(0);
  const active = useRef(false);
  const firstPathname = useRef(true);
  const navStartedAt = useRef(0);
  const timers = useRef<Timers>({});

  const start = useCallback(() => {
    const timerState = timers.current;
    clearTimer(timerState, "done");
    clearTimer(timerState, "safety");
    clearTimer(timerState, "initial");
    active.current = true;
    navStartedAt.current = performance.now();
    setRun((value) => value + 1);
    setPhase("loading");
    timerState.safety = window.setTimeout(() => {
      active.current = false;
      setPhase("idle");
    }, SAFETY);
  }, []);

  const finish = useCallback(() => {
    if (!active.current) return;
    const timerState = timers.current;
    clearTimer(timerState, "safety");
    clearTimer(timerState, "initial");
    setPhase("done");
    clearTimer(timerState, "done");
    timerState.done = window.setTimeout(() => {
      active.current = false;
      setPhase("idle");
    }, DONE_HOLD);
  }, []);

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

      start();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  useEffect(() => {
    const onPopState = () => {
      if (window.location.pathname !== pathname) start();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [pathname, start]);

  useEffect(() => {
    const timerState = timers.current;
    let startedAt = 0;
    let loadListener: (() => void) | undefined;

    const complete = () => {
      const wait = Math.max(0, MIN_VISIBLE - (performance.now() - startedAt));
      clearTimer(timerState, "initial");
      timerState.initial = window.setTimeout(finish, wait);
    };

    const startTimer = window.setTimeout(() => {
      start();
      startedAt = performance.now();

      if (document.readyState === "complete") {
        complete();
      } else {
        loadListener = complete;
        window.addEventListener("load", complete, { once: true });
      }
    }, 0);

    return () => {
      window.clearTimeout(startTimer);
      if (loadListener) window.removeEventListener("load", loadListener);
      clearTimer(timerState, "initial");
    };
  }, [start, finish]);

  useEffect(() => {
    if (firstPathname.current) {
      firstPathname.current = false;
      return;
    }
    const elapsed = performance.now() - navStartedAt.current;
    const wait = Math.max(0, NAV_MIN - elapsed);
    const timer = window.setTimeout(finish, wait);
    return () => window.clearTimeout(timer);
  }, [pathname, finish]);

  useEffect(() => {
    const timerState = timers.current;
    return () => {
      clearTimer(timerState, "done");
      clearTimer(timerState, "safety");
      clearTimer(timerState, "initial");
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="route-bar"
        data-active={phase !== "idle"}
      >
        <div key={run} className="route-bar-fill" />
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {phase === "loading" ? "Memuat halaman" : ""}
      </span>
    </>
  );
}
