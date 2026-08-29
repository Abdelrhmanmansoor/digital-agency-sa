"use client";

/* محرّر وسائل الدفع الظاهرة للعميل — مشترك بين شاشتَي «فاتورة جديدة»
   و«تعديل الفاتورة» حتى لا يتكرّر المنطق في ملفين.
   كل وسيلة تُفعّل أو تُطفأ على حدة، والمُطفأة لا تصل إلى صفحة العميل أصلًا. */

import type { PaymentOption, PaymentOptionKind } from "@/lib/db";

const KINDS: { kind: PaymentOptionKind; label: string; icon: string; defaults: Partial<PaymentOption> }[] = [
  { kind: "bank",          label: "تحويل بنكي",    icon: "🏦", defaults: { label: "تحويل بنكي", labelEn: "Bank Transfer" } },
  { kind: "western_union", label: "ويسترن يونيون", icon: "💸", defaults: { label: "ويسترن يونيون", labelEn: "Western Union" } },
  { kind: "paypal",        label: "باي بال",       icon: "🅿️", defaults: { label: "PayPal", labelEn: "PayPal" } },
  { kind: "stripe",        label: "رابط Stripe",   icon: "💳", defaults: { label: "الدفع بالبطاقة", labelEn: "Pay by card" } },
  { kind: "custom",        label: "وسيلة مخصّصة",  icon: "✳️", defaults: { label: "", labelEn: "" } },
];

/* الحقول المعروضة لكل نوع. الحقول نفسها موجودة في النموذج دائمًا، لكن
   إظهار ما يخصّ النوع فقط هو ما يبقي الشاشة بسيطة. */
const FIELDS: Record<PaymentOptionKind, (keyof PaymentOption)[]> = {
  bank:          ["accountHolder", "bankName", "accountNumber", "iban", "swift", "country"],
  western_union: ["accountHolder", "country", "identifier"],
  paypal:        ["identifier", "link"],
  stripe:        ["link"],
  custom:        ["accountHolder", "identifier", "link"],
};

const FIELD_LABELS: Partial<Record<keyof PaymentOption, string>> = {
  accountHolder: "اسم صاحب الحساب / المستلم",
  bankName: "اسم البنك",
  accountNumber: "رقم الحساب",
  iban: "الآيبان (IBAN)",
  swift: "السويفت (SWIFT)",
  country: "الدولة / المدينة",
  identifier: "البريد أو المعرّف",
  link: "رابط دفع خارجي",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  color: "rgba(255,255,255,0.42)",
  fontFamily: "Space Mono, monospace",
  letterSpacing: "0.06em",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "10px 12px",
  color: "#FAFAF7",
  fontSize: "13px",
  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
  outline: "none",
};

export default function PaymentOptionsEditor({
  options,
  onChange,
}: {
  options: PaymentOption[];
  onChange: (next: PaymentOption[]) => void;
}) {
  const add = (kind: PaymentOptionKind) => {
    const preset = KINDS.find((k) => k.kind === kind)!;
    onChange([
      ...options,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        kind,
        enabled: true,
        label: preset.defaults.label ?? "",
        labelEn: preset.defaults.labelEn ?? "",
      },
    ]);
  };

  const patch = (index: number, field: keyof PaymentOption, value: string | boolean) => {
    onChange(options.map((o, i) => (i === index ? { ...o, [field]: value } : o)));
  };

  const remove = (index: number) => onChange(options.filter((_, i) => i !== index));

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
        {KINDS.map((k) => (
          <button
            key={k.kind}
            type="button"
            onClick={() => add(k.kind)}
            style={{
              background: "rgba(240,177,0,0.08)",
              border: "1px solid rgba(240,177,0,0.28)",
              color: "#F0B100",
              borderRadius: "8px",
              padding: "9px 14px",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            }}
          >
            + {k.icon} {k.label}
          </button>
        ))}
      </div>

      {options.length === 0 && (
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", fontFamily: "Space Mono, monospace" }}>
          لم تُضف أي وسيلة دفع بعد — العميل لن يرى قسم السداد.
        </p>
      )}

      <div style={{ display: "grid", gap: "14px" }}>
        {options.map((option, index) => (
          <div
            key={option.id}
            style={{
              border: `1px solid ${option.enabled ? "rgba(240,177,0,0.25)" : "rgba(255,255,255,0.08)"}`,
              background: option.enabled ? "rgba(240,177,0,0.04)" : "rgba(255,255,255,0.02)",
              borderRadius: "12px",
              padding: "18px 20px",
              opacity: option.enabled ? 1 : 0.6,
            }}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginBottom: "14px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "#FAFAF7", fontSize: "13px" }}>
                <input
                  type="checkbox"
                  checked={option.enabled}
                  onChange={(e) => patch(index, "enabled", e.target.checked)}
                  style={{ width: "17px", height: "17px", accentColor: "#F0B100", cursor: "pointer" }}
                />
                {option.enabled ? "تظهر للعميل" : "مخفية"}
              </label>

              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
                {option.kind}
              </span>

              <button
                type="button"
                onClick={() => remove(index)}
                style={{
                  marginInlineStart: "auto",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#EF4444",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                }}
              >
                حذف
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
              <div>
                <span style={labelStyle}>الاسم الظاهر (عربي)</span>
                <input
                  style={inputStyle}
                  value={option.label}
                  onChange={(e) => patch(index, "label", e.target.value)}
                  placeholder="تحويل بنكي — الراجحي"
                />
              </div>
              <div>
                <span style={labelStyle}>الاسم الظاهر (إنجليزي)</span>
                <input
                  style={inputStyle}
                  value={option.labelEn ?? ""}
                  onChange={(e) => patch(index, "labelEn", e.target.value)}
                  placeholder="Bank Transfer — Al Rajhi"
                />
              </div>

              {FIELDS[option.kind].map((field) => (
                <div key={field}>
                  <span style={labelStyle}>{FIELD_LABELS[field]}</span>
                  <input
                    style={{ ...inputStyle, direction: field === "link" || field === "iban" ? "ltr" : undefined }}
                    value={(option[field] as string) ?? ""}
                    onChange={(e) => patch(index, field, e.target.value)}
                    placeholder={field === "link" ? "https://" : ""}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: "12px" }}>
              <span style={labelStyle}>تعليمات للعميل (اختياري)</span>
              <textarea
                style={{ ...inputStyle, minHeight: "70px", resize: "vertical", lineHeight: 1.7 }}
                value={option.instructions ?? ""}
                onChange={(e) => patch(index, "instructions", e.target.value)}
                placeholder="يُرجى ذكر رقم الفاتورة في بيان التحويل وإرسال صورة الإيصال."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
