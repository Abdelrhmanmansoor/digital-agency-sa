/* ══════════════════════════════════════════════════════════════════════
   SidraCssGenerator + SidraJavaScriptGenerator

   يحوّلان نتيجة المفسّر إلى كود جاهز للصق. القواعد الثابتة:
   · نطاق محدود — لا محدِّدات عامة تؤثر على بقية المتجر
   · لا !important إلا حين يفرضه مكوّن سلة نفسه
   · media query فقط عند تخصيص جهاز
   · تعليق يشرح الغرض ومكان اللصق
   ══════════════════════════════════════════════════════════════════════ */

import { PAGE_SCOPES, type DeviceScope, type PageScope } from "./registry";
import type { Interpretation } from "./interpreter";

export interface GeneratedCode {
  css: string;
  js: string;
  explanation: string;
  install: string[];
  warnings: string[];
}

const DEVICE_QUERY: Record<Exclude<DeviceScope, "all">, string> = {
  mobile: "@media (max-width: 768px)",
  desktop: "@media (min-width: 769px)",
};

/** يلفّ المحدِّد بنطاق الصفحة عند الحاجة */
function scoped(selector: string, page: PageScope): string {
  if (page === "all") return selector;
  const scope = PAGE_SCOPES[page as Exclude<PageScope, "all">].selector;
  return scope
    .split(",")
    .map((s) => `${s.trim()} ${selector}`)
    .join(",\n");
}

/** يلفّ القواعد بـ media query عند تخصيص جهاز */
function wrapDevice(body: string, device: DeviceScope): string {
  if (device === "all") return body;
  const q = DEVICE_QUERY[device as Exclude<DeviceScope, "all">];
  return `${q} {\n${body.split("\n").map((l) => (l ? "  " + l : l)).join("\n")}\n}`;
}

function targetSelector(i: Interpretation): string {
  if (!i.component) return "";
  if (i.part && i.component.parts?.[i.part]) return i.component.parts[i.part].selector;
  return i.component.selector;
}

function sizeFor(i: Interpretation, fallbackUp: string, fallbackDown: string, base: string): string {
  if (i.size) return i.size;
  if (i.sizeDirection === "up") return fallbackUp;
  if (i.sizeDirection === "down") return fallbackDown;
  return base;
}

