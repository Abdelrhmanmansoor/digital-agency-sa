"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

interface Inputs {
  costPrice: number;
  salePrice: number;
  extraCosts: number;
}

interface Row {
  discount: number;
  newPrice: number;
  newMargin: number;
  requiredIncrease: number | null; // null = impossible
  verdict: "safe" | "risky" | "danger" | "impossible";
}

function computeRows(inputs: Inputs): { margin: number; rows: Row[] } {
  const totalCost = inputs.costPrice + inputs.salePrice * (inputs.extraCosts / 100);
  const margin = ((inputs.salePrice - totalCost) / inputs.salePrice) * 100;
  const marginFrac = margin / 100;

  const discounts = [5, 10, 15, 20, 25, 30, 35, 40, 50];
  const rows: Row[] = discounts.map((d) => {
    const discFrac = d / 100;
    const newPrice = inputs.salePrice * (1 - discFrac);
    const newMargin = ((newPrice - totalCost) / newPrice) * 100;

    let requiredIncrease: number | null = null;
    let verdict: Row["verdict"] = "impossible";

    if (marginFrac > discFrac) {
      requiredIncrease = (discFrac / (marginFrac - discFrac)) * 100;
      if (requiredIncrease <= 30) verdict = "safe";
      else if (requiredIncrease <= 80) verdict = "risky";
      else verdict = "danger";
    }

    return { discount: d, newPrice, newMargin, requiredIncrease, verdict };
  });

  return { margin, rows };
}

const VERDICT_COLORS = {
  safe: { bg: "rgba(74,140,111,0.1)", border: "rgba(74,140,111,0.3)", text: "#4A8C6F" },
  risky: { bg: "rgba(200,169,98,0.1)", border: "rgba(200,169,98,0.3)", text: "#C8A962" },
  danger: { bg: "rgba(201,64,64,0.1)", border: "rgba(201,64,64,0.3)", text: "#C94040" },
  impossible: { bg: "rgba(201,64,64,0.15)", border: "rgba(201,64,64,0.4)", text: "#C94040" },
};

