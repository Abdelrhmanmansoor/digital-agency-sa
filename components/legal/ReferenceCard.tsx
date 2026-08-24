"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ReferenceCard.module.css";

/* A live thumbnail of a real, public law firm site.
   The image is rendered on demand by WordPress.com's public mShots service
   rather than copied into /public, so nothing anyone else designed is
   redistributed from this domain and each card always reflects the site as
   it stands today. Shots are queued server-side and can take a moment on a
   cold URL, so a drawn stand-in carries the card until one arrives — and
   stays if one never does. */
function shotUrl(url: string, width: number) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${Math.round((width * 10) / 16)}`;
}

export default function ReferenceCard({
  name,
  url,
  tag,
  note,
  visitLabel,
}: {
  name: string;
  url: string;
  tag: string;
  note: string;
  visitLabel: string;
}) {
  const [failed, setFailed] = useState(false);
  const host = new URL(url).hostname.replace(/^www\./, "");

  return (
    <a className={styles.card} href={url} target="_blank" rel="noopener noreferrer nofollow" aria-label={`${name} — ${visitLabel}`}>
      <div className={styles.shot}>
        {!failed && (
          <Image
            src={shotUrl(url, 800)}
            alt={`${name} — ${host}`}
            width={800}
            height={500}
            loading="lazy"
            sizes="(max-width: 700px) 100vw, 380px"
            onError={() => setFailed(true)}
            unoptimized
          />
        )}
        {failed && (
          <div className={styles.fallback} aria-hidden>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 9h18" />
            </svg>
            <span className={styles.fallbackName}>{name}</span>
            <span className={styles.fallbackHost} dir="ltr">
              {host}
            </span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.name}>{name}</span>
          <span className={styles.tag}>{tag}</span>
        </div>
        <p className={styles.note}>{note}</p>
        <span className={styles.host} dir="ltr">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
          {host}
        </span>
      </div>
    </a>
  );
}
