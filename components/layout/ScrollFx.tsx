"use client";

import { useEffect, useRef } from "react";

/* The page-wide motion layer, in one listener each:
   - a hairline scroll-progress bar along the top edge;
   - a cursor spotlight on any element marked `data-spot` (it only writes two
     CSS variables; the glow itself is drawn in globals.css).
   Both are skipped for reduced motion, and the spotlight for touch input. */
export default function ScrollFx() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.current?.style.setProperty("--p", String(p));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-spot]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={bar} className="scroll-progress" aria-hidden />;
}
