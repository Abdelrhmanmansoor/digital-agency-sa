"use client";

/* هيكل التوثيق: فهرس جانبي ثابت + Scroll Spy + بحث عربي + قائمة جوال */

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  SIDRA_NAV,
  SIDRA_COMPONENTS,
  SIDRA_FAQ,
  TROUBLESHOOTING,
  IMAGE_SIZES,
  CHANGELOG,
} from "@/lib/sidra-data";

/* تطبيع عربي بسيط: يوحّد الهمزات والتاء المربوطة ويحذف التشكيل */
function normalizeAr(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();
}

interface SearchDoc {
  type: string;
  title: string;
  snippet: string;
  targetId: string;
  norm: string;
}

function buildIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const n of SIDRA_NAV) {
    docs.push({ type: "قسم", title: n.label, snippet: n.group, targetId: n.id, norm: "" });
  }
  for (const c of SIDRA_COMPONENTS) {
    docs.push({
      type: "مكوّن",
      title: c.name,
      snippet: c.desc,
      targetId: "components",
      norm: ` ${c.nameEn} ${c.keySettings.join(" ")}`,
    });
  }
  for (const f of SIDRA_FAQ) {
    docs.push({ type: "سؤال", title: f.q, snippet: f.a.slice(0, 90) + "…", targetId: "faq", norm: ` ${f.a}` });
  }
  for (const t of TROUBLESHOOTING) {
    docs.push({ type: "مشكلة", title: t.problem, snippet: t.cause, targetId: "troubleshooting", norm: ` ${t.fix.join(" ")}` });
  }
  for (const s of IMAGE_SIZES) {
    docs.push({ type: "مقاس", title: s.name, snippet: `${s.size} — ${s.ratio}`, targetId: "image-sizes", norm: ` ${s.format}` });
  }
  for (const c of CHANGELOG) {
    docs.push({ type: "تحديث", title: `الإصدار ${c.version}`, snippet: c.title, targetId: "changelog", norm: "" });
  }
  return docs.map((d) => ({ ...d, norm: normalizeAr(`${d.title} ${d.snippet} ${d.norm}`) }));
}

const TYPE_COLORS: Record<string, string> = {
  "قسم": "#a51218",
  "مكوّن": "#7a5d10",
  "سؤال": "#2c4a63",
  "مشكلة": "#8a3a22",
  "مقاس": "#3f3f6e",
  "تحديث": "#3a5a34",
};

function highlight(text: string, q: string) {
  const nq = normalizeAr(q);
  if (!nq) return text;
  /* تمييز تقريبي: نبحث عن أول كلمة من الاستعلام في النص الأصلي */
  const word = q.trim().split(/\s+/)[0];
  const idx = normalizeAr(text).indexOf(normalizeAr(word));
  if (idx < 0 || !word) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-[#F0B100]/30 px-0.5">{text.slice(idx, idx + word.length)}</mark>
      {text.slice(idx + word.length)}
    </>
  );
}

