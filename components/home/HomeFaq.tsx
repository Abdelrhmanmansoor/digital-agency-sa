"use client";

import { useState } from "react";
import type { FaqEntry } from "@/lib/home-faq";
import styles from "./HomeExperience.module.css";

/* The one genuinely interactive thing on the homepage.
   It used to sit inside HomeExperience, which meant the whole 936-line page —
   hero, services, work, process, CTA, every string of every locale — carried
   "use client" so that a single `openFaq` integer could change. Only the
   accordion needs a bundle; everything around it is now server-rendered.

   Every answer still ships in the server HTML and is hidden with `hidden`
   rather than unmounted, so crawlers and the FAQPage JSON-LD stay in sync
   with what the page renders. */
export default function HomeFaq({ faq }: { faq: readonly FaqEntry[] }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className={styles.faqList}>
      {faq.map(([question, answer], index) => {
        const isOpen = openFaq === index;
        return (
          <article key={question} className={styles.faqItem}>
            <button
              type="button"
              id={`faq-q-${index}`}
              onClick={() => setOpenFaq(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              aria-controls={`faq-a-${index}`}
            >
              <span>{question}</span>
              <b aria-hidden>{isOpen ? "−" : "+"}</b>
            </button>
            <p id={`faq-a-${index}`} role="region" aria-labelledby={`faq-q-${index}`} hidden={!isOpen}>
              {answer}
            </p>
          </article>
        );
      })}
    </div>
  );
}
