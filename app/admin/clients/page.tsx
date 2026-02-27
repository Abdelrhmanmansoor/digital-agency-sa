"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Invoice {
  id: string; number: string; clientName: string; clientEmail: string;
  clientPhone: string; clientCompany?: string; total: number;
  status: string; issueDate: string; createdAt: string;
}
interface Contract {
  id: string; number: string; clientName: string; clientEmail: string;
  clientPhone: string; clientCompany?: string; totalAmount: number;
  status: string; type: string; createdAt: string;
}
interface ClientGroup {
  key: string;
  name: string; email: string; phone: string; company?: string;
  invoices: Invoice[]; contracts: Contract[];
  totalPaid: number; lastActivity: string;
}

const STATUS_COLOR: Record<string, string> = {
  paid: "#28CA41", draft: "#AAA", sent: "#C8A962", cancelled: "#C94040",
  active: "#28CA41", completed: "#4A9EFF", terminated: "#C94040",
  "service-agreement": "#C8A962", maintenance: "#4A9EFF",
  marketing: "#BDEE63", custom: "#AAA",
};
const STATUS_LABEL: Record<string, string> = {
  paid: "مدفوعة", draft: "مسودة", sent: "مرسلة", cancelled: "ملغاة",
  active: "نشط", completed: "مكتمل", terminated: "منتهي",
  "service-agreement": "اتفاقية خدمة", maintenance: "صيانة",
  marketing: "تسويق", custom: "مخصص",
};

