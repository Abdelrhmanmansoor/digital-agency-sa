"use client";

import { useEffect } from "react";

/* One IntersectionObserver for the whole document, instead of a scroll
   listener per section. Any element with `data-reveal` fades up once when it
   first enters the viewport; `data-reveal-delay="120"` staggers it.

   A MutationObserver picks up nodes that mount later (filtered product
   grids, opened panels) so components never have to register themselves. */
export default function RevealRoot() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const delay = el.dataset.revealDelay;
          if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      /* Fire slightly before the element is fully on screen so the motion
         reads as "already settling" rather than "starting late". */
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const register = (root: ParentNode) => {
      root.querySelectorAll?.("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    };
    register(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== 1) continue;
          const el = node as HTMLElement;
          if (el.matches?.("[data-reveal]")) io.observe(el);
          register(el);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