export default function DiscountTrap({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const isFR = locale === "fr";

  const [inputs, setInputs] = useState<Inputs>({
    costPrice: 60,
    salePrice: 100,
    extraCosts: 10,
  });
  const [result, setResult] = useState<{ margin: number; rows: Row[] } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    if (inputs.salePrice <= 0) return;
    setResult(computeRows(inputs));
  };

  const t = {
    inputsTitle: isRTL ? "بيانات المنتج" : isFR ? "Donnees du produit" : "Product Data",
    costPrice: isRTL ? "تكلفة المنتج (شراء/تصنيع)" : isFR ? "Cout du produit" : "Product Cost",
    salePrice: isRTL ? "سعر البيع الحالي" : isFR ? "Prix de vente" : "Current Sale Price",
    extraCosts: isRTL ? "تكاليف اضافية (شحن، عمولة، تسويق)" : isFR ? "Couts supplementaires" : "Extra Costs (shipping, fees, marketing)",
    calculate: isRTL ? "كشف فخ الخصومات" : isFR ? "Reveler le piege" : "Reveal the Discount Trap",
    resultsTitle: isRTL ? "تحليل الخصومات" : isFR ? "Analyse des remises" : "Discount Analysis",
    currentMargin: isRTL ? "هامش ربحك الحالي" : isFR ? "Votre marge actuelle" : "Your Current Margin",
    discount: isRTL ? "الخصم" : isFR ? "Remise" : "Discount",
    newPrice: isRTL ? "السعر الجديد" : isFR ? "Nouveau prix" : "New Price",
    newMargin: isRTL ? "الهامش الجديد" : isFR ? "Nouvelle marge" : "New Margin",
    extraSales: isRTL ? "الزيادة المطلوبة بالمبيعات" : isFR ? "Augmentation requise" : "Required Sales Increase",
    impossible: isRTL ? "مستحيل" : isFR ? "Impossible" : "Impossible",
    loss: isRTL ? "خسارة!" : isFR ? "Perte!" : "Loss!",
    formula: isRTL ? "المعادلة" : isFR ? "Formule" : "Formula",
    formulaText: isRTL
      ? "الزيادة المطلوبة = نسبة الخصم / (هامش الربح - نسبة الخصم)"
      : isFR
        ? "Augmentation = Remise% / (Marge% - Remise%)"
        : "Required Increase = Discount% / (Margin% - Discount%)",
    insight: isRTL ? "الخلاصة" : isFR ? "Conclusion" : "Key Insight",
    copy: isRTL ? "نسخ النتائج" : isFR ? "Copier" : "Copy Results",
    copied: isRTL ? "تم النسخ!" : isFR ? "Copie!" : "Copied!",
    placeholder: isRTL
      ? "ادخل بيانات منتجك واضغط 'كشف فخ الخصومات'"
      : isFR
        ? "Entrez les donnees et cliquez sur 'Reveler le piege'"
        : "Enter your product data and press 'Reveal the Discount Trap'",
    currency: isRTL ? "ر.س" : isFR ? "SAR" : "SAR",
    safe: isRTL ? "آمن" : isFR ? "Sur" : "Safe",
    risky: isRTL ? "محفوف بالمخاطر" : isFR ? "Risque" : "Risky",
    danger: isRTL ? "خطير" : isFR ? "Dangereux" : "Dangerous",
  };

  const getInsight = (margin: number) => {
    if (margin <= 0) {
      return isRTL
        ? "منتجك اصلا بخسارة بدون اي خصم! راجع تسعيرك فورا."
        : isFR
          ? "Votre produit est deja en perte sans remise!"
          : "Your product is already at a loss without any discount! Review pricing immediately.";
    }
    if (margin < 20) {
      return isRTL
        ? `هامشك ${margin.toFixed(0)}% فقط — اي خصم فوق ${Math.floor(margin / 2)}% يحتاج زيادة كبيرة جدا بالمبيعات. فكر قبل ما تخصم.`
        : isFR
          ? `Votre marge est seulement ${margin.toFixed(0)}% — evitez les remises superieures a ${Math.floor(margin / 2)}%.`
          : `Your margin is only ${margin.toFixed(0)}% — any discount above ${Math.floor(margin / 2)}% requires a huge sales increase. Think before you discount.`;
    }
    return isRTL
      ? `هامشك ${margin.toFixed(0)}% — خصومات حتى ${Math.floor(margin / 3)}% ممكنة بزيادة معقولة بالمبيعات. فوق كذا الخطر يرتفع.`
      : isFR
        ? `Votre marge est ${margin.toFixed(0)}% — remises jusqu'a ${Math.floor(margin / 3)}% sont possibles.`
        : `Your margin is ${margin.toFixed(0)}% — discounts up to ${Math.floor(margin / 3)}% are feasible with reasonable sales increase. Beyond that, risk escalates.`;
  };

  const copyResults = () => {
    if (!result) return;
    const lines = result.rows
      .map((r) => {
        const inc = r.requiredIncrease !== null ? `+${r.requiredIncrease.toFixed(0)}%` : t.impossible;
        return `${r.discount}% → ${r.newPrice.toFixed(0)} ${t.currency} | ${isRTL ? "هامش" : "margin"}: ${r.newMargin.toFixed(1)}% | ${isRTL ? "زيادة مطلوبة" : "increase"}: ${inc}`;
      })
      .join("\n");
    const text = `${isRTL ? "تحليل فخ الخصومات" : "Discount Trap Analysis"}\n${t.currentMargin}: ${result.margin.toFixed(1)}%\n\n${lines}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelStyle = {
    display: "block" as const,
    fontSize: "11px",
    fontFamily: "Space Mono, monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#8C8C7A",
    marginBottom: "6px",
  };

  return (
    <div style={{ padding: "0 40px 40px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Inputs */}
        <div>
          <h3 style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 600, color: "#0A0A0A", marginBottom: "20px" }}>
            {t.inputsTitle}
          </h3>

          <div className="space-y-4">
            {[
              { key: "costPrice", label: t.costPrice, suffix: t.currency },
              { key: "salePrice", label: t.salePrice, suffix: t.currency },
              { key: "extraCosts", label: t.extraCosts, suffix: "%" },
            ].map((field) => (
              <div key={field.key}>
                <label style={labelStyle}>{field.label}</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    value={inputs[field.key as keyof Inputs]}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        [field.key]: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="form-input"
                    style={{
                      paddingLeft: !isRTL ? "48px" : "16px",
                      paddingRight: isRTL ? "48px" : "16px",
                      background: "#FAFAF7",
                      color: "#0A0A0A",
                      border: "1px solid #E8E6E1",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      left: isRTL ? "auto" : "12px",
                      right: isRTL ? "12px" : "auto",
                      fontSize: "12px",
                      color: "#8C8C7A",
                      fontFamily: "Space Mono, monospace",
                      pointerEvents: "none",
                    }}
                  >
                    {field.suffix}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Formula Box */}
          <div
            style={{
              marginTop: "24px",
              padding: "16px 20px",
              background: "rgba(200,169,98,0.06)",
              border: "1px solid rgba(200,169,98,0.15)",
              borderRadius: "8px",
            }}
          >
            <div style={{ ...labelStyle, color: "#C8A962", marginBottom: "10px" }}>{t.formula}</div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "13px",
                color: "#0A0A0A",
                lineHeight: 1.8,
                direction: "ltr",
              }}
            >
              {t.formulaText}
            </div>
          </div>

          <button onClick={calculate} className="btn-primary mt-6" style={{ width: "100%", justifyContent: "center" }}>
            <span>{isRTL ? "⚠ " : ""}{t.calculate}{!isRTL ? " ⚠" : ""}</span>
          </button>
        </div>

        {/* Results */}
        <div>
          <h3 style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 600, color: "#0A0A0A", marginBottom: "20px" }}>
            {t.resultsTitle}
          </h3>

          {result ? (
            <div className="space-y-4">
              {/* Current Margin Display */}
              <div
                style={{
                  padding: "20px",
                  background: result.margin > 0 ? "rgba(74,140,111,0.08)" : "rgba(201,64,64,0.08)",
                  border: `1px solid ${result.margin > 0 ? "rgba(74,140,111,0.25)" : "rgba(201,64,64,0.25)"}`,
                  textAlign: "center",
                }}
              >
                <div style={labelStyle}>{t.currentMargin}</div>
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "40px",
                    fontWeight: 700,
                    color: result.margin > 0 ? "#4A8C6F" : "#C94040",
                    lineHeight: 1.2,
                  }}
                >
                  {result.margin.toFixed(1)}%
                </div>
              </div>

              {/* Discount Table */}
              <div style={{ border: "1px solid #E8E6E1", overflow: "hidden", borderRadius: "4px" }}>
                {/* Table Header */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 2fr",
                    gap: "0",
                    background: "#0A0A0A",
                    padding: "10px 12px",
                  }}
                >
                  {[t.discount, t.newPrice, t.newMargin, t.extraSales].map((h) => (
                    <div
                      key={h}
                      style={{
                        fontSize: "9px",
                        fontFamily: "Space Mono, monospace",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#C8A962",
                      }}
                    >
                      {h}
                    </div>
                  ))}
                </div>

                {/* Table Rows */}
                {result.rows.map((row) => {
                  const colors = VERDICT_COLORS[row.verdict];
                  const maxBar = 200;
                  const barWidth = row.requiredIncrease !== null
                    ? Math.min((row.requiredIncrease / maxBar) * 100, 100)
                    : 100;

                  return (
                    <div
                      key={row.discount}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 2fr",
                        gap: "0",
                        padding: "10px 12px",
                        background: colors.bg,
                        borderBottom: "1px solid #E8E6E1",
                        alignItems: "center",
                      }}
                    >
                      {/* Discount % */}
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", fontWeight: 700, color: "#0A0A0A" }}>
                        {row.discount}%
                      </div>
                      {/* New Price */}
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#2D2D2D" }}>
                        {row.newPrice.toFixed(0)}
                      </div>
                      {/* New Margin */}
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", color: row.newMargin > 0 ? "#2D2D2D" : "#C94040", fontWeight: row.newMargin <= 0 ? 700 : 400 }}>
                        {row.newMargin > 0 ? `${row.newMargin.toFixed(0)}%` : t.loss}
                      </div>
                      {/* Required Increase with visual bar */}
                      <div>
                        {row.requiredIncrease !== null ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ flex: 1, height: "8px", background: "rgba(0,0,0,0.06)", borderRadius: "4px", overflow: "hidden" }}>
                              <div
                                style={{
                                  width: `${barWidth}%`,
                                  height: "100%",
                                  background: colors.text,
                                  borderRadius: "4px",
                                  transition: "width 0.5s ease",
                                }}
                              />
                            </div>
                            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", fontWeight: 700, color: colors.text, minWidth: "48px", textAlign: "right" }}>
                              +{row.requiredIncrease.toFixed(0)}%
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", fontWeight: 700, color: "#C94040" }}>
                            {t.impossible}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {[
                  { color: "#4A8C6F", label: `${t.safe} (<30%)` },
                  { color: "#C8A962", label: `${t.risky} (30-80%)` },
                  { color: "#C94040", label: `${t.danger} (>80%)` },
                ].map((item) => (
                  <div key={item.color} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: item.color }} />
                    <span style={{ fontSize: "11px", fontFamily: "Space Mono, monospace", color: "#8C8C7A" }}>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Insight */}
              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(200,169,98,0.08)",
                  border: "1px solid rgba(200,169,98,0.2)",
                  fontSize: "14px",
                  color: "#2D2D2D",
                  fontFamily: "'Zain', sans-serif",
                  lineHeight: 1.8,
                }}
              >
                <div style={{ ...labelStyle, color: "#C8A962", marginBottom: "8px" }}>{t.insight}</div>
                {getInsight(result.margin)}
              </div>

              {/* Copy */}
              <button
                onClick={copyResults}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "transparent",
                  border: "1px solid #E8E6E1",
                  cursor: "pointer",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "#8C8C7A",
                  textTransform: "uppercase",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8A962"; e.currentTarget.style.color = "#C8A962"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E6E1"; e.currentTarget.style.color = "#8C8C7A"; }}
              >
                {copied ? `✓ ${t.copied}` : t.copy}
              </button>
            </div>
          ) : (
            <div style={{ padding: "60px 20px", textAlign: "center", border: "1px dashed #E8E6E1", color: "#8C8C7A" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠</div>
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px" }}>{t.placeholder}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
