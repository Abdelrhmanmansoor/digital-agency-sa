"use client";

/* مكونات واجهة مشتركة لتوثيق ثيم سِدرة */

import { useState, type ReactNode } from "react";

/* لوحة ألوان صفحة سِدرة — cream + Sidra red + gold */
export const S = {
  ink: "#211711",
  muted: "#6d5f55",
  soft: "#76685d",
  red: "#a51218",
  redDark: "#8f0f14",
  gold: "#F0B100",
  border: "#eadfd4",
  borderSoft: "#f0e6dc",
  bg: "#f8f2ec",
  card: "#ffffff",
  cream: "#fbf7f2",
};

/* ─── عنوان قسم موحد ─────────────────────────────────────────────────── */
export function SectionHeading({
  id,
  kicker,
  title,
  desc,
}: {
  id?: string;
  kicker: string;
  title: string;
  desc?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    if (!id || typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="mb-8 max-w-3xl">
      <p className="flex items-center gap-2 text-sm font-black text-[#a51218]">
        <span className="inline-block h-2 w-2 rounded-full bg-[#F0B100]" aria-hidden />
        {kicker}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h2 className="text-3xl font-black text-[#211711] sm:text-4xl">{title}</h2>
        {id ? (
          <button
            type="button"
            onClick={copyLink}
            aria-label={`نسخ رابط قسم ${title}`}
            className="rounded-full border border-[#eadfd4] bg-white px-3 py-1.5 text-xs font-bold text-[#76685d] transition hover:border-[#a51218]/35 hover:text-[#a51218]"
          >
            {copied ? "✓ تم النسخ" : "نسخ الرابط"}
          </button>
        ) : null}
      </div>
      {desc ? <p className="mt-4 text-base leading-8 text-[#6d5f55]">{desc}</p> : null}
    </div>
  );
}

/* ─── صناديق التنبيه ─────────────────────────────────────────────────── */
type NoticeKind = "info" | "tip" | "important" | "warning" | "mistake" | "perf" | "mobile";

const NOTICE_META: Record<NoticeKind, { label: string; icon: string; bg: string; border: string; text: string }> = {
  info: { label: "معلومة", icon: "ℹ", bg: "#f2f6fa", border: "#c9dcec", text: "#2c4a63" },
  tip: { label: "نصيحة", icon: "✦", bg: "#f4f8f2", border: "#cfe0c8", text: "#3a5a34" },
  important: { label: "مهم", icon: "★", bg: "#faf5ea", border: "#e7d7a3", text: "#7a5d10" },
  warning: { label: "تحذير", icon: "⚠", bg: "#fdf3f0", border: "#f0cabe", text: "#8a3a22" },
  mistake: { label: "خطأ شائع", icon: "✕", bg: "#fbf0f0", border: "#ecc7c8", text: "#8f2325" },
  perf: { label: "الأداء", icon: "↯", bg: "#f3f3f8", border: "#d0d0e4", text: "#3f3f6e" },
  mobile: { label: "خاص بالجوال", icon: "▯", bg: "#f1f7f7", border: "#c6e0e0", text: "#2b5c5c" },
};

export function NoticeBox({ kind, children }: { kind: NoticeKind; children: ReactNode }) {
  const m = NOTICE_META[kind];
  return (
    <div
      role="note"
      className="my-4 rounded-2xl border p-4 text-sm leading-7"
      style={{ background: m.bg, borderColor: m.border, color: m.text }}
    >
      <span className="ms-0 me-2 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-black">
        <span aria-hidden>{m.icon}</span>
        {m.label}
      </span>
      {children}
    </div>
  );
}

/* ─── زر نسخ نص ──────────────────────────────────────────────────────── */
export function CopyButton({ text, label = "نسخ", copiedLabel = "✓ تم النسخ" }: { text: string; label?: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className="inline-flex items-center gap-1.5 rounded-full bg-[#a51218] px-4 py-2 text-sm font-black text-white transition hover:bg-[#8f0f14]"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

/* ─── أكورديون خفيف (native details) ─────────────────────────────────── */
export function Accordion({
  title,
  summary,
  children,
  defaultOpen,
}: {
  title: string;
  summary?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-[#eadfd4] bg-white p-5 shadow-[0_10px_35px_rgba(52,35,25,0.05)] transition open:border-[#a51218]/25"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-base font-black text-[#211711]">{title}</span>
          {summary ? <span className="mt-1 block text-sm leading-7 text-[#76685d]">{summary}</span> : null}
        </span>
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4ece5] text-lg font-black text-[#a51218] transition group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="mt-4 border-t border-[#f0e6dc] pt-4 text-[15px] leading-8 text-[#5f5148]">{children}</div>
    </details>
  );
}

/* ─── وسم صغير ───────────────────────────────────────────────────────── */
export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "red" | "gold" }) {
  const styles =
    tone === "red"
      ? "border-[#a51218]/20 bg-[#a51218]/[0.06] text-[#a51218]"
      : tone === "gold"
      ? "border-[#F0B100]/35 bg-[#F0B100]/10 text-[#7a5d10]"
      : "border-[#eadfd4] bg-[#fbf7f2] text-[#6d5f55]";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${styles}`}>
      {children}
    </span>
  );
}

/* ─── روابط ذات صلة أسفل كل قسم ──────────────────────────────────────── */
export function RelatedLinks({
  next,
  related = [],
}: {
  next?: { id: string; label: string };
  related?: { id: string; label: string }[];
}) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#eadfd4] pt-5 text-sm">
      {next ? (
        <a
          href={`#${next.id}`}
          className="inline-flex items-center gap-2 rounded-full bg-[#211711] px-5 py-2.5 font-black text-white transition hover:-translate-y-0.5"
        >
          التالي: {next.label} ←
        </a>
      ) : null}
      {related.map((r) => (
        <a
          key={r.id}
          href={`#${r.id}`}
          className="rounded-full border border-[#eadfd4] bg-white px-4 py-2 font-bold text-[#6d5f55] transition hover:border-[#a51218]/35 hover:text-[#a51218]"
        >
          {r.label}
        </a>
      ))}
      <a href="#docs-top" className="ms-auto font-bold text-[#a58f7e] transition hover:text-[#a51218]">
        ↑ العودة للفهرس
      </a>
    </div>
  );
}

/* ─── غلاف قسم موحد ──────────────────────────────────────────────────── */
export function DocsSection({
  id,
  tone = "plain",
  children,
}: {
  id: string;
  tone?: "plain" | "tinted" | "dark";
  children: ReactNode;
}) {
  const bg =
    tone === "tinted"
      ? "border-y border-[#eadfd4] bg-white/70"
      : tone === "dark"
      ? "bg-[#211711] text-white"
      : "";
  return (
    <section id={id} className={`scroll-mt-28 ${bg}`}>
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-16">{children}</div>
    </section>
  );
}