function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" });
}
function fmtAmt(n: number) {
  return new Intl.NumberFormat("ar-SA").format(n);
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientGroup[]>([]);
  const [selected, setSelected] = useState<ClientGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  useEffect(() => {
    async function load() {
      const [invRes, ctrRes] = await Promise.all([
        fetch("/api/admin/invoices"),
        fetch("/api/admin/contracts"),
      ]);
      if (invRes.status === 401 || ctrRes.status === 401) {
        router.push("/admin");
        return;
      }
      const invoices: Invoice[] = await invRes.json();
      const contracts: Contract[] = await ctrRes.json();

      const map = new Map<string, ClientGroup>();

      for (const inv of invoices) {
        const key = (inv.clientEmail || inv.clientName || "unknown").toLowerCase().trim();
        if (!map.has(key)) {
          map.set(key, { key, name: inv.clientName, email: inv.clientEmail, phone: inv.clientPhone, company: inv.clientCompany, invoices: [], contracts: [], totalPaid: 0, lastActivity: inv.createdAt || "" });
        }
        const g = map.get(key)!;
        g.invoices.push(inv);
        if (inv.status === "paid") g.totalPaid += inv.total || 0;
        if ((inv.createdAt || "") > g.lastActivity) g.lastActivity = inv.createdAt || "";
      }

      for (const ctr of contracts) {
        const key = (ctr.clientEmail || ctr.clientName || "unknown").toLowerCase().trim();
        if (!map.has(key)) {
          map.set(key, { key, name: ctr.clientName, email: ctr.clientEmail, phone: ctr.clientPhone, company: ctr.clientCompany, invoices: [], contracts: [], totalPaid: 0, lastActivity: ctr.createdAt || "" });
        }
        const g = map.get(key)!;
        g.contracts.push(ctr);
        if ((ctr.createdAt || "") > g.lastActivity) g.lastActivity = ctr.createdAt || "";
      }

      const sorted = [...map.values()].sort((a, b) => b.lastActivity.localeCompare(a.lastActivity));
      setClients(sorted);
      if (sorted.length > 0) setSelected(sorted[0]);
      setLoading(false);
    }
    load();
  }, [router]);

  const filtered = clients.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.company?.toLowerCase().includes(search.toLowerCase())
  );

  function selectClient(client: ClientGroup) {
    setSelected(client);
    setMobileView("detail");
  }

  return (
    <div className="admin-layout">
      <style>{`
        .clients-header {
          padding: 28px 40px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .clients-body {
          display: grid;
          grid-template-columns: 300px 1fr;
          height: calc(100vh - 110px);
          overflow: hidden;
        }
        .clients-list-col {
          border-left: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .clients-detail-col {
          overflow-y: auto;
          padding: 24px 32px;
        }
        .clients-summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 32px;
        }
        .clients-back-btn {
          display: none;
        }
        .inv-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          transition: all 0.15s;
          gap: 8px;
        }
        .inv-row-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .inv-row-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .clients-header {
            padding: 18px 16px 14px;
          }
          .clients-body {
            display: block;
            height: auto;
            min-height: calc(100vh - 90px);
            overflow: visible;
          }
          .clients-list-col {
            border-left: none;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            height: auto;
            max-height: 100vh;
            overflow: hidden;
          }
          .clients-list-col.mobile-hidden {
            display: none;
          }
          .clients-detail-col {
            padding: 16px;
            height: auto;
            overflow: visible;
          }
          .clients-detail-col.mobile-hidden {
            display: none;
          }
          .clients-summary-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-bottom: 24px;
          }
          .clients-back-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: #FAFAF7;
            font-family: 'Zain', sans-serif;
            font-size: 14px;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            margin-bottom: 20px;
          }
          .inv-row {
            flex-wrap: wrap;
            gap: 6px;
          }
          .inv-row-left {
            flex: 1;
          }
          .inv-row-right {
            width: 100%;
            justify-content: space-between;
          }
          .cta-buttons {
            width: 100%;
            justify-content: stretch !important;
          }
          .cta-buttons a {
            flex: 1;
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .clients-summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <AdminSidebar />
      <main className="admin-main" dir="rtl">
        <div className="clients-header">
          <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "24px", fontWeight: 800, color: "#FAFAF7", marginBottom: "2px" }}>
            داشبورد العملاء
          </h1>
          <p style={{ color: "#8C8C7A", fontSize: "13px" }}>
            كل فواتير وعقود كل عميل في مكان واحد
          </p>
        </div>

        <div className="clients-body">

          {/* ── Left: Clients list ── */}
          <div className={`clients-list-col${mobileView === "detail" ? " mobile-hidden" : ""}`}>
            {/* Search */}
            <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <input
                type="text"
                placeholder="ابحث عن عميل..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "9px 14px", background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px",
                  color: "#FAFAF7", fontSize: "14px", fontFamily: "'Zain', sans-serif",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", padding: "10px 16px", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              {[
                { label: "العملاء", value: clients.length },
                { label: "الفواتير", value: clients.reduce((s, c) => s + c.invoices.length, 0) },
                { label: "العقود", value: clients.reduce((s, c) => s + c.contracts.length, 0) },
              ].map(({ label, value }) => (
                <div key={label} style={{ flex: 1, textAlign: "center", background: "rgba(200,169,98,0.06)", borderRadius: "8px", padding: "7px 4px" }}>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "16px", fontWeight: 700, color: "#C8A962" }}>{value}</div>
                  <div style={{ fontSize: "11px", color: "#8C8C7A" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {loading ? (
                <div style={{ padding: "40px 20px", textAlign: "center", color: "#8C8C7A", fontFamily: "'Zain', sans-serif" }}>جاري التحميل...</div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center", color: "#8C8C7A", fontFamily: "'Zain', sans-serif" }}>لا يوجد عملاء</div>
              ) : (
                filtered.map(client => {
                  const isSelected = selected?.key === client.key;
                  return (
                    <div
                      key={client.key}
                      onClick={() => selectClient(client)}
                      style={{
                        padding: "12px 16px",
                        cursor: "pointer",
                        background: isSelected ? "rgba(200,169,98,0.08)" : "transparent",
                        borderRight: isSelected ? "3px solid #C8A962" : "3px solid transparent",
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
                          background: isSelected ? "rgba(200,169,98,0.15)" : "rgba(255,255,255,0.06)",
                          border: `1px solid ${isSelected ? "rgba(200,169,98,0.3)" : "rgba(255,255,255,0.08)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Zain', sans-serif", fontSize: "15px", fontWeight: 700,
                          color: isSelected ? "#C8A962" : "#8C8C7A",
                        }}>
                          {(client.name || "?")[0]}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 600, color: isSelected ? "#FAFAF7" : "#CCC", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {client.name}
                          </div>
                          <div style={{ fontSize: "11px", color: "#8C8C7A", fontFamily: "Space Mono, monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {client.email}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "6px", marginTop: "7px", flexWrap: "wrap" }}>
                        {client.invoices.length > 0 && (
                          <span style={{ padding: "2px 8px", borderRadius: "100px", background: "rgba(200,169,98,0.1)", color: "#C8A962", fontSize: "10px", fontFamily: "Space Mono, monospace" }}>
                            {client.invoices.length} فاتورة
                          </span>
                        )}
                        {client.contracts.length > 0 && (
                          <span style={{ padding: "2px 8px", borderRadius: "100px", background: "rgba(74,158,255,0.1)", color: "#4A9EFF", fontSize: "10px", fontFamily: "Space Mono, monospace" }}>
                            {client.contracts.length} عقد
                          </span>
                        )}
                        {client.totalPaid > 0 && (
                          <span style={{ padding: "2px 8px", borderRadius: "100px", background: "rgba(40,202,65,0.1)", color: "#28CA41", fontSize: "10px", fontFamily: "Space Mono, monospace" }}>
                            {fmtAmt(client.totalPaid)} ﷼
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ── Right: Client detail ── */}
          <div className={`clients-detail-col${mobileView === "list" ? " mobile-hidden" : ""}`}>
            {!selected ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "300px", color: "#8C8C7A" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ marginBottom: "16px", opacity: 0.3 }}>
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px" }}>اختر عميلاً لعرض تفاصيله</p>
              </div>
            ) : (
              <>
                {/* Mobile back button */}
                <button
                  className="clients-back-btn"
                  onClick={() => { setMobileView("list"); }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  رجوع للقائمة
                </button>

                {/* Client header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: "50px", height: "50px", borderRadius: "50%", flexShrink: 0,
                      background: "rgba(200,169,98,0.12)", border: "1px solid rgba(200,169,98,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Zain', sans-serif", fontSize: "20px", fontWeight: 800, color: "#C8A962",
                    }}>
                      {(selected.name || "?")[0]}
                    </div>
                    <div>
                      <h2 style={{ fontFamily: "'Zain', sans-serif", fontSize: "20px", fontWeight: 800, color: "#FAFAF7", marginBottom: "3px" }}>
                        {selected.name}
                      </h2>
                      {selected.company && <div style={{ color: "#C8A962", fontSize: "13px", marginBottom: "2px", fontFamily: "'Zain', sans-serif" }}>{selected.company}</div>}
                      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        <span style={{ color: "#8C8C7A", fontSize: "11px", fontFamily: "Space Mono, monospace" }}>{selected.email}</span>
                        <span style={{ color: "#8C8C7A", fontSize: "11px", fontFamily: "Space Mono, monospace" }}>{selected.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="cta-buttons" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <Link
                      href={`/admin/invoices/new?client=${encodeURIComponent(selected.name)}&email=${encodeURIComponent(selected.email || "")}&phone=${encodeURIComponent(selected.phone || "")}`}
                      style={{
                        padding: "8px 16px", borderRadius: "8px", textDecoration: "none",
                        background: "rgba(200,169,98,0.1)", border: "1px solid rgba(200,169,98,0.25)",
                        color: "#C8A962", fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600,
                        display: "inline-block", whiteSpace: "nowrap",
                      }}
                    >
                      + فاتورة جديدة
                    </Link>
                    <Link
                      href={`/admin/contracts/new?client=${encodeURIComponent(selected.name)}&email=${encodeURIComponent(selected.email || "")}&phone=${encodeURIComponent(selected.phone || "")}`}
                      style={{
                        padding: "8px 16px", borderRadius: "8px", textDecoration: "none",
                        background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.2)",
                        color: "#4A9EFF", fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600,
                        display: "inline-block", whiteSpace: "nowrap",
                      }}
                    >
                      + عقد جديد
                    </Link>
                    {selected.phone && (
                      <a
                        href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                          padding: "8px 16px", borderRadius: "8px", textDecoration: "none",
                          background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)",
                          color: "#25D366", fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600,
                          display: "inline-block", whiteSpace: "nowrap",
                        }}
                      >
                        واتساب
                      </a>
                    )}
                  </div>
                </div>

                {/* Summary cards */}
                <div className="clients-summary-grid">
                  {[
                    { label: "الفواتير", value: selected.invoices.length, color: "#C8A962" },
                    { label: "العقود", value: selected.contracts.length, color: "#4A9EFF" },
                    { label: "مدفوع", value: `${fmtAmt(selected.totalPaid)} ﷼`, color: "#28CA41" },
                    { label: "آخر نشاط", value: fmtDate(selected.lastActivity), color: "#8C8C7A" },
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{
                      padding: "14px 16px", background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px",
                    }}>
                      <div style={{ fontSize: "10px", color: "#8C8C7A", marginBottom: "5px", fontFamily: "Space Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "16px", fontWeight: 700, color, wordBreak: "break-all" }}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* Invoices */}
                {selected.invoices.length > 0 && (
                  <div style={{ marginBottom: "28px" }}>
                    <h3 style={{ fontFamily: "'Zain', sans-serif", fontSize: "17px", fontWeight: 700, color: "#C8A962", marginBottom: "12px" }}>
                      الفواتير ({selected.invoices.length})
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {selected.invoices.map(inv => (
                        <Link key={inv.id} href={`/admin/invoices/${inv.id}`} style={{ textDecoration: "none" }}>
                          <div
                            className="inv-row"
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,169,98,0.06)"; e.currentTarget.style.borderColor = "rgba(200,169,98,0.2)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                          >
                            <div className="inv-row-left">
                              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "#C8A962", fontWeight: 700, flexShrink: 0 }}>{inv.number}</div>
                              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "#AAA" }}>{fmtDate(inv.issueDate)}</div>
                            </div>
                            <div className="inv-row-right">
                              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", fontWeight: 700, color: "#FAFAF7" }}>
                                {fmtAmt(inv.total)} ﷼
                              </div>
                              <span style={{
                                padding: "3px 10px", borderRadius: "100px", fontSize: "11px",
                                background: `${STATUS_COLOR[inv.status] || "#AAA"}18`,
                                color: STATUS_COLOR[inv.status] || "#AAA",
                                fontFamily: "'Zain', sans-serif", whiteSpace: "nowrap",
                              }}>
                                {STATUS_LABEL[inv.status] || inv.status}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contracts */}
                {selected.contracts.length > 0 && (
                  <div style={{ marginBottom: "16px" }}>
                    <h3 style={{ fontFamily: "'Zain', sans-serif", fontSize: "17px", fontWeight: 700, color: "#4A9EFF", marginBottom: "12px" }}>
                      العقود ({selected.contracts.length})
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {selected.contracts.map(ctr => (
                        <Link key={ctr.id} href={`/admin/contracts/${ctr.id}`} style={{ textDecoration: "none" }}>
                          <div
                            className="inv-row"
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,158,255,0.06)"; e.currentTarget.style.borderColor = "rgba(74,158,255,0.2)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                          >
                            <div className="inv-row-left">
                              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "#4A9EFF", fontWeight: 700, flexShrink: 0 }}>{ctr.number}</div>
                              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "#C8A962" }}>
                                {STATUS_LABEL[ctr.type] || ctr.type}
                              </div>
                            </div>
                            <div className="inv-row-right">
                              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", fontWeight: 700, color: "#FAFAF7" }}>
                                {fmtAmt(ctr.totalAmount)} ﷼
                              </div>
                              <span style={{
                                padding: "3px 10px", borderRadius: "100px", fontSize: "11px",
                                background: `${STATUS_COLOR[ctr.status] || "#AAA"}18`,
                                color: STATUS_COLOR[ctr.status] || "#AAA",
                                fontFamily: "'Zain', sans-serif", whiteSpace: "nowrap",
                              }}>
                                {STATUS_LABEL[ctr.status] || ctr.status}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {selected.invoices.length === 0 && selected.contracts.length === 0 && (
                  <div style={{ textAlign: "center", padding: "50px 20px", color: "#8C8C7A", fontFamily: "'Zain', sans-serif", fontSize: "16px" }}>
                    لا يوجد فواتير أو عقود لهذا العميل بعد
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
