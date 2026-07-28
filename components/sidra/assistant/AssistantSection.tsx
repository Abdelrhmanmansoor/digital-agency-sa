"use client";

/* ══════════════════════════════════════════════════════════════════════
   SidraAssistantUI — «مساعد تخصيص سِدرة»

   محرّك أوامر محلي بالكامل: لا نموذج ذكاء اصطناعي ولا نداء خارجي.
   يفهم ما بُرمج عليه، ويسأل حين ينقصه شيء، ويقول صراحةً حين لا يفهم
   بدل توليد كود عشوائي.
   ══════════════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionHeading, DocsSection, S } from "../ui";
import { interpret, type Interpretation } from "@/lib/sidra-assistant/interpreter";
import { generate } from "@/lib/sidra-assistant/generators";
import { validateCss, validateJs, isSafe, sanitizeText, type CodeIssue } from "@/lib/sidra-assistant/validator";
import { SIDRA_COMPONENTS, SIDRA_INTENTS } from "@/lib/sidra-assistant/registry";
import {
  store, newId, DEFAULT_CONTEXT,
  type ChatMessage, type HistoryEntry, type StoreContext,
} from "@/lib/sidra-assistant/history";
import PreviewSandbox from "./PreviewSandbox";
import CodePanel from "./CodePanel";

const QUICK = [
  "خلي الفوتر أسود والنص أبيض",
  "خلي الهيدر ثابت عند النزول",
  "صغّر المسافة بين الأقسام على الجوال إلى 20 بكسل",
  "اخفِ زر المقارنة من بطاقات المنتجات",
  "خلي حواف زر الشراء 12 بكسل",
  "كبّر اسم المنتج في صفحة المنتج",
  "أضف تأثيرًا عند مرور المؤشر على بطاقة المنتج",
  "اعمل زر يرجع لأعلى الصفحة",
];

const SIZE_CHOICES = [
  { label: "تصغير بسيط", value: "12px" },
  { label: "متوسط", value: "16px" },
  { label: "كبير", value: "24px" },
];

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  at: 0,
  text:
    "أهلًا بك. صِف التعديل الذي تريده على ثيم سِدرة بالعربية، وسأجهّز لك الكود جاهزًا للصق مع شرحه ومكانه.\n" +
    "مثال: «خلي خلفية الفوتر #111111 ولون النص أبيض».",
};

export default function AssistantSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [ctx, setCtx] = useState<StoreContext>(DEFAULT_CONTEXT);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [pending, setPending] = useState<Interpretation | null>(null);
  const [current, setCurrent] = useState<HistoryEntry | null>(null);
  const [appliedCss, setAppliedCss] = useState("");
  const [advanced, setAdvanced] = useState(false);
  const [advSelector, setAdvSelector] = useState("");
  const [advCss, setAdvCss] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* التحميل من التخزين بعد الترطيب فقط، حتى لا يختلف الخادم عن العميل */
  useEffect(() => {
    const saved = store.loadChat();
    if (saved.length) setMessages(saved);
    setHistory(store.loadHistory());
    setCtx(store.loadContext());
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) store.saveChat(messages); }, [messages, hydrated]);
  useEffect(() => { if (hydrated) store.saveHistory(history); }, [history, hydrated]);
  useEffect(() => { if (hydrated) store.saveContext(ctx); }, [ctx, hydrated]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);

  const issues: CodeIssue[] = useMemo(() => {
    if (!current) return [];
    return [...validateCss(current.css), ...validateJs(current.js)];
  }, [current]);

  const push = useCallback((m: Omit<ChatMessage, "id" | "at">) => {
    setMessages((prev) => [...prev, { ...m, id: newId(), at: Date.now() }]);
  }, []);

  /* ── المسار الأساسي: تفسير ثم توليد أو سؤال ─────────────────────── */
  const handle = useCallback((rawText: string, merged?: Partial<Interpretation>) => {
    const clean = sanitizeText(rawText.trim());
    if (!clean) return;

    push({ role: "user", text: clean });
    setInput("");
    setThinking(true);

    /* تأخير قصير مقصود: يعطي إحساسًا بالمعالجة ويمنع وميض الواجهة */
    window.setTimeout(() => {
      const base = interpret(clean);
      const i: Interpretation = merged ? { ...base, ...merged } : base;
      /* أعد حساب النواقص بعد الدمج */
      const missing: Interpretation["missing"] = [];
      if (!i.component) missing.push("component");
      if (!i.intent) missing.push("intent");
      if (i.intent?.needs === "color" && !i.color) missing.push("color");
      if (i.intent?.needs === "size" && !i.size && !i.sizeDirection) missing.push("size");
      i.missing = missing;

      setThinking(false);

      if (!i.component && !i.intent) {
        push({
          role: "assistant",
          text: "لم أتعرّف على هذا الطلب. اختر الجزء الذي تريد تعديله، أو استخدم المحرر المتقدم في الأسفل وأضف الـ Selector بنفسك.",
          options: SIDRA_COMPONENTS.slice(0, 6).map((c) => ({ label: c.label, value: `component:${c.key}` })),
        });
        return;
      }

      if (missing.includes("component")) {
        push({
          role: "assistant",
          text: "فهمت نوع التعديل، لكن أي جزء من الثيم تقصد؟",
          options: SIDRA_COMPONENTS.map((c) => ({ label: c.label, value: `component:${c.key}` })),
        });
        setPending(i);
        return;
      }
      if (missing.includes("intent")) {
        push({
          role: "assistant",
          text: "حدّدت الجزء المطلوب. ما التعديل الذي تريده عليه؟",
          options: SIDRA_INTENTS.slice(0, 8).map((x) => ({ label: x.label, value: `intent:${x.kind}` })),
        });
        setPending(i);
        return;
      }
      if (missing.includes("color")) {
        push({
          role: "assistant",
          text: "ما اللون الذي تريد استخدامه؟",
          askFor: "color",
          options: [
            { label: "لون المتجر الأساسي", value: `color:${ctx.primaryColor}` },
            { label: "أسود", value: "color:#000000" },
            { label: "أبيض", value: "color:#ffffff" },
          ],
        });
        setPending(i);
        return;
      }
      if (missing.includes("size")) {
        push({
          role: "assistant",
          text: "ما المقاس الذي تريده؟",
          askFor: "size",
          options: SIZE_CHOICES.map((s) => ({ label: s.label, value: `size:${s.value}` })),
        });
        setPending(i);
        return;
      }

      const out = generate(i);
      const entry: HistoryEntry = {
        id: newId(), request: clean,
        component: i.part && i.component?.parts?.[i.part] ? i.component.parts[i.part].label : i.component!.label,
        intent: i.intent!.label,
        css: out.css, js: out.js, explanation: out.explanation,
        install: out.install, warnings: out.warnings,
        copied: false, applied: false, at: Date.now(),
      };
      setHistory((h) => [...h, entry]);
      setCurrent(entry);
      setPending(null);
      push({ role: "assistant", text: `فهمت: ${i.summary}.\nالكود جاهز في اللوحة أسفل المحادثة.`, codeId: entry.id });
    }, 420);
  }, [ctx.primaryColor, push]);

  /* ── الرد على خيار من أزرار المساعد ─────────────────────────────── */
  const choose = useCallback((value: string, label: string) => {
    const [kind, val] = value.split(/:(.+)/);
    const base = pending;
    if (!base) { handle(label); return; }

    const patch: Partial<Interpretation> = {};
    if (kind === "component") patch.component = SIDRA_COMPONENTS.find((c) => c.key === val) || null;
    if (kind === "intent") patch.intent = SIDRA_INTENTS.find((x) => x.kind === val) || null;
    if (kind === "color") patch.color = val;
    if (kind === "size") patch.size = val;

    push({ role: "user", text: label });
    setThinking(true);
    window.setTimeout(() => {
      setThinking(false);
      const i: Interpretation = { ...base, ...patch };
      const missing: Interpretation["missing"] = [];
      if (!i.component) missing.push("component");
      if (!i.intent) missing.push("intent");
      if (i.intent?.needs === "color" && !i.color) missing.push("color");
      if (i.intent?.needs === "size" && !i.size && !i.sizeDirection) missing.push("size");

      if (missing.length) {
        setPending(i);
        const need = missing[0];
        push({
          role: "assistant",
          text: need === "color" ? "ما اللون الذي تريد استخدامه؟"
              : need === "size" ? "ما المقاس الذي تريده؟"
              : need === "intent" ? "ما التعديل الذي تريده؟" : "أي جزء من الثيم؟",
          askFor: need === "color" ? "color" : need === "size" ? "size" : undefined,
          options:
            need === "color" ? [{ label: "لون المتجر الأساسي", value: `color:${ctx.primaryColor}` }, { label: "أسود", value: "color:#000000" }, { label: "أبيض", value: "color:#ffffff" }]
            : need === "size" ? SIZE_CHOICES.map((s) => ({ label: s.label, value: `size:${s.value}` }))
            : need === "intent" ? SIDRA_INTENTS.slice(0, 8).map((x) => ({ label: x.label, value: `intent:${x.kind}` }))
            : SIDRA_COMPONENTS.map((c) => ({ label: c.label, value: `component:${c.key}` })),
        });
        return;
      }

      const out = generate(i);
      const entry: HistoryEntry = {
        id: newId(), request: i.raw,
        component: i.part && i.component?.parts?.[i.part] ? i.component.parts[i.part].label : i.component!.label,
        intent: i.intent!.label,
        css: out.css, js: out.js, explanation: out.explanation,
        install: out.install, warnings: out.warnings,
        copied: false, applied: false, at: Date.now(),
      };
      setHistory((h) => [...h, entry]);
      setCurrent(entry);
      setPending(null);
      push({ role: "assistant", text: `فهمت: ${i.summary}.\nالكود جاهز في اللوحة أسفل المحادثة.`, codeId: entry.id });
    }, 380);
  }, [pending, ctx.primaryColor, handle, push]);

  const applyPreview = () => {
    if (!current || !isSafe(issues)) return;
    setAppliedCss((prev) => `${prev}\n\n${current.css}`.trim());
    setHistory((h) => h.map((x) => (x.id === current.id ? { ...x, applied: true } : x)));
  };
  const undoPreview = () => {
    const blocks = appliedCss.split("\n\n").filter(Boolean);
    blocks.pop();
    setAppliedCss(blocks.join("\n\n"));
  };
  const resetAll = () => {
    setAppliedCss("");
    setCurrent(null);
    setPending(null);
    setMessages([WELCOME]);
    setHistory([]);
    store.clearAll();
  };

  const advIssues = useMemo(() => validateCss(advCss), [advCss]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handle(input); }
  };

  return (
    <DocsSection id="assistant" tone="tinted">
      <SectionHeading
        kicker="أداة تفاعلية"
        title="مساعد تخصيص سِدرة"
        desc="صِف التعديل الذي تريده وسنجهّز لك الكود المناسب — مع شرحه ومكان لصقه ومعاينته قبل التطبيق."
      />

      {/* شارة الخصوصية + الحالة */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full border px-3 py-1 text-[12px] font-semibold"
              style={{ borderColor: S.border, background: "#fff", color: S.muted }}>
          يعمل داخل متصفحك — لا تُرسل بيانات متجرك إلى أي خدمة خارجية
        </span>
        <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold"
              style={{ background: "#eef5ec", color: "#3a5a34" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#3a5a34" }} />
          {thinking ? "أحلّل طلبك…" : "جاهز لاستقبال طلبك"}
        </span>
      </div>

      {/* سياق المتجر */}
      <div className="mb-5 grid gap-3 rounded-2xl border bg-white p-4 sm:grid-cols-3"
           style={{ borderColor: S.border }}>
        <label className="text-[12.5px] font-semibold" style={{ color: S.muted }}>
          لون المتجر الأساسي
          <input type="color" value={ctx.primaryColor}
            onChange={(e) => setCtx({ ...ctx, primaryColor: e.target.value })}
            className="mt-1.5 block h-9 w-full cursor-pointer rounded-lg border"
            style={{ borderColor: S.border }} />
        </label>
        <label className="text-[12.5px] font-semibold" style={{ color: S.muted }}>
          اللون الثانوي
          <input type="color" value={ctx.secondaryColor}
            onChange={(e) => setCtx({ ...ctx, secondaryColor: e.target.value })}
            className="mt-1.5 block h-9 w-full cursor-pointer rounded-lg border"
            style={{ borderColor: S.border }} />
        </label>
        <label className="text-[12.5px] font-semibold" style={{ color: S.muted }}>
          اتجاه اللغة
          <select value={ctx.direction}
            onChange={(e) => setCtx({ ...ctx, direction: e.target.value as StoreContext["direction"] })}
            className="mt-1.5 block h-9 w-full rounded-lg border px-2 text-[13px]"
            style={{ borderColor: S.border, color: S.ink }}>
            <option value="rtl">RTL — عربي</option>
            <option value="ltr">LTR — إنجليزي</option>
          </select>
        </label>
      </div>

      {/* المحادثة */}
      <div className="rounded-2xl border bg-white" style={{ borderColor: S.border }}>
        <div ref={scrollRef} className="max-h-[420px] space-y-3 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
              <div className="max-w-[86%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-7"
                   style={m.role === "user"
                     ? { background: S.ink, color: "#fff" }
                     : { background: S.cream, color: S.ink, border: `1px solid ${S.borderSoft}` }}>
                {m.text.split("\n").map((line, n) => <p key={n} className={n ? "mt-1" : ""}>{line}</p>)}

                {m.askFor === "color" && (
                  <input type="color" onChange={(e) => choose(`color:${e.target.value}`, `اللون ${e.target.value}`)}
                    className="mt-2 h-8 w-24 cursor-pointer rounded-lg border" style={{ borderColor: S.border }} />
                )}
                {m.options && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.options.map((o) => (
                      <button key={o.value} type="button" onClick={() => choose(o.value, o.label)}
                        className="rounded-lg border bg-white px-2.5 py-1 text-[12px] font-semibold transition hover:shadow-sm"
                        style={{ borderColor: S.border, color: S.red }}>{o.label}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex justify-end">
              <div className="rounded-2xl px-4 py-3" style={{ background: S.cream, border: `1px solid ${S.borderSoft}` }}>
                <span className="flex gap-1">
                  {[0, 1, 2].map((n) => (
                    <span key={n} className="h-1.5 w-1.5 animate-pulse rounded-full"
                          style={{ background: S.soft, animationDelay: `${n * 140}ms` }} />
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-1.5 border-t px-4 py-3" style={{ borderColor: S.borderSoft }}>
            {QUICK.map((q) => (
              <button key={q} type="button" onClick={() => handle(q)}
                className="rounded-lg border px-2.5 py-1 text-[12px] transition hover:shadow-sm"
                style={{ borderColor: S.border, color: S.muted }}>{q}</button>
            ))}
          </div>
        )}

        <div className="border-t p-3" style={{ borderColor: S.borderSoft }}>
          <textarea
            value={input} onChange={(e) => setInput(e.target.value.slice(0, 600))} onKeyDown={onKeyDown}
            rows={2} maxLength={600}
            placeholder="مثال: اجعل خلفية الفوتر #111111 ولون النص أبيض"
            className="w-full resize-none rounded-xl border px-3 py-2 text-[13.5px] leading-7 outline-none focus:ring-2"
            style={{ borderColor: S.border, color: S.ink }}
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <button type="button" onClick={() => handle(input)} disabled={!input.trim()}
                className="rounded-xl px-4 py-2 text-[13px] font-bold text-white transition disabled:opacity-40"
                style={{ background: S.red }}>إرسال</button>
              <button type="button" onClick={resetAll}
                className="rounded-xl border px-3 py-2 text-[12.5px] font-semibold"
                style={{ borderColor: S.border, color: S.muted }}>تخصيص جديد</button>
            </div>
            <span className="text-[11.5px]" style={{ color: S.soft }}>
              {input.length}/600 · Enter للإرسال، Shift+Enter لسطر جديد
            </span>
          </div>
        </div>
      </div>

      {/* لوحة الكود */}
      {current && (
        <div className="mt-5 space-y-4">
          <CodePanel
            css={current.css} js={current.js} explanation={current.explanation}
            install={current.install} warnings={current.warnings}
            issues={issues} history={history}
            onRestore={(e) => setCurrent(e)}
          />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={applyPreview} disabled={!current.css || !isSafe(issues)}
              className="rounded-xl px-4 py-2 text-[13px] font-bold text-white transition disabled:opacity-40"
              style={{ background: S.ink }}>تطبيق في المعاينة</button>
            <button type="button" onClick={undoPreview} disabled={!appliedCss}
              className="rounded-xl border px-3 py-2 text-[12.5px] font-semibold disabled:opacity-40"
              style={{ borderColor: S.border, color: S.muted }}>تراجع عن آخر تعديل</button>
            <button type="button" onClick={() => setAppliedCss("")} disabled={!appliedCss}
              className="rounded-xl border px-3 py-2 text-[12.5px] font-semibold disabled:opacity-40"
              style={{ borderColor: S.border, color: S.muted }}>إعادة ضبط المعاينة</button>
          </div>
        </div>
      )}

      {/* المعاينة */}
      <div className="mt-6 rounded-2xl border bg-white p-4" style={{ borderColor: S.border }}>
        <h3 className="mb-3 text-[15px] font-bold" style={{ color: S.ink }}>المعاينة</h3>
        <PreviewSandbox css={appliedCss} ctx={ctx} hasJs={!!current?.js} />
      </div>

      {/* المحرر المتقدم */}
      <div className="mt-5 rounded-2xl border bg-white" style={{ borderColor: S.border }}>
        <button type="button" onClick={() => setAdvanced((a) => !a)}
          className="flex w-full items-center justify-between px-4 py-3 text-right">
          <span className="text-[14px] font-bold" style={{ color: S.ink }}>المحرر المتقدم — للحالات غير المدعومة</span>
          <span style={{ color: S.soft }}>{advanced ? "−" : "+"}</span>
        </button>
        {advanced && (
          <div className="space-y-3 border-t p-4" style={{ borderColor: S.borderSoft }}>
            <p className="text-[12.5px] leading-6" style={{ color: S.muted }}>
              اكتب الـ Selector والقواعد بنفسك. الكود يمرّ على نفس فحص الأمان، ولا يُطبَّق إلا داخل المعاينة المعزولة.
            </p>
            <input value={advSelector} onChange={(e) => setAdvSelector(e.target.value)}
              placeholder="مثال: .sidra-header .store-header__logo"
              className="w-full rounded-xl border px-3 py-2 text-[13px]" dir="ltr"
              style={{ borderColor: S.border, color: S.ink }} />
            <textarea value={advCss} onChange={(e) => setAdvCss(e.target.value)} rows={6}
              placeholder={"مثال:\n.sidra-header { box-shadow: 0 2px 12px rgba(0,0,0,.08); }"}
              className="w-full resize-y rounded-xl border px-3 py-2 text-[12.5px] leading-6" dir="ltr"
              style={{ borderColor: S.border, color: S.ink, fontFamily: "ui-monospace,Menlo,Consolas,monospace" }} />
            {advIssues.length > 0 && (
              <ul className="space-y-1.5">
                {advIssues.map((iss, n) => (
                  <li key={n} className="rounded-lg border px-3 py-2 text-[12.5px]"
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
            <button type="button" disabled={!advCss.trim() || !isSafe(advIssues)}
              onClick={() => setAppliedCss((p) => `${p}\n\n/* سِدرة — تعديل يدوي */\n${advCss}`.trim())}
              className="rounded-xl px-4 py-2 text-[13px] font-bold text-white transition disabled:opacity-40"
              style={{ background: S.ink }}>تطبيق في المعاينة</button>
          </div>
        )}
      </div>
    </DocsSection>
  );
}
