/* اختبار محرّك المساعد على الأوامر الخمسة عشر المطلوبة.
   يُشغَّل بـ: npx tsx lib/sidra-assistant/__test.mjs
   أو بعد ترجمة الوحدات. الهدف إثبات السلوك لا التزيين. */

import { interpret } from "./interpreter.ts";
import { generate } from "./generators.ts";
import { validateCss, validateJs, isSafe } from "./validator.ts";

const CASES = [
  ["خلي الفوتر أسود والنص أبيض", "code"],
  ["خلي الهيدر شفاف في الرئيسية وثابت عند النزول", "code"],
  ["صغر المسافة بين الأقسام على الجوال إلى 20 بكسل", "code"],
  ["اخفي زر المقارنة من بطاقات المنتجات", "code"],
  ["خلي زر أضف للسلة بعرض كامل وحوافه 12 بكسل", "code"],
  ["كبر اسم المنتج في صفحة المنتج فقط", "code"],
  ["أضف حركة خفيفة للبطاقة عند مرور الماوس", "code"],
  ["خلي البنر ارتفاعه 450 على الكمبيوتر", "code"],
  ["اعمل زر يرجع لأعلى الصفحة بعد النزول", "code"],
  ["غير اللون", "ask"],
  ["خلي الفوتير اسود", "code"],           // خطأ إملائي مقصود
  ["اربط المتجر بقاعدة بيانات خارجية", "unsupported"],
  ["<script>alert(1)</script>", "unsupported"],
  ["خلي خلفية الهيدر #111111", "code"],
  ["صغر اسم المنتج في صفحة المنتج على الجوال", "code"],
];

let pass = 0, fail = 0;
for (const [text, expect] of CASES) {
  const i = interpret(text);
  let actual;
  if (i.confidence === "unsupported") actual = "unsupported";
  else if (i.missing.length) actual = "ask";
  else actual = "code";

  let detail = i.summary;
  if (actual === "code") {
    const out = generate(i);
    const issues = [...validateCss(out.css), ...validateJs(out.js)];
    if (!out.css && !out.js) { actual = "empty"; }
    else if (!isSafe(issues)) { actual = "blocked"; }
    detail += `  →  ${out.css ? "CSS" : ""}${out.css && out.js ? "+" : ""}${out.js ? "JS" : ""}`;
  }

  const ok = actual === expect;
  ok ? pass++ : fail++;
  console.log(`${ok ? "✓" : "✗"} [${expect}/${actual}] ${text}`);
  console.log(`    ${detail}`);
}
console.log(`\n${pass} نجح · ${fail} فشل`);
process.exit(fail ? 1 : 0);