export function generate(i: Interpretation): GeneratedCode {
  const warnings: string[] = [];
  const sel = targetSelector(i);
  const label = i.part && i.component?.parts?.[i.part]
    ? i.component.parts[i.part].label
    : i.component?.label ?? "";
  const target = scoped(sel, i.page);
  let css = "";
  let js = "";
  let explanation = "";

  const header = `/* سِدرة — ${i.intent?.label ?? "تخصيص"}: ${label} */`;

  switch (i.intent?.kind) {
    case "background":
      /* أمر مركّب شائع: «الفوتر أسود والنص أبيض». لو ذُكر لونان وكلمة النص،
         نولّد الاثنين معًا بدل أن نُسقط نصف الطلب بصمت. */
      if (i.secondColor && /النص|الخط|الكتابه/.test(i.normalized)) {
        css = `${header}\n${target} {\n  background-color: ${i.color};\n  color: ${i.secondColor};\n}\n\n${target} :is(a, p, h2, h3, h4, span, small, strong) {\n  color: inherit;\n}`;
        explanation = `يضبط خلفية ${label} إلى ${i.color} ولون النص إلى ${i.secondColor}، مع جعل العناوين والروابط بداخله ترث اللون نفسه.`;
      } else {
        css = `${header}\n${target} {\n  background-color: ${i.color};\n}`;
        explanation = `يضبط لون خلفية ${label} إلى ${i.color}.`;
      }
      break;

    case "textColor":
      /* color وحده لا يكفي: العناوين والروابط داخل المكوّن تحمل ألوانها.
         inherit يجعلها تتبع اللون الجديد دون تعداد كل عنصر. */
      css = `${header}\n${target} {\n  color: ${i.color};\n}\n\n${target} :is(a, p, h2, h3, h4, span, small, strong) {\n  color: inherit;\n}`;
      explanation = `يضبط لون النص في ${label} إلى ${i.color}، ويجعل العناوين والروابط بداخله ترث اللون نفسه.`;
      break;

    case "borderColor":
      css = `${header}\n${target} {\n  border-color: ${i.color};\n}`;
      explanation = `يضبط لون حدود ${label} إلى ${i.color}.`;
      break;

    case "radius": {
      const v = sizeFor(i, "20px", "6px", "12px");
      css = `${header}\n${target} {\n  border-radius: ${v};\n  overflow: hidden;\n}`;
      explanation = `يجعل حواف ${label} بنصف قطر ${v}. أُضيف overflow: hidden حتى تُقصّ الصور مع الحواف.`;
      break;
    }

    case "spacing": {
      const v = sizeFor(i, "28px", "10px", "16px");
      css = `${header}\n${target} {\n  padding: ${v};\n}`;
      explanation = `يضبط المسافة الداخلية في ${label} إلى ${v}.`;
      break;
    }

    case "gap": {
      const v = sizeFor(i, "56px", "20px", "32px");
      /* .sidra-home عمود flex — المسافة بين الأقسام هي gap وليست margin */
      css = `${header}\nmain.sidra-home {\n  gap: ${v};\n}`;
      explanation = `يضبط المسافة بين أقسام الصفحة الرئيسية إلى ${v}. الأقسام داخل عمود flex، لذلك الضبط على gap وليس margin — وهذا يمنع تراكم الهوامش.`;
      break;
    }

    case "fontSize": {
      const v = sizeFor(i, "1.35rem", "0.9rem", "1.1rem");
      css = `${header}\n${target} {\n  font-size: ${v};\n  line-height: 1.4;\n}`;
      explanation = `يضبط حجم خط ${label} إلى ${v} مع ارتفاع سطر مناسب.`;
      break;
    }

    case "fontWeight": {
      const v = i.size ? i.size.replace(/px|rem|em/g, "") : i.sizeDirection === "down" ? "500" : "800";
      css = `${header}\n${target} {\n  font-weight: ${v};\n}`;
      explanation = `يضبط سماكة خط ${label} إلى ${v}.`;
      break;
    }

    case "hide":
      css = `${header}\n${target} {\n  display: none;\n}`;
      explanation = `يخفي ${label}${i.device !== "all" ? "" : " في كل الصفحات المحددة"}.`;
      if (i.component?.key === "productCard" && !i.part) {
        warnings.push("إخفاء بطاقة المنتج كاملة يخفي كل المنتجات — الأرجح أنك تقصد جزءًا داخلها مثل زر المقارنة.");
      }
      break;

    case "show":
      css = `${header}\n${target} {\n  display: revert;\n}`;
      explanation = `يعيد إظهار ${label}. استُخدم revert بدل block حتى يعود العنصر لنوع العرض الأصلي بدل فرض نوع قد يكسر تخطيطه.`;
      break;

    case "sticky":
      css = `${header}\n${target} {\n  position: sticky;\n  top: 0;\n  z-index: 60;\n}`;
      explanation = `يثبّت ${label} أعلى الشاشة أثناء التمرير. z-index: 60 يكفي ليعلو المحتوى دون أن يغطّي النوافذ المنبثقة.`;
      warnings.push("إن كان الهيدر مثبّتًا أصلًا من إعدادات الثيم فلا حاجة لهذا الكود — راجع إعداد «تثبيت الهيدر».");
      break;

    case "transparent":
      css = `${header}\n${target} {\n  background-color: transparent;\n  backdrop-filter: none;\n}`;
      explanation = `يجعل خلفية ${label} شفافة.`;
      warnings.push("تأكد من تباين النص فوق الخلفية الشفافة — قد يحتاج لونًا فاتحًا.");
      break;

    case "hoverLift":
      css = `${header}\n${target} {\n  transition: transform .25s ease, box-shadow .25s ease;\n}\n\n${target}:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 18px 40px -24px rgba(17, 24, 39, .38);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  ${sel} { transition: none; }\n  ${sel}:hover { transform: none; }\n}`;
      explanation = `يضيف ارتفاعًا خفيفًا وظلًا عند مرور المؤشر فوق ${label}، مع تعطيل الحركة لمن يفعّل «تقليل الحركة» في نظامه.`;
      break;

    case "height": {
      const v = sizeFor(i, "520px", "260px", "400px");
      css = `${header}\n${target} {\n  height: ${v};\n  min-height: ${v};\n}`;
      explanation = `يضبط ارتفاع ${label} إلى ${v}. أُضيف min-height لأن المحتوى الداخلي قد يفرض ارتفاعًا أكبر ويتجاهل height وحده.`;
      break;
    }

    case "fullWidth":
      css = `${header}\n${target} {\n  width: 100%;\n  display: block;\n}`;
      explanation = `يجعل ${label} بعرض كامل.`;
      break;

    case "backToTop":
      js = `/* سِدرة — زر العودة للأعلى */
(function () {
  if (window.__sidraBackToTop) return;          // يمنع التسجيل مرتين
  window.__sidraBackToTop = true;

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sidra-custom-totop';
    btn.setAttribute('aria-label', 'العودة لأعلى الصفحة');
    btn.textContent = '↑';
    document.body.appendChild(btn);

    var shown = false;
    function sync() {
      var should = window.scrollY > 600;
      if (should === shown) return;             // لا نلمس الـ DOM بلا داعٍ
      shown = should;
      btn.classList.toggle('is-visible', should);
    }
    addEventListener('scroll', sync, { passive: true });
    sync();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();`;
      css = `/* سِدرة — شكل زر العودة للأعلى */
.sidra-custom-totop {
  position: fixed;
  inset-block-end: 90px;
  inset-inline-end: 18px;
  z-index: 40;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: var(--sidra-primary, #b1781b);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: opacity .25s ease, visibility .25s ease;
}
.sidra-custom-totop.is-visible { opacity: 1; visibility: visible; }`;
      explanation = "يضيف زرًا يظهر بعد التمرير 600 بكسل ويعيدك لأعلى الصفحة. الزر يُنشأ مرة واحدة فقط، ومستمع التمرير passive حتى لا يؤخّر التمرير.";
      break;

    case "smoothScroll":
      js = `/* سِدرة — تمرير سلس لروابط الإزاحة */
(function () {
  if (window.__sidraSmoothScroll) return;
  window.__sidraSmoothScroll = true;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]:not([href="#"])');
    if (!a) return;
    var el = document.querySelector(a.getAttribute('href'));
    if (!el) return;                            // رابط لعنصر غير موجود: اتركه للمتصفح
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();`;
      explanation = "يجعل روابط الإزاحة الداخلية تتحرك بسلاسة. يستخدم تفويض حدث واحد على المستند بدل ربط كل رابط، ويتجاهل الروابط التي لا هدف لها.";
      break;

    default:
      explanation = "";
  }

  const install: string[] = [];
  if (css) {
    install.push("انسخ كود CSS.");
    install.push("لوحة تحكم سلة ← تصميم المتجر ← الثيم ← تعديل ← CSS مخصص.");
    install.push("الصق الكود في نهاية الملف ثم احفظ.");
    install.push("افتح المتجر وحدّث الصفحة (Ctrl+Shift+R) وتحقق على الجوال وسطح المكتب.");
  }
  if (js) {
    install.push("انسخ كود JavaScript.");
    install.push("لوحة تحكم سلة ← تصميم المتجر ← الثيم ← تعديل ← JavaScript مخصص.");
    install.push("الصق الكود ثم احفظ، وجرّبه على نسخة تجريبية أولًا.");
    install.push("لا تضع الكود داخل ملفات الثيم الأساسية حتى لا يضيع مع التحديث.");
  }

  if (css && i.device !== "all") css = wrapDevice(css, i.device);

  return { css, js, explanation, install, warnings };
}
