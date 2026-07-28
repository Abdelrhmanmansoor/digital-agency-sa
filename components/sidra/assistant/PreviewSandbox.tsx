"use client";

/* ══════════════════════════════════════════════════════════════════════
   SidraPreviewSandbox — معاينة معزولة

   نموذج مصغّر من الثيم داخل <iframe sandbox> بلا allow-scripts، فأي كود
   يُطبَّق هنا لا يستطيع لمس صفحة الموقع ولا تشغيل JavaScript. لذلك
   المعاينة تمثّل CSS فقط، ونقولها صراحةً للمستخدم بدل الإيحاء بغير ذلك.
   ══════════════════════════════════════════════════════════════════════ */

import { useEffect, useMemo, useRef, useState } from "react";
import { S } from "../ui";
import type { StoreContext } from "@/lib/sidra-assistant/history";

type Viewport = "desktop" | "tablet" | "mobile";

const WIDTHS: Record<Viewport, number> = { desktop: 1180, tablet: 820, mobile: 390 };
const VIEW_LABEL: Record<Viewport, string> = { desktop: "سطح المكتب", tablet: "لوحي", mobile: "جوال" };

/* البنية تستخدم نفس أسماء ثيم سِدرة الحقيقية حتى يعمل الكود المولَّد عليها */
function buildDoc(css: string, ctx: StoreContext, mode: "light" | "dark"): string {
  const dark = mode === "dark";
  return `<!doctype html><html lang="ar" dir="${ctx.direction}" data-theme="${mode}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  :root{
    --sidra-primary:${ctx.primaryColor};
    --sidra-secondary:${ctx.secondaryColor};
    --ink:${dark ? "#f4efe9" : "#211711"};
    --bg:${dark ? "#15110e" : "#f8f2ec"};
    --card:${dark ? "#1f1a16" : "#ffffff"};
    --line:${dark ? "#332b25" : "#eadfd4"};
  }
  *{box-sizing:border-box}
  body{margin:0;font-family:system-ui,"Segoe UI",Tahoma,sans-serif;background:var(--bg);color:var(--ink)}
  .sidra-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 20px;background:var(--card);border-bottom:1px solid var(--line)}
  .store-header__logo{font-weight:800;color:var(--sidra-primary);text-decoration:none}
  .store-header__menu-link{margin-inline-start:14px;color:inherit;text-decoration:none;font-size:14px}
  .sh-iconbtn{width:36px;height:36px;border:0;border-radius:10px;background:transparent;color:inherit;cursor:pointer}
  main.sidra-home{display:flex;flex-direction:column;gap:32px;padding:24px 20px}
  .sidra-container{max-width:1100px;margin-inline:auto;width:100%}
  .sidra-section-title{font-size:1.2rem;margin:0 0 12px}
  .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}
  .s-product-card-entry{background:var(--card);border:1px solid var(--line);border-radius:14px;overflow:hidden}
  .s-product-card-image{aspect-ratio:3/4;background:linear-gradient(135deg,#d8c6ae,#b99f7e)}
  .s-product-card-content{padding:10px}
  .s-product-card-content-title{font-size:.9rem;margin:0 0 6px}
  .s-product-card-price{font-weight:800;color:var(--sidra-primary);font-size:.9rem}
  .s-product-card-actions{display:flex;gap:6px;padding:0 10px 10px}
  .s-product-card-wishlist-btn,.s-product-card-compare-btn{width:30px;height:30px;border:1px solid var(--line);border-radius:8px;background:transparent;color:inherit;cursor:pointer;font-size:12px}
  .sidra-btn{flex:1;border:0;border-radius:10px;background:var(--sidra-primary);color:#fff;padding:8px;font-size:.82rem;cursor:pointer}
  .tf-footer{background:var(--card);border-top:1px solid var(--line);padding:22px 20px;margin-top:8px}
  .tf-footer h4{margin:0 0 8px;font-size:.9rem}
  .tf-footer a{display:block;color:inherit;text-decoration:none;font-size:.82rem;opacity:.85;margin-bottom:5px}
  .tf-footer__cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:18px}
  .store-footer__copyright{margin-top:14px;padding-top:12px;border-top:1px solid var(--line);font-size:.76rem;opacity:.7}
</style>
<style id="sidra-user-css">${css}</style>
</head>
<body class="index">
  <header class="sidra-header">
    <a class="store-header__logo" href="#">سِدرة</a>
    <nav><a class="store-header__menu-link" href="#">الرئيسية</a><a class="store-header__menu-link" href="#">المنتجات</a><a class="store-header__menu-link" href="#">تواصل</a></nav>
    <div><button class="sh-iconbtn">♡</button><button class="sh-iconbtn sh-cart">🛍</button></div>
  </header>

  <main class="sidra-home">
    <section class="sidra-container">
      <h2 class="sidra-section-title">وصل حديثًا</h2>
      <div class="cards">
        ${[1, 2, 3, 4].map((i) => `
        <article class="s-product-card-entry">
          <div class="s-product-card-image"></div>
          <div class="s-product-card-content">
            <h3 class="s-product-card-content-title">منتج تجريبي ${i}</h3>
            <span class="s-product-card-price">١٩٩ ﷼</span>
          </div>
          <div class="s-product-card-actions">
            <button class="sidra-btn">أضف للسلة</button>
            <button class="s-product-card-wishlist-btn">♡</button>
            <button class="s-product-card-compare-btn">⇄</button>
          </div>
        </article>`).join("")}
      </div>
    </section>
    <section class="sidra-container">
      <h2 class="sidra-section-title">الأكثر مبيعًا</h2>
      <div class="cards">
        ${[5, 6, 7, 8].map((i) => `
        <article class="s-product-card-entry">
          <div class="s-product-card-image"></div>
          <div class="s-product-card-content">
            <h3 class="s-product-card-content-title">منتج تجريبي ${i}</h3>
            <span class="s-product-card-price">٢٤٩ ﷼</span>
          </div>
          <div class="s-product-card-actions">
            <button class="sidra-btn">أضف للسلة</button>
            <button class="s-product-card-wishlist-btn">♡</button>
            <button class="s-product-card-compare-btn">⇄</button>
          </div>
        </article>`).join("")}
      </div>
    </section>
  </main>

  <footer class="tf-footer">
    <div class="sidra-container">
      <div class="tf-footer__cols">
        <div><h4>روابط مهمة</h4><a href="#">من نحن</a><a href="#">سياسة الاستبدال</a><a href="#">الشروط</a></div>
        <div><h4>تواصل معنا</h4><a href="#">واتساب</a><a href="#">البريد</a></div>
        <div><h4>الدفع</h4><a href="#">مدى · فيزا · Apple Pay</a></div>
      </div>
      <div class="store-footer__copyright">© سِدرة — جميع الحقوق محفوظة</div>
    </div>
  </footer>
</body></html>`;
}

