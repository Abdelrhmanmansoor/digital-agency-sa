"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

interface CalcInputs {
  costPrice: number;
  salePrice: number;
  shippingCost: number;
  platformFee: number;
  paymentFee: number;
  marketingCost: number;
  taxRate: number;
  monthlyOrders: number;
}

interface CalcResults {
  netProfit: number;
  profitMargin: number;
  breakeven: number;
  monthlyProfit: number;
  totalCostPerUnit: number;
}

export default function ProfitCalculator({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [inputs, setInputs] = useState<CalcInputs>({
    costPrice: 100,
    salePrice: 200,
    shippingCost: 15,
    platformFee: 2.75,
    paymentFee: 2.5,
    marketingCost: 10,
    taxRate: 15,
    monthlyOrders: 50,
  });
  const [results, setResults] = useState<CalcResults | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const platformFeeAmount = inputs.salePrice * (inputs.platformFee / 100);
    const paymentFeeAmount = inputs.salePrice * (inputs.paymentFee / 100);
    const taxAmount = inputs.salePrice * (inputs.taxRate / 100);
    const totalCostPerUnit =
      inputs.costPrice +
      inputs.shippingCost +
      platformFeeAmount +
      paymentFeeAmount +
      inputs.marketingCost;
    const grossProfit = inputs.salePrice - totalCostPerUnit;
    const netProfit = grossProfit - taxAmount;
    const profitMargin = ((netProfit / inputs.salePrice) * 100);
    const breakeven = Math.ceil(totalCostPerUnit / (netProfit > 0 ? netProfit : 1));
    const monthlyProfit = netProfit * inputs.monthlyOrders;

    setResults({ netProfit, profitMargin, breakeven, monthlyProfit, totalCostPerUnit });
  };

  const copyResults = () => {
    if (!results) return;
    const text = isRTL
      ? `نتائج حاسبة الأرباح:\n• صافي الربح: ${results.netProfit.toFixed(2)} ر.س\n• هامش الربح: ${results.profitMargin.toFixed(1)}%\n• نقطة التعادل: ${results.breakeven} وحدة\n• الربح الشهري: ${results.monthlyProfit.toFixed(2)} ر.س`
      : `Profit Calculator Results:\n• Net Profit: ${results.netProfit.toFixed(2)} SAR\n• Profit Margin: ${results.profitMargin.toFixed(1)}%\n• Break Even: ${results.breakeven} units\n• Monthly Profit: ${results.monthlyProfit.toFixed(2)} SAR`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelStyle = {
    display: "block",
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
          <h3
            style={{
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: "#0A0A0A",
              marginBottom: "20px",
            }}
          >
            {isRTL ? "المدخلات" : "Inputs"}
          </h3>

          <div className="space-y-4">
            {[
              { key: "costPrice", labelAr: "تكلفة المنتج (شراء/تصنيع)", labelEn: "Product Cost (Purchase/Manufacturing)", suffix: isRTL ? "ر.س" : "SAR" },
              { key: "salePrice", labelAr: "سعر البيع", labelEn: "Sale Price", suffix: isRTL ? "ر.س" : "SAR" },
              { key: "shippingCost", labelAr: "تكلفة الشحن لكل طلب", labelEn: "Shipping Cost per Order", suffix: isRTL ? "ر.س" : "SAR" },
              { key: "platformFee", labelAr: "عمولة المنصة", labelEn: "Platform Commission", suffix: "%" },
              { key: "paymentFee", labelAr: "عمولة بوابة الدفع", labelEn: "Payment Gateway Fee", suffix: "%" },
              { key: "marketingCost", labelAr: "تكلفة التسويق لكل طلب", labelEn: "Marketing Cost per Order", suffix: isRTL ? "ر.س" : "SAR" },
              { key: "taxRate", labelAr: "ضريبة القيمة المضافة", labelEn: "VAT Rate", suffix: "%" },
              { key: "monthlyOrders", labelAr: "عدد الطلبات الشهرية", labelEn: "Monthly Orders", suffix: "" },
            ].map((field) => (
              <div key={field.key}>
                <label style={labelStyle}>
                  {isRTL ? field.labelAr : field.labelEn}
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    value={inputs[field.key as keyof CalcInputs]}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        [field.key]: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="form-input"
                    style={{
                      paddingLeft: field.suffix && !isRTL ? "48px" : "16px",
                      paddingRight: field.suffix && isRTL ? "48px" : "16px",
                      background: "#FAFAF7",
                      color: "#0A0A0A",
                      border: "1px solid #E8E6E1",
                    }}
                  />
                  {field.suffix && (
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
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={calculate}
            className="btn-primary mt-6"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <span>🧮 {isRTL ? "احسب الأرباح" : "Calculate Profits"}</span>
          </button>
        </div>

        {/* Results */}
        <div>
          <h3
            style={{
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: "#0A0A0A",
              marginBottom: "20px",
            }}
          >
            {isRTL ? "النتائج" : "Results"}
          </h3>

          {results ? (
            <div className="space-y-4">
              {[
                {
                  icon: "💰",
                  labelAr: "صافي الربح لكل منتج",
                  labelEn: "Net Profit per Product",
                  value: `${results.netProfit.toFixed(2)} ${isRTL ? "ر.س" : "SAR"}`,
                  color: results.netProfit > 0 ? "#4A8C6F" : "#C94040",
                },
                {
                  icon: "📊",
                  labelAr: "هامش الربح",
                  labelEn: "Profit Margin",
                  value: `${results.profitMargin.toFixed(1)}%`,
                  color: results.profitMargin > 20 ? "#4A8C6F" : results.profitMargin > 10 ? "#F0B100" : "#C94040",
                },
                {
                  icon: "⚖️",
                  labelAr: "نقطة التعادل",
                  labelEn: "Break-Even Point",
                  value: `${results.breakeven} ${isRTL ? "وحدة" : "units"}`,
                  color: "#0A0A0A",
                },
                {
                  icon: "📅",
                  labelAr: "الربح الشهري المتوقع",
                  labelEn: "Expected Monthly Profit",
                  value: `${results.monthlyProfit.toFixed(2)} ${isRTL ? "ر.س" : "SAR"}`,
                  color: results.monthlyProfit > 0 ? "#4A8C6F" : "#C94040",
                  big: true,
                },
                {
                  icon: "💸",
                  labelAr: "إجمالي التكلفة لكل وحدة",
                  labelEn: "Total Cost per Unit",
                  value: `${results.totalCostPerUnit.toFixed(2)} ${isRTL ? "ر.س" : "SAR"}`,
                  color: "#0A0A0A",
                },
              ].map((item) => (
                <div
                  key={item.labelEn}
                  style={{
                    padding: "20px",
                    background: "#FAFAF7",
                    border: "1px solid #E8E6E1",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={labelStyle}>
                      {isRTL ? item.labelAr : item.labelEn}
                    </div>
                    <div
                      style={{
                        fontFamily: "Space Mono, monospace",
                        fontSize: item.big ? "28px" : "20px",
                        fontWeight: 700,
                        color: item.color,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}

              {/* Profit Indicator */}
              <div
                style={{
                  padding: "16px 20px",
                  background: results.netProfit > 0 ? "rgba(74,140,111,0.1)" : "rgba(201,64,64,0.1)",
                  border: `1px solid ${results.netProfit > 0 ? "rgba(74,140,111,0.3)" : "rgba(201,64,64,0.3)"}`,
                  fontSize: "14px",
                  color: results.netProfit > 0 ? "#4A8C6F" : "#C94040",
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                }}
              >
                {results.netProfit > 0
                  ? (isRTL ? `✓ منتجك مربح! هامش ربح ${results.profitMargin.toFixed(1)}%` : `✓ Your product is profitable! ${results.profitMargin.toFixed(1)}% margin`)
                  : (isRTL ? "✗ تكلفتك أعلى من سعر البيع — راجع أسعارك!" : "✗ Your costs exceed sale price — review your pricing!")}
              </div>

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
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#F0B100"; e.currentTarget.style.color = "#F0B100"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E6E1"; e.currentTarget.style.color = "#8C8C7A"; }}
              >
                {copied ? (isRTL ? "✓ تم النسخ!" : "✓ Copied!") : (isRTL ? "نسخ النتائج" : "Copy Results")}
              </button>
            </div>
          ) : (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                border: "1px dashed #E8E6E1",
                color: "#8C8C7A",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧮</div>
              <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px" }}>
                {isRTL ? "أدخل البيانات واضغط 'احسب الأرباح'" : "Enter data and press 'Calculate Profits'"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
