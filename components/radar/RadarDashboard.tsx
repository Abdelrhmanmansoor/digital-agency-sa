"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { TrackedProduct, AnalysisResult } from "@/lib/radar-db";

interface Props {
  user: { id: string; name: string; email: string; storeName?: string; analysisCount: number };
  locale: string;
}

const CATEGORIES = ["إلكترونيات", "أزياء", "عطور", "مستلزمات منزلية", "رياضة", "مجوهرات", "عناية", "غذاء", "عام"];

export default function RadarDashboard({ user, locale }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<TrackedProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<AnalysisResult | null>(null);
  const [addForm, setAddForm] = useState({
    name: "", category: "عام", userPrice: "", userCost: "", shipping: "25", returnRate: "5",
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  // Manual analyze form (no saved product)
  const [showQuickAnalyze, setShowQuickAnalyze] = useState(false);
  const [quickForm, setQuickForm] = useState({
    name: "", category: "عام", userPrice: "", userCost: "", shipping: "25", returnRate: "5",
  });
  const [quickLoading, setQuickLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoadingProducts(true);
    try {
      const res = await fetch("/api/radar/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    setAddLoading(true);
    setAddError("");
    try {
      const res = await fetch("/api/radar/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addForm,
          userPrice: Number(addForm.userPrice),
          userCost: Number(addForm.userCost),
          shipping: Number(addForm.shipping),
          returnRate: Number(addForm.returnRate),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setAddError(data.error); return; }
      setProducts((p) => [data.product, ...p]);
      setShowAddForm(false);
      setAddForm({ name: "", category: "عام", userPrice: "", userCost: "", shipping: "25", returnRate: "5" });
    } catch {
      setAddError("حدث خطأ في الحفظ");
    } finally {
      setAddLoading(false);
    }
  }

  async function analyzeProduct(product: TrackedProduct) {
    setAnalyzing(product.id);
    setActiveResult(null);
    try {
      const res = await fetch("/api/radar/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          userPrice: product.userPrice,
          userCost: product.userCost,
          shipping: product.shipping,
          returnRate: product.returnRate,
          category: product.category,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setActiveResult(data.result);
        setProducts((prev) =>
          prev.map((p) => p.id === product.id ? { ...p, lastAnalyzedAt: new Date().toISOString() } : p)
        );
      }
    } catch {
      // silently fail
    } finally {
      setAnalyzing(null);
    }
  }

  async function quickAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setQuickLoading(true);
    setActiveResult(null);
    try {
      const res = await fetch("/api/radar/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "manual",
          productName: quickForm.name,
          userPrice: Number(quickForm.userPrice),
          userCost: Number(quickForm.userCost),
          shipping: Number(quickForm.shipping),
          returnRate: Number(quickForm.returnRate),
          category: quickForm.category,
        }),
      });
      const data = await res.json();
      if (res.ok) setActiveResult(data.result);
    } finally {
      setQuickLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    await fetch("/api/radar/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    });
    setProducts((p) => p.filter((x) => x.id !== id));
    if (activeResult?.productId === id) setActiveResult(null);
  }

  async function logout() {
    await fetch("/api/radar/auth/logout", { method: "POST" });
    router.push(`/${locale}/radar`);
    router.refresh();
  }

  const inputSt: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(200,169,98,0.2)", borderRadius: "2px",
    padding: "12px 14px", color: "#FAFAF7", fontSize: "14px",
    fontFamily: "'Zain', sans-serif", outline: "none", direction: "rtl",
  };

  const verdictColor = {
    profitable: "#4ade80",
    marginal: "#facc15",
    loss: "#f87171",
  };

  const verdictLabel = {
    profitable: "مربح",
    marginal: "هامش ضعيف",
    loss: "خسارة",
  };

  const positionLabel = {
    cheap: "أرخص من السوق",
    average: "في المنتصف",
    expensive: "أغلى من السوق",
  };

  const positionColor = {
    cheap: "#4ade80",
    average: "#facc15",
    expensive: "#f87171",
  };

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", direction: "rtl" }}>

      {/* Top Bar */}
      <div style={{
        borderBottom: "1px solid rgba(200,169,98,0.1)",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(20px)",
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "16px", color: "#C8A962", fontWeight: 700, letterSpacing: "0.1em" }}>
            RADAR
          </span>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#4ade80",
            display: "inline-block",
            animation: "pulse 2s infinite",
          }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
            {user.storeName || user.name}
          </span>
          <button
            onClick={logout}
            style={{
              background: "none", border: "1px solid rgba(200,169,98,0.2)",
              color: "rgba(255,255,255,0.4)", padding: "6px 14px",
              fontSize: "12px", fontFamily: "Space Mono, monospace",
              cursor: "pointer", borderRadius: "2px",
              transition: "all 0.2s",
            }}
          >
            خروج
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }} className="stats-grid">
          {[
            { label: "منتجات تتابعها", value: products.length, mono: true },
            { label: "تحليلات أجريتها", value: user.analysisCount, mono: true },
            { label: "متاجر تُراقَب", value: "Amazon · Noon · سلة", mono: false },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(200,169,98,0.1)",
                borderRadius: "2px",
                padding: "20px 24px",
              }}
            >
              <div style={{
                fontSize: stat.mono ? "32px" : "16px",
                fontFamily: stat.mono ? "Space Mono, monospace" : "'Zain', sans-serif",
                color: "#C8A962",
                fontWeight: 700,
                marginBottom: "4px",
              }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowAddForm(!showAddForm); setShowQuickAnalyze(false); }}
            style={{
              background: showAddForm ? "#C8A962" : "rgba(200,169,98,0.1)",
              color: showAddForm ? "#0A0A0A" : "#C8A962",
              border: "1px solid rgba(200,169,98,0.3)",
              padding: "10px 20px", borderRadius: "2px",
              fontFamily: "'Zain', sans-serif", fontSize: "14px",
              cursor: "pointer", fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            + إضافة منتج للمتابعة
          </button>
          <button
            onClick={() => { setShowQuickAnalyze(!showQuickAnalyze); setShowAddForm(false); }}
            style={{
              background: showQuickAnalyze ? "rgba(255,255,255,0.1)" : "transparent",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "10px 20px", borderRadius: "2px",
              fontFamily: "'Zain', sans-serif", fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            تحليل سريع بدون حفظ
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div style={{
            background: "rgba(200,169,98,0.04)",
            border: "1px solid rgba(200,169,98,0.2)",
            borderRadius: "4px",
            padding: "28px",
            marginBottom: "24px",
          }}>
            <h3 style={{ fontFamily: "'Zain', sans-serif", color: "#FAFAF7", fontSize: "18px", marginBottom: "20px" }}>
              إضافة منتج للمتابعة
            </h3>
            <form onSubmit={addProduct}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "12px", marginBottom: "12px" }} className="form-grid">
                <input placeholder="اسم المنتج (كما يبحث عنه العميل)" style={inputSt}
                  value={addForm.name} onChange={(e) => setAddForm(f => ({ ...f, name: e.target.value }))} required />
                <select style={{ ...inputSt, cursor: "pointer" }}
                  value={addForm.category} onChange={(e) => setAddForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input placeholder="سعر البيع (ريال)" type="number" min="0" style={{ ...inputSt, direction: "ltr" }}
                  value={addForm.userPrice} onChange={(e) => setAddForm(f => ({ ...f, userPrice: e.target.value }))} required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }} className="form-grid">
                <input placeholder="تكلفة المنتج (ريال)" type="number" min="0" style={{ ...inputSt, direction: "ltr" }}
                  value={addForm.userCost} onChange={(e) => setAddForm(f => ({ ...f, userCost: e.target.value }))} required />
                <input placeholder="رسوم الشحن (ريال)" type="number" min="0" style={{ ...inputSt, direction: "ltr" }}
                  value={addForm.shipping} onChange={(e) => setAddForm(f => ({ ...f, shipping: e.target.value }))} />
                <input placeholder="نسبة الإرجاع %" type="number" min="0" max="100" style={{ ...inputSt, direction: "ltr" }}
                  value={addForm.returnRate} onChange={(e) => setAddForm(f => ({ ...f, returnRate: e.target.value }))} />
              </div>
              {addError && <div style={{ color: "#f87171", fontSize: "13px", marginBottom: "12px", fontFamily: "'Zain', sans-serif" }}>{addError}</div>}
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" disabled={addLoading} style={{
                  background: "#C8A962", color: "#0A0A0A",
                  border: "none", padding: "10px 24px", borderRadius: "2px",
                  fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700,
                  cursor: addLoading ? "not-allowed" : "pointer", opacity: addLoading ? 0.6 : 1,
                }}>
                  {addLoading ? "جاري الحفظ..." : "حفظ وإضافة"}
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} style={{
                  background: "none", color: "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.1)", padding: "10px 20px", borderRadius: "2px",
                  fontFamily: "'Zain', sans-serif", fontSize: "14px", cursor: "pointer",
                }}>
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Quick Analyze Form */}
        {showQuickAnalyze && (
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4px",
            padding: "28px",
            marginBottom: "24px",
          }}>
            <h3 style={{ fontFamily: "'Zain', sans-serif", color: "#FAFAF7", fontSize: "18px", marginBottom: "20px" }}>
              تحليل سريع
            </h3>
            <form onSubmit={quickAnalyze}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "12px", marginBottom: "12px" }} className="form-grid">
                <input placeholder="اسم المنتج" style={inputSt}
                  value={quickForm.name} onChange={(e) => setQuickForm(f => ({ ...f, name: e.target.value }))} required />
                <select style={{ ...inputSt, cursor: "pointer" }}
                  value={quickForm.category} onChange={(e) => setQuickForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input placeholder="سعر البيع" type="number" min="0" style={{ ...inputSt, direction: "ltr" }}
                  value={quickForm.userPrice} onChange={(e) => setQuickForm(f => ({ ...f, userPrice: e.target.value }))} required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }} className="form-grid">
                <input placeholder="التكلفة" type="number" min="0" style={{ ...inputSt, direction: "ltr" }}
                  value={quickForm.userCost} onChange={(e) => setQuickForm(f => ({ ...f, userCost: e.target.value }))} required />
                <input placeholder="الشحن" type="number" min="0" style={{ ...inputSt, direction: "ltr" }}
                  value={quickForm.shipping} onChange={(e) => setQuickForm(f => ({ ...f, shipping: e.target.value }))} />
                <input placeholder="نسبة الإرجاع %" type="number" min="0" max="100" style={{ ...inputSt, direction: "ltr" }}
                  value={quickForm.returnRate} onChange={(e) => setQuickForm(f => ({ ...f, returnRate: e.target.value }))} />
              </div>
              <button type="submit" disabled={quickLoading} style={{
                background: quickLoading ? "rgba(200,169,98,0.4)" : "#C8A962",
                color: "#0A0A0A", border: "none", padding: "10px 28px", borderRadius: "2px",
                fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700,
                cursor: quickLoading ? "not-allowed" : "pointer",
              }}>
                {quickLoading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span className="spin-dot" />
                    جاري التحليل...
                  </span>
                ) : "تحليل الآن"}
              </button>
            </form>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "24px", alignItems: "start" }} className="main-grid">

          {/* Products List */}
          <div>
            <div style={{
              fontFamily: "Space Mono, monospace", fontSize: "11px",
              letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)",
              marginBottom: "12px",
            }}>
              MONITORED PRODUCTS
            </div>

            {loadingProducts ? (
              <div style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Zain', sans-serif", padding: "20px 0" }}>
                جاري التحميل...
              </div>
            ) : products.length === 0 ? (
              <div style={{
                border: "1px dashed rgba(200,169,98,0.2)", borderRadius: "4px",
                padding: "40px 24px", textAlign: "center",
              }}>
                <div style={{ color: "rgba(200,169,98,0.4)", fontSize: "32px", marginBottom: "12px" }}>◎</div>
                <div style={{ fontFamily: "'Zain', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "15px" }}>
                  لا توجد منتجات بعد
                </div>
                <div style={{ fontFamily: "'Zain', sans-serif", color: "rgba(255,255,255,0.2)", fontSize: "13px", marginTop: "6px" }}>
                  أضف منتجاتك للبدء في المراقبة
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {products.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: activeResult?.productId === p.id
                        ? "rgba(200,169,98,0.06)"
                        : "rgba(255,255,255,0.02)",
                      border: `1px solid ${activeResult?.productId === p.id ? "rgba(200,169,98,0.3)" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: "2px",
                      padding: "16px",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: "'Zain', sans-serif", fontSize: "15px",
                          color: "#FAFAF7", fontWeight: 600,
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                          {p.name}
                        </div>
                        <div style={{ display: "flex", gap: "12px", marginTop: "4px", flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "#C8A962" }}>
                            {p.userPrice}ر
                          </span>
                          <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                            {p.category}
                          </span>
                          {p.lastAnalyzedAt && (
                            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
                              آخر تحليل: {new Date(p.lastAnalyzedAt).toLocaleDateString("ar-SA")}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                        <button
                          onClick={() => analyzeProduct(p)}
                          disabled={analyzing === p.id}
                          style={{
                            background: analyzing === p.id ? "rgba(200,169,98,0.2)" : "rgba(200,169,98,0.15)",
                            color: "#C8A962",
                            border: "1px solid rgba(200,169,98,0.3)",
                            padding: "6px 12px", borderRadius: "2px",
                            fontFamily: "'Zain', sans-serif", fontSize: "12px",
                            cursor: analyzing === p.id ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {analyzing === p.id ? (
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              <span className="spin-dot" />
                              يحلل...
                            </span>
                          ) : "تحليل"}
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          style={{
                            background: "none", color: "rgba(255,255,255,0.2)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            padding: "6px 10px", borderRadius: "2px",
                            cursor: "pointer", fontSize: "12px",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Analysis Result */}
          <div>
            <div style={{
              fontFamily: "Space Mono, monospace", fontSize: "11px",
              letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)",
              marginBottom: "12px",
            }}>
              ANALYSIS RESULT
            </div>

            {(analyzing || quickLoading) ? (
              <div style={{
                background: "rgba(200,169,98,0.03)",
                border: "1px solid rgba(200,169,98,0.15)",
                borderRadius: "4px", padding: "40px 24px", textAlign: "center",
              }}>
                <div className="radar-scan" style={{ margin: "0 auto 16px" }} />
                <div style={{ fontFamily: "'Zain', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "15px", marginBottom: "8px" }}>
                  رادار يفحص السوق...
                </div>
                <div style={{ fontFamily: "'Zain', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
                  يجمع أسعار Amazon · Noon · سلة · زد
                </div>
              </div>
            ) : !activeResult ? (
              <div style={{
                border: "1px dashed rgba(255,255,255,0.06)", borderRadius: "4px",
                padding: "40px 24px", textAlign: "center",
              }}>
                <div style={{ color: "rgba(200,169,98,0.2)", fontSize: "48px", marginBottom: "12px", fontFamily: "Space Mono, monospace" }}>◎</div>
                <div style={{ fontFamily: "'Zain', sans-serif", color: "rgba(255,255,255,0.2)", fontSize: "15px" }}>
                  اختر منتجاً وانقر تحليل
                </div>
              </div>
            ) : (
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(200,169,98,0.15)",
                borderRadius: "4px", overflow: "hidden",
              }}>
                {/* Header */}
                <div style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(200,169,98,0.1)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                    {new Date(activeResult.createdAt).toLocaleString("ar-SA")}
                  </div>
                  <div style={{
                    padding: "4px 12px",
                    background: `${verdictColor[activeResult.profitMetrics.verdict]}15`,
                    border: `1px solid ${verdictColor[activeResult.profitMetrics.verdict]}40`,
                    borderRadius: "2px",
                    color: verdictColor[activeResult.profitMetrics.verdict],
                    fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 700,
                  }}>
                    {verdictLabel[activeResult.profitMetrics.verdict]}
                  </div>
                </div>

                {/* Profit Metrics */}
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0",
                  borderBottom: "1px solid rgba(200,169,98,0.08)",
                }}>
                  {[
                    { label: "الهامش الحقيقي", value: `${activeResult.profitMetrics.trueMargin}ر`, color: activeResult.profitMetrics.trueMargin > 0 ? "#4ade80" : "#f87171" },
                    { label: "ROAS المطلوب", value: `${activeResult.profitMetrics.breakevenRoas}x`, color: activeResult.profitMetrics.breakevenRoas < 4 ? "#4ade80" : activeResult.profitMetrics.breakevenRoas < 7 ? "#facc15" : "#f87171" },
                    { label: "أقصى CPA", value: `${activeResult.profitMetrics.maxCpa}ر`, color: "#C8A962" },
                  ].map((m, i) => (
                    <div
                      key={m.label}
                      style={{
                        padding: "16px",
                        borderRight: i < 2 ? "1px solid rgba(200,169,98,0.08)" : "none",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "20px", color: m.color, fontWeight: 700, marginBottom: "4px" }}>
                        {m.value}
                      </div>
                      <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Market Position */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(200,169,98,0.08)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                      موقعك في السوق
                    </span>
                    <span style={{
                      fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600,
                      color: positionColor[activeResult.userPricePosition],
                    }}>
                      {positionLabel[activeResult.userPricePosition]}
                      {activeResult.userPriceDiff !== 0 && ` (${activeResult.userPriceDiff > 0 ? "+" : ""}${activeResult.userPriceDiff}%)`}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontFamily: "Space Mono, monospace", color: "rgba(255,255,255,0.3)", marginBottom: "6px" }}>
                    <span>أدنى: {activeResult.marketMin}ر</span>
                    <span>متوسط: {activeResult.marketAvg}ر</span>
                    <span>أعلى: {activeResult.marketMax}ر</span>
                  </div>
                </div>

                {/* Competitors Table */}
                {activeResult.competitors.length > 0 && (
                  <div style={{ borderBottom: "1px solid rgba(200,169,98,0.08)" }}>
                    <div style={{ padding: "12px 20px 8px", fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
                      COMPETITORS
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          {["المتجر", "السعر", "الفرق", "رابط"].map((h) => (
                            <th key={h} style={{
                              padding: "8px 20px", textAlign: "right",
                              fontFamily: "'Zain', sans-serif", fontSize: "12px",
                              color: "rgba(255,255,255,0.25)", fontWeight: 400,
                            }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeResult.competitors.slice(0, 6).map((c, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td style={{ padding: "10px 20px", fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "#FAFAF7" }}>
                              {c.store}
                            </td>
                            <td style={{ padding: "10px 20px", fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#C8A962" }}>
                              {c.price}ر
                            </td>
                            <td style={{ padding: "10px 20px", fontFamily: "Space Mono, monospace", fontSize: "12px", color: c.diff < 0 ? "#4ade80" : c.diff > 0 ? "#f87171" : "rgba(255,255,255,0.4)" }}>
                              {c.diff > 0 ? "+" : ""}{c.diff}%
                            </td>
                            <td style={{ padding: "10px 20px" }}>
                              <a
                                href={c.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontFamily: "Space Mono, monospace",
                                  fontSize: "11px",
                                  color: "rgba(200,169,98,0.5)",
                                  textDecoration: "none",
                                  border: "1px solid rgba(200,169,98,0.2)",
                                  padding: "3px 8px",
                                  borderRadius: "2px",
                                  transition: "all 0.2s",
                                }}
                              >
                                ↗
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {activeResult.competitors.length === 0 && (
                      <div style={{ padding: "16px 20px", fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
                        لم يتم العثور على منافسين — يحتاج SERPER_API_KEY في الـ env
                      </div>
                    )}
                  </div>
                )}

                {/* AI Insight */}
                <div style={{ padding: "20px" }}>
                  <div style={{
                    fontFamily: "Space Mono, monospace", fontSize: "10px",
                    letterSpacing: "0.15em", color: "#C8A962",
                    marginBottom: "10px",
                  }}>
                    AI INSIGHT
                  </div>
                  <p style={{
                    fontFamily: "'Zain', sans-serif", fontSize: "15px",
                    color: "rgba(250,250,247,0.7)", lineHeight: 1.8,
                    margin: 0,
                  }}>
                    {activeResult.aiInsight}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-dot {
          display: inline-block;
          width: 10px; height: 10px;
          border: 2px solid rgba(200,169,98,0.3);
          border-top-color: #C8A962;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .radar-scan {
          width: 80px; height: 80px;
          border: 2px solid rgba(200,169,98,0.2);
          border-radius: 50%;
          position: relative;
          overflow: hidden;
        }
        .radar-scan::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 50%; height: 2px;
          background: linear-gradient(90deg, #C8A962, transparent);
          transform-origin: left center;
          animation: radar-sweep 1.5s linear infinite;
        }
        .radar-scan::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 6px; height: 6px;
          background: #C8A962;
          border-radius: 50%;
        }
        @media (max-width: 900px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
