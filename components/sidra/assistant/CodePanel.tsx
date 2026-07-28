"use client";

/* لوحة الكود: تبويبات CSS / JavaScript / الشرح / التركيب / السجل */

import { useState } from "react";
import { S, CopyButton } from "../ui";
import type { CodeIssue } from "@/lib/sidra-assistant/validator";
import type { HistoryEntry } from "@/lib/sidra-assistant/history";

type Tab = "css" | "js" | "why" | "install" | "log";

/* تلوين بسيط بلا مكتبة: تعليقات ومحدِّدات وقيم. النص يُهرَّب أولًا. */
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function highlightCss(code: string): string {
  return escapeHtml(code)
    .replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:#7d8a72">$1</span>`)
    .replace(/(^|\n)([^\n{]*\{)/g, (_m, a, b) => `${a}<span style="color:#a51218">${b}</span>`)
    .replace(/([\w-]+)(\s*:\s*)([^;\n]+)(;)/g,
      `<span style="color:#2c4a63">$1</span>$2<span style="color:#7a5d10">$3</span>$4`);
}
function highlightJs(code: string): string {
  return escapeHtml(code)
    .replace(/(\/\*[\s\S]*?\*\/|\/\/[^\n]*)/g, `<span style="color:#7d8a72">$1</span>`)
    .replace(/\b(function|return|if|var|const|let|new|true|false|null)\b/g,
      `<span style="color:#a51218">$1</span>`)
    .replace(/('[^']*'|"[^"]*")/g, `<span style="color:#7a5d10">$1</span>`);
}

function CodeBlock({ code, lang }: { code: string; lang: "css" | "js" }) {
  const lines = code.split("\n");
  const html = lang === "css" ? highlightCss(code) : highlightJs(code);
  return (
    <div className="flex overflow-auto rounded-xl border text-[12.5px] leading-6"
         style={{ borderColor: S.border, background: "#fbfaf8", maxHeight: 380 }} dir="ltr">
      <div className="select-none border-l px-2 py-3 text-left tabular-nums"
           style={{ borderColor: S.borderSoft, color: "#b8ada3", background: "#f6f3ef" }}>
        {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
      </div>
      <pre className="flex-1 overflow-auto px-3 py-3" style={{ margin: 0, fontFamily: "ui-monospace,Menlo,Consolas,monospace" }}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

function download(name: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

export default function CodePanel({
  css, js, explanation, install, warnings, issues, history, onRestore,
}: {
  css: string; js: string; explanation: string;
  install: string[]; warnings: string[];
  issues: CodeIssue[];
  history: HistoryEntry[];
  onRestore: (e: HistoryEntry) => void;
}) {
  const [tab, setTab] = useState<Tab>(css ? "css" : "js");

  const tabs: Array<[Tab, string, boolean]> = [
    ["css", "CSS", !!css],
    ["js", "JavaScript", !!js],
    ["why", "شرح التعديل", !!explanation],
    ["install", "طريقة التركيب", install.length > 0],
    ["log", `السجل (${history.length})`, true],
  ];

  return (
    <div className="rounded-2xl border bg-white" style={{ borderColor: S.border }}>
      <div className="flex flex-wrap gap-1 border-b p-2" style={{ borderColor: S.borderSoft }}>
        {tabs.filter(([, , on]) => on).map(([key, label]) => (
          <button key={key} type="button" onClick={() => setTab(key)}
            className="rounded-lg px-3 py-1.5 text-[12.5px] font-semibold transition"
            style={tab === key ? { background: S.ink, color: "#fff" } : { color: S.muted }}>
            {label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {issues.length > 0 && (
          <ul className="mb-3 space-y-1.5">
            {issues.map((iss, n) => (
              <li key={n} className="rounded-lg border px-3 py-2 text-[12.5px] leading-6"
                  style={{
                    borderColor: iss.level === "block" ? "#e8b4b4" : "#ecd9a8",
                    background: iss.level === "block" ? "#fdf4f4" : "#fdfaf1",
                    color: iss.level === "block" ? "#8f0f14" : "#7a5d10",
                  }}>
                <strong>{iss.level === "block" ? "ممنوع: " : "تنبيه: "}</strong>{iss.message}
              </li>
            ))}
          </ul>
        )}

        {warnings.length > 0 && tab !== "log" && (
          <ul className="mb-3 space-y-1.5">
            {warnings.map((w, n) => (
              <li key={n} className="rounded-lg border px-3 py-2 text-[12.5px] leading-6"
                  style={{ borderColor: "#ecd9a8", background: "#fdfaf1", color: "#7a5d10" }}>{w}</li>
            ))}
          </ul>
        )}

        {tab === "css" && css && (
          <>
            <CodeBlock code={css} lang="css" />
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyButton text={css} />
              <button type="button" onClick={() => download("sidra-custom.css", css)}
                className="rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold"
                style={{ borderColor: S.border, color: S.muted }}>تنزيل الملف</button>
            </div>
          </>
        )}

        {tab === "js" && js && (
          <>
            <CodeBlock code={js} lang="js" />
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyButton text={js} />
              <button type="button" onClick={() => download("sidra-custom.js", js)}
                className="rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold"
                style={{ borderColor: S.border, color: S.muted }}>تنزيل الملف</button>
            </div>
          </>
        )}

        {tab === "why" && (
          <p className="text-[13.5px] leading-7" style={{ color: S.muted }}>{explanation}</p>
        )}

        {tab === "install" && (
          <ol className="space-y-2 text-[13px] leading-7" style={{ color: S.muted }}>
            {install.map((step, n) => (
              <li key={n} className="flex gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: S.red }}>{n + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}

        {tab === "log" && (
          history.length === 0 ? (
            <p className="text-[13px]" style={{ color: S.soft }}>لا توجد تعديلات بعد. اكتب طلبك في الأعلى وسيظهر هنا.</p>
          ) : (
            <ul className="space-y-2">
              {[...history].reverse().map((h) => (
                <li key={h.id} className="rounded-xl border p-3" style={{ borderColor: S.borderSoft }}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[13px] font-semibold" style={{ color: S.ink }}>{h.request}</span>
                    <span className="text-[11px]" style={{ color: S.soft }}>
                      {new Date(h.at).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11.5px]" style={{ color: S.soft }}>
                    <span>{h.component}</span><span>·</span><span>{h.intent}</span>
                    {h.copied && <span style={{ color: "#3a5a34" }}>· نُسخ</span>}
                    {h.applied && <span style={{ color: "#3a5a34" }}>· طُبّق في المعاينة</span>}
                  </div>
                  <button type="button" onClick={() => onRestore(h)}
                    className="mt-2 rounded-lg border px-3 py-1 text-[12px] font-semibold"
                    style={{ borderColor: S.border, color: S.red }}>استرجاع هذا الإصدار</button>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
}