export default function DocsShell({ children, supportHref }: { children: ReactNode; supportHref: string }) {
  const [active, setActive] = useState<string>(SIDRA_NAV[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showTop, setShowTop] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const nq = normalizeAr(query);
    if (nq.length < 2) return [];
    const terms = nq.split(" ").filter(Boolean);
    return index
      .map((d) => {
        let score = 0;
        for (const t of terms) {
          if (d.norm.includes(t)) score += normalizeAr(d.title).includes(t) ? 3 : 1;
        }
        return { d, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.d);
  }, [query, index]);

  /* Scroll Spy */
  useEffect(() => {
    const sections = SIDRA_NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* زر العودة للأعلى */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* فتح البحث بالكيبورد + إغلاق بـ Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 60);
  }, [searchOpen]);

  const goTo = (id: string) => {
    setSearchOpen(false);
    setMobileOpen(false);
    setQuery("");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const groups = useMemo(() => {
    const g = new Map<string, typeof SIDRA_NAV>();
    for (const n of SIDRA_NAV) {
      if (!g.has(n.group)) g.set(n.group, []);
      g.get(n.group)!.push(n);
    }
    return [...g.entries()];
  }, []);

  const navList = (onNavigate: (id: string) => void) => (
    <nav aria-label="فهرس التوثيق" className="space-y-5">
      {groups.map(([group, items]) => (
        <div key={group}>
          <p className="mb-2 px-3 text-xs font-black uppercase tracking-wide text-[#a58f7e]">{group}</p>
          <ul className="space-y-0.5">
            {items.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    history.replaceState(null, "", `#${n.id}`);
                    onNavigate(n.id);
                  }}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition ${
                    active === n.id
                      ? "bg-[#a51218] font-black text-white shadow-[0_8px_20px_rgba(165,18,24,0.25)]"
                      : "font-bold text-[#6d5f55] hover:bg-[#f4ece5] hover:text-[#211711]"
                  }`}
                >
                  <span aria-hidden className={`text-xs ${active === n.id ? "text-[#e5c38f]" : "text-[#F0B100]"}`}>
                    {n.icon}
                  </span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div id="docs-top" className="scroll-mt-4">
      {/* شريط أدوات علوي ثابت */}
      <div className="sticky top-0 z-40 border-b border-[#eadfd4] bg-[#fbf7f2]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 sm:px-8">
          <a href="#docs-top" className="flex items-center gap-2 font-black text-[#211711]">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#a51218] text-sm text-white">س</span>
            <span className="hidden sm:inline">توثيق ثيم سِدرة</span>
          </a>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ms-auto flex min-w-0 flex-1 items-center gap-2 rounded-full border border-[#eadfd4] bg-white px-4 py-2 text-sm text-[#a58f7e] transition hover:border-[#a51218]/30 sm:max-w-xs"
            aria-label="البحث في التوثيق"
          >
            <span aria-hidden>⌕</span>
            <span className="truncate">ابحث في التوثيق…</span>
            <kbd className="ms-auto hidden rounded border border-[#eadfd4] bg-[#fbf7f2] px-1.5 text-[10px] font-bold text-[#a58f7e] lg:inline">
              Ctrl K
            </kbd>
          </button>

          {/* مدخل دائم للمساعد — يبقى في متناول اليد مهما نزل الزائر في الصفحة.
              على الجوال تظهر الأيقونة وحدها حتى لا يزدحم الشريط. */}
          <a
            href="#assistant"
            onClick={(e) => {
              e.preventDefault();
              history.replaceState(null, "", "#assistant");
              goTo("assistant");
            }}
            aria-label="مساعد تخصيص سِدرة"
            title="مساعد تخصيص سِدرة"
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-black text-white transition hover:opacity-90"
            style={{ background: "#211711" }}
          >
            <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full text-[11px]"
                  style={{ background: "#F0B100", color: "#211711" }}>✧</span>
            <span className="hidden sm:inline">المساعد</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-full border border-[#eadfd4] bg-white px-4 py-2 text-sm font-black text-[#211711] lg:hidden"
          >
            ☰ الفهرس
          </button>
        </div>
      </div>

      {/* التخطيط: فهرس جانبي + محتوى */}
      <div className="mx-auto flex max-w-7xl gap-8 px-0 sm:px-4 lg:px-6">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto py-8 pe-2 lg:block" aria-label="التنقل الجانبي">
          {navList(goTo)}
          <a
            href={supportHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block rounded-2xl bg-[#211711] p-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5"
          >
            تحتاج مساعدة؟ تواصل مع الدعم
          </a>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>

      {/* قائمة الجوال المنزلقة */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="فهرس التوثيق">
          <button
            type="button"
            aria-label="إغلاق الفهرس"
            className="absolute inset-0 bg-[#211711]/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 end-0 w-[85%] max-w-sm overflow-y-auto bg-[#fbf7f2] p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-black text-[#211711]">فهرس التوثيق</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4ece5] text-lg font-black text-[#a51218]"
                aria-label="إغلاق"
              >
                ✕
              </button>
            </div>
            {navList(goTo)}
          </div>
        </div>
      ) : null}

      {/* نافذة البحث */}
      {searchOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label="البحث في التوثيق">
          <button type="button" aria-label="إغلاق البحث" className="absolute inset-0 bg-[#211711]/50" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-xl rounded-3xl border border-[#eadfd4] bg-white p-4 shadow-2xl">
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث: مكوّن، إعداد، مقاس صورة، مشكلة…"
              className="w-full rounded-2xl border border-[#eadfd4] bg-[#fbf7f2] px-5 py-3.5 text-base text-[#211711] outline-none transition focus:border-[#a51218]/40"
              aria-label="نص البحث"
            />
            <div className="mt-3 max-h-[50vh] overflow-y-auto">
              {query.trim().length < 2 ? (
                <p className="px-2 py-6 text-center text-sm text-[#a58f7e]">
                  اكتب حرفين على الأقل — يدعم البحث العربية واختلافات الهمزات.
                </p>
              ) : results.length === 0 ? (
                <div className="px-2 py-6 text-center">
                  <p className="text-sm font-bold text-[#6d5f55]">لا توجد نتائج لـ «{query}»</p>
                  <a
                    href={supportHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block rounded-full bg-[#a51218] px-5 py-2 text-sm font-black text-white"
                  >
                    لم تجد ما تبحث عنه؟ اسأل الدعم
                  </a>
                </div>
              ) : (
                <ul className="space-y-1">
                  {results.map((r, i) => (
                    <li key={`${r.type}-${r.title}-${i}`}>
                      <button
                        type="button"
                        onClick={() => goTo(r.targetId)}
                        className="w-full rounded-xl px-3 py-2.5 text-start transition hover:bg-[#f4ece5]"
                      >
                        <span
                          className="me-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-black"
                          style={{ color: TYPE_COLORS[r.type] || "#6d5f55", borderColor: "#eadfd4" }}
                        >
                          {r.type}
                        </span>
                        <span className="text-sm font-black text-[#211711]">{highlight(r.title, query)}</span>
                        <span className="mt-0.5 block truncate text-xs text-[#a58f7e]">{r.snippet}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* زر العودة للأعلى */}
      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="العودة إلى أعلى الصفحة"
          className="fixed bottom-5 start-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#211711] text-white shadow-lg transition hover:-translate-y-0.5"
        >
          ↑
        </button>
      ) : null}
    </div>
  );
}
