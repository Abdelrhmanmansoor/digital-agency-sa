/* ═══════════════════════════════════════════════════════════════════════════
   الروابط الخاصة للفواتير
   ───────────────────────────────────────────────────────────────────────────
   لا قاعدة بيانات جديدة ولا حزمة جديدة: كل ما هنا مبني على `crypto` من Node
   وعلى نفس تخزين Upstash عبر REST الذي يستخدمه المشروع أصلًا.

   نموذج الخصوصية بصراحة: الرابط سرّي بقدر عشوائيته (12 حرفًا من أبجدية من 56
   رمزًا ≈ 70 بت من العشوائية، لا يُخمَّن عمليًا). لكنه يبقى رابطًا — من يملكه
   يفتحه. كلمة المرور الاختيارية هي الطبقة التي تحوّله من «غير قابل للتخمين»
   إلى «محمي فعلًا»، والانتهاء والإيقاف اليدوي يحدّان من عمره.
   ═══════════════════════════════════════════════════════════════════════════ */
import { createHash, randomInt, timingSafeEqual } from "crypto";
import type { Invoice, PaymentOption } from "./db";

/* أبجدية بلا 0/O/1/l/I — الرابط يُملى أحيانًا على الهاتف أو يُنسخ يدويًا. */
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

/** معرّف عام عشوائي مشفّر — لا تسلسل ولا تخمين. */
export function generatePublicId(length = 12): string {
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

/** المعرّف العام يُقبل بهذا الشكل فقط — يمنع أي محاولة حقن عبر مقطع المسار. */
export function isValidPublicId(value: string): boolean {
  return typeof value === "string" && /^[2-9A-HJ-NP-Za-km-z]{8,32}$/.test(value);
}

/* السرّ نفسه المستخدم لتوقيع جلسات الإدارة يعمل هنا كـ pepper، فلا يوجد
   متغيّر بيئة جديد على المستخدم أن يضبطه. */
const PEPPER =
  process.env.JWT_SECRET || "dev-only-jwt-secret-do-not-use-in-production-placeholder";

export function hashSharePassword(password: string): string {
  return createHash("sha256").update(`${PEPPER}::invoice::${password}`).digest("hex");
}

export function verifySharePassword(password: string, hash: string): boolean {
  if (!hash) return true;
  const candidate = Buffer.from(hashSharePassword(password));
  const stored = Buffer.from(hash);
  if (candidate.length !== stored.length) return false;
  return timingSafeEqual(candidate, stored);
}

/** اسم كوكي الفتح — واحد لكل فاتورة، فلا يفتح أحدهم فاتورة غيره. */
export function shareCookieName(publicId: string): string {
  return `inv_${publicId}`;
}

/* قيمة الكوكي مشتقّة من السرّ + المعرّف + هاش كلمة المرور: لا يمكن تزويرها
   من المتصفح، وتبطُل تلقائيًا لحظة تغيير كلمة المرور. */
export function shareCookieValue(publicId: string, passwordHash: string): string {
  return createHash("sha256").update(`${PEPPER}::unlock::${publicId}::${passwordHash}`).digest("hex");
}

export type ShareState = "ok" | "not-found" | "disabled" | "expired";

export function evaluateShare(invoice: Invoice | undefined): ShareState {
  if (!invoice || !invoice.publicId) return "not-found";
  if (invoice.shareEnabled === false) return "disabled";
  if (invoice.shareExpiresAt) {
    /* تاريخ بلا وقت يُعتبر ساريًا حتى نهاية ذلك اليوم. */
    const expiry = new Date(
      /^\d{4}-\d{2}-\d{2}$/.test(invoice.shareExpiresAt)
        ? `${invoice.shareExpiresAt}T23:59:59`
        : invoice.shareExpiresAt
    );
    if (!Number.isNaN(expiry.getTime()) && expiry.getTime() < Date.now()) return "expired";
  }
  return "ok";
}

/* ── الحمولة التي تصل إلى متصفّح العميل ──────────────────────────────────────
   كل ما لا يحتاجه العميل لا يغادر الخادم: المعرّف الداخلي، هاش كلمة المرور،
   إعدادات الرابط، أرقام الحوالات في سجل الدفعات، ووسائل الدفع غير المفعّلة. */
export type PublicPaymentOption = Omit<PaymentOption, "enabled">;

export interface PublicInvoice {
  number: string;
  titleAr?: string;
  titleEn?: string;
  logoUrl?: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientCompany?: string;
  items: Invoice["items"];
  additionalCosts?: Invoice["additionalCosts"];
  subtotal: number;
  discountAmount?: number;
  discount?: number;
  discountType?: "amount" | "percent";
  vatExempt?: boolean;
  vatRate: number;
  vat: number;
  total: number;
  totalPaid?: number;
  remainingBalance?: number;
  currency: Invoice["currency"];
  status: Invoice["status"];
  issueDate: string;
  dueDate: string;
  notesAr?: string;
  notes?: string;
  thankYouAr?: string;
  thankYouEn?: string;
  paymentOptions: PublicPaymentOption[];
  payments?: { date: string; amount: number; method: string }[];
}

export function toPublicInvoice(inv: Invoice): PublicInvoice {
  const options = (inv.paymentOptions ?? []).filter((o) => o.enabled);

  /* توافق مع الفواتير التي أُنشئت قبل نظام الخيارات: تُحوَّل الوسيلة القديمة
     إلى خيار واحد مفعّل حتى لا تظهر صفحة العميل بلا أي بيانات دفع. */
  if (options.length === 0) {
    const legacy = inv.paymentMethods?.[0];
    if (legacy?.iban || legacy?.accountNumber || inv.iban) {
      options.push({
        id: "legacy-bank",
        kind: "bank",
        label: legacy?.bankName || inv.bankName || "تحويل بنكي",
        labelEn: "Bank Transfer",
        enabled: true,
        bankName: legacy?.bankName || inv.bankName,
        accountHolder: legacy?.accountHolder || inv.accountHolder,
        accountNumber: legacy?.accountNumber,
        iban: legacy?.iban || inv.iban,
        swift: legacy?.swiftCode,
      });
    } else if (legacy?.paypalEmail) {
      options.push({
        id: "legacy-paypal",
        kind: "paypal",
        label: "PayPal",
        enabled: true,
        identifier: legacy.paypalEmail,
      });
    }
  }

  return {
    number: inv.number,
    titleAr: inv.titleAr,
    titleEn: inv.titleEn,
    logoUrl: inv.logoUrl,
    clientName: inv.clientName,
    clientEmail: inv.clientEmail || undefined,
    clientPhone: inv.clientPhone || undefined,
    clientCompany: inv.clientCompany,
    items: inv.items ?? [],
    additionalCosts: inv.additionalCosts,
    subtotal: inv.subtotal ?? 0,
    discount: inv.discount,
    discountType: inv.discountType,
    discountAmount: inv.discountAmount,
    vatExempt: inv.vatExempt ?? inv.vatRate === 0,
    vatRate: inv.vatRate ?? 0,
    vat: inv.vat ?? 0,
    total: inv.total ?? 0,
    totalPaid: inv.totalPaid,
    remainingBalance: inv.remainingBalance,
    currency: inv.currency ?? "SAR",
    status: inv.status,
    issueDate: inv.issueDate,
    dueDate: inv.dueDate,
    notesAr: inv.notesAr,
    notes: inv.notes,
    thankYouAr: inv.thankYouAr,
    thankYouEn: inv.thankYouEn,
    /* `enabled` لا معنى له بعد الترشيح، ونزعه يمنع تسريب وجود وسائل مُطفأة. */
    paymentOptions: options.map(({ enabled: _enabled, ...rest }) => rest),
    payments: inv.payments?.map((p) => ({ date: p.date, amount: p.amount, method: p.method })),
  };
}

/** يُبنى منه الرابط المُرسل للعميل. */
export function invoiceShareUrl(origin: string, publicId: string): string {
  return `${origin.replace(/\/$/, "")}/invoice/${publicId}`;
}