export default function PreviewSandbox({
  css,
  ctx,
  hasJs,
}: {
  css: string;
  ctx: StoreContext;
  hasJs: boolean;
}) {
  const [view, setView] = useState<Viewport>("desktop");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [compare, setCompare] = useState(false);
  const [nonce, setNonce] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const docAfter = useMemo(() => buildDoc(css, ctx, mode), [css, ctx, mode]);
  const docBefore = useMemo(() => buildDoc("", ctx, mode), [ctx, mode]);

  /* الإطار يُرسم بعرضه الحقيقي ثم يُصغَّر بصريًا، حتى تعمل media queries
     على العرض الصحيح بدل عرض الحاوية. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fit = () => {
      const avail = el.clientWidth - (compare ? 12 : 0);
      const per = compare ? avail / 2 : avail;
      setScale(Math.min(1, per / WIDTHS[view]));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [view, compare]);

  const frame = (srcDoc: string, key: string, caption?: string) => (
    <div className="flex flex-col items-center gap-2">
      {caption && <span className="text-[11px] font-semibold" style={{ color: S.soft }}>{caption}</span>}
      <div
        className="overflow-hidden rounded-xl border shadow-sm"
        style={{ borderColor: S.border, width: WIDTHS[view] * scale, height: 460 * scale }}
      >
        <iframe
          key={`${key}-${nonce}-${view}-${mode}`}
          title={caption || "معاينة سِدرة"}
          srcDoc={srcDoc}
          sandbox=""
          style={{
            width: WIDTHS[view], height: 460, border: 0,
            transform: `scale(${scale})`, transformOrigin: ctx.direction === "rtl" ? "top right" : "top left",
          }}
        />
      </div>
    </div>
  );

  const btn = (on: boolean) =>
    `rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${
      on ? "text-white" : "hover:bg-black/5"
    }`;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {(Object.keys(WIDTHS) as Viewport[]).map((v) => (
          <button key={v} type="button" onClick={() => setView(v)}
            className={btn(view === v)}
            style={view === v ? { background: S.ink } : { color: S.muted }}>
            {VIEW_LABEL[v]}
          </button>
        ))}
        <span className="mx-1 h-4 w-px" style={{ background: S.border }} />
        <button type="button" onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={btn(false)} style={{ color: S.muted }}>
          {mode === "light" ? "الوضع الداكن" : "الوضع الفاتح"}
        </button>
        <button type="button" onClick={() => setCompare((c) => !c)}
          className={btn(compare)} style={compare ? { background: S.red } : { color: S.muted }}>
          {compare ? "إخفاء المقارنة" : "قبل / بعد"}
        </button>
        <button type="button" onClick={() => setNonce((n) => n + 1)}
          className={btn(false)} style={{ color: S.muted }}>
          تحديث
        </button>
      </div>

      <div ref={wrapRef} className={`flex ${compare ? "gap-3" : ""} justify-center`}>
        {compare && frame(docBefore, "before", "قبل")}
        {frame(docAfter, "after", compare ? "بعد" : undefined)}
      </div>

      {hasJs && (
        <p className="mt-3 rounded-lg border px-3 py-2 text-[12px] leading-6"
           style={{ borderColor: S.border, background: S.cream, color: S.muted }}>
          المعاينة تعرض تأثير CSS فقط. كود JavaScript لا يُشغَّل هنا عمدًا — الإطار معزول بلا صلاحية تنفيذ،
          حتى لا يستطيع أي كود لمس صفحة الموقع. جرّبه على نسخة تجريبية من متجرك.
        </p>
      )}
    </div>
  );
}
