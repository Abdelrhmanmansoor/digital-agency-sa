"use client";

import { Contract } from "@/lib/db";

const TYPE_LABELS: Record<string, string> = {
  "service-agreement": "عقد خدمات",
  maintenance: "عقد صيانة ودعم",
  marketing: "عقد تسويق رقمي",
  custom: "عقد مخصص",
};

const PAYMENT_TERMS_TEXT: Record<string, string> = {
  full: "دفعة واحدة كاملة عند توقيع العقد",
  "50-50": "٥٠٪ مقدماً عند توقيع العقد، و٥٠٪ عند التسليم النهائي",
  custom: "",
};

function fmtDate(s: string) {
  try {
    return new Date(s).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return s;
  }
}

function fmt(n: number) {
  return n.toLocaleString("en-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface Props {
  contract: Contract;
}

export default function ContractPrintView({ contract }: Props) {
  const paymentText =
    contract.paymentTerms === "custom"
      ? contract.paymentNotes || "وفق الاتفاق"
      : PAYMENT_TERMS_TEXT[contract.paymentTerms];

  const contractType = TYPE_LABELS[contract.type] || "عقد خدمات";

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0 !important; padding: 0 !important; background: white !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #contract-print-root { margin: 0 !important; box-shadow: none !important; }
        }
      `}</style>

      <div
        id="contract-print-root"
        style={{
          width: "210mm",
          minHeight: "297mm",
          background: "white",
          position: "relative",
          fontFamily: "'Zain', sans-serif",
          color: "#1a1a1a",
          direction: "rtl",
          boxSizing: "border-box",
          padding: "0",
          overflow: "hidden",
        }}
      >
        {/* Watermark */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-30deg)",
            fontFamily: "'Zain', sans-serif",
            fontSize: "90px",
            fontWeight: 800,
            color: "rgba(200,169,98,0.06)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
            lineHeight: 1,
          }}
        >
          وكالة رقمية
        </div>

        {/* Header */}
        <div
          style={{
            background: "#0A0A0A",
            padding: "28px 40px 24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#C8A962",
                }}
              >
                وكالة رقمية
              </div>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(200,169,98,0.45)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                DIGITAL AGENCY
              </div>
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#FAFAF7",
                }}
              >
                {contractType}
              </div>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "13px",
                  color: "#C8A962",
                  fontWeight: 600,
                }}
              >
                {contract.number}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "32px 48px 40px", position: "relative", zIndex: 1 }}>
          {/* Bismillah */}
          <div
            style={{
              textAlign: "center",
              fontFamily: "'Zain', sans-serif",
              fontSize: "16px",
              color: "#555",
              marginBottom: "20px",
              letterSpacing: "0.04em",
            }}
          >
            بسم الله الرحمن الرحيم
          </div>

          <div
            style={{
              textAlign: "center",
              fontFamily: "'Zain', sans-serif",
              fontSize: "19px",
              fontWeight: 800,
              color: "#0A0A0A",
              marginBottom: "4px",
            }}
          >
            {contractType}
          </div>
          <div
            style={{
              textAlign: "center",
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "#aaa",
              letterSpacing: "0.12em",
              marginBottom: "24px",
            }}
          >
            {contract.number}
          </div>

          {/* Date line */}
          <p
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "14px",
              color: "#555",
              marginBottom: "24px",
              lineHeight: 1.8,
            }}
          >
            عُقد هذا العقد بتاريخ{" "}
            <strong style={{ color: "#0A0A0A" }}>{fmtDate(contract.startDate)}</strong> بين الطرفين الآتيين:
          </p>

          {/* Divider */}
          <div style={{ height: "1px", background: "#e5ded0", marginBottom: "20px" }} />

          {/* Party 1 */}
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "15px",
                fontWeight: 800,
                color: "#C8A962",
                marginBottom: "8px",
              }}
            >
              الطرف الأول (مزود الخدمة)
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "4px 0", color: "#777", width: "130px" }}>الاسم:</td>
                  <td style={{ padding: "4px 0", fontWeight: 600 }}>وكالة رقمية</td>
                  <td style={{ padding: "4px 0", color: "#777", width: "130px", paddingRight: "40px" }}>الموقع الإلكتروني:</td>
                  <td style={{ padding: "4px 0" }}>digitalagency.sa</td>
                </tr>
                <tr>
                  <td style={{ padding: "4px 0", color: "#777" }}>البريد الإلكتروني:</td>
                  <td style={{ padding: "4px 0" }}>info@digitalagency.sa</td>
                  <td style={{ padding: "4px 0", color: "#777", paddingRight: "40px" }}>رقم التواصل:</td>
                  <td style={{ padding: "4px 0", fontFamily: "Space Mono, monospace", fontSize: "12px" }}>+201007835547</td>
                </tr>
                <tr>
                  <td style={{ padding: "4px 0", color: "#777" }}>العنوان:</td>
                  <td colSpan={3} style={{ padding: "4px 0" }}>المملكة العربية السعودية</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Party 2 */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "15px",
                fontWeight: 800,
                color: "#C8A962",
                marginBottom: "8px",
              }}
            >
              الطرف الثاني (العميل)
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "4px 0", color: "#777", width: "130px" }}>الاسم:</td>
                  <td style={{ padding: "4px 0", fontWeight: 600 }}>{contract.clientName}</td>
                  {contract.clientNationalId && (
                    <>
                      <td style={{ padding: "4px 0", color: "#777", width: "130px", paddingRight: "40px" }}>رقم الهوية / الإقامة:</td>
                      <td style={{ padding: "4px 0", fontFamily: "Space Mono, monospace", fontSize: "12px" }}>{contract.clientNationalId}</td>
                    </>
                  )}
                </tr>
                <tr>
                  <td style={{ padding: "4px 0", color: "#777" }}>رقم التواصل:</td>
                  <td style={{ padding: "4px 0", fontFamily: "Space Mono, monospace", fontSize: "12px" }}>{contract.clientPhone}</td>
                  <td style={{ padding: "4px 0", color: "#777", paddingRight: "40px" }}>البريد الإلكتروني:</td>
                  <td style={{ padding: "4px 0" }}>{contract.clientEmail}</td>
                </tr>
                {(contract.clientCompany || contract.clientAddress) && (
                  <tr>
                    {contract.clientCompany && (
                      <>
                        <td style={{ padding: "4px 0", color: "#777" }}>الشركة / المؤسسة:</td>
                        <td style={{ padding: "4px 0" }}>{contract.clientCompany}</td>
                      </>
                    )}
                    {contract.clientAddress && (
                      <>
                        <td style={{ padding: "4px 0", color: "#777", paddingRight: "40px" }}>العنوان:</td>
                        <td style={{ padding: "4px 0" }}>{contract.clientAddress}</td>
                      </>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ height: "1px", background: "#e5ded0", marginBottom: "22px" }} />

          {/* Articles */}
          {[
            {
              title: "المادة الأولى: موضوع العقد",
              content: (
                <>
                  <p style={{ margin: "0 0 8px" }}>
                    يلتزم الطرف الأول بتقديم خدمة:{" "}
                    <strong>{contract.serviceTitleAr || contract.serviceTitle}</strong>
                  </p>
                  <p style={{ margin: 0, color: "#555" }}>{contract.serviceDescriptionAr || contract.serviceDescription}</p>
                </>
              ),
            },
            {
              title: "المادة الثانية: قيمة العقد ومواعيد الدفع",
              content: (
                <>
                  <p style={{ margin: "0 0 6px" }}>
                    الأتعاب الإجمالية:{" "}
                    <strong style={{ fontFamily: "Space Mono, monospace", color: "#C8A962" }}>
                      {fmt(contract.totalAmount)} ريال سعودي
                    </strong>
                  </p>
                  <p style={{ margin: 0, color: "#555" }}>طريقة الدفع: {paymentText}</p>
                  {contract.paymentTerms === "custom" && contract.paymentNotes && (
                    <p style={{ margin: "4px 0 0", color: "#555" }}>{contract.paymentNotes}</p>
                  )}
                </>
              ),
            },
            {
              title: "المادة الثالثة: مدة التنفيذ",
              content: (
                <p style={{ margin: 0 }}>
                  يلتزم الطرف الأول بإنجاز العمل خلال{" "}
                  <strong>{contract.deliveryDays} يوم عمل</strong> من تاريخ استلام الدفعة الأولى وتوقيع هذا العقد.
                </p>
              ),
            },
            {
              title: "المادة الرابعة: التسليمات",
              content: (
                <>
                  <p style={{ margin: "0 0 8px" }}>يشمل هذا العقد تسليم ما يلي:</p>
                  <ul style={{ margin: 0, paddingRight: "20px", color: "#555" }}>
                    {contract.deliverables.map((d, i) => (
                      <li key={i} style={{ marginBottom: "4px" }}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              title: "المادة الخامسة: حقوق الملكية الفكرية",
              content: (
                <p style={{ margin: 0, color: "#555" }}>
                  تنتقل جميع حقوق الملكية الفكرية للعمل المنجز بموجب هذا العقد إلى الطرف الثاني بعد سداد كامل المستحقات المالية المتفق عليها.
                </p>
              ),
            },
            {
              title: "المادة السادسة: المراجعات والتعديلات",
              content: (
                <p style={{ margin: 0, color: "#555" }}>
                  يحق للطرف الثاني طلب مراجعتين (٢) مجانيتين على العمل المسلّم ضمن نطاق الاتفاق الأصلي. أي تعديلات خارج النطاق أو مراجعات إضافية تستوجب اتفاقاً مالياً منفصلاً.
                </p>
              ),
            },
            {
              title: "المادة السابعة: السرية والخصوصية",
              content: (
                <p style={{ margin: 0, color: "#555" }}>
                  يلتزم كلا الطرفين بالحفاظ التام على سرية المعلومات التبادلية وعدم الإفصاح عنها لأي طرف ثالث إلا بموافقة خطية مسبقة من الطرف الآخر.
                </p>
              ),
            },
            {
              title: "المادة الثامنة: إنهاء العقد",
              content: (
                <p style={{ margin: 0, color: "#555" }}>
                  يحق لأي من الطرفين إنهاء هذا العقد بإشعار كتابي مدته سبعة (٧) أيام، مع الالتزام بتسوية كافة المستحقات المالية عن العمل المنجز حتى تاريخ الإنهاء.
                </p>
              ),
            },
            {
              title: "المادة التاسعة: القوة القاهرة",
              content: (
                <p style={{ margin: 0, color: "#555" }}>
                  لا يُعدّ أي من الطرفين مسؤولاً عن أي تأخير أو إخلال بالتزاماته الناجم عن أسباب خارجة عن إرادته كالكوارث الطبيعية أو قرارات السلطات الحكومية أو أي قوة قاهرة أخرى.
                </p>
              ),
            },
            {
              title: "المادة العاشرة: تسوية النزاعات والاختصاص القضائي",
              content: (
                <p style={{ margin: 0, color: "#555" }}>
                  في حالة نشوء أي نزاع بين الطرفين بشأن هذا العقد، يُسعى أولاً إلى حله بالتفاوض الودّي. وفي حال تعذّر ذلك، تختص المحاكم السعودية في مدينة{" "}
                  <strong style={{ color: "#0A0A0A" }}>{contract.jurisdiction}</strong> بالنظر في أي دعاوى قضائية وفق الأنظمة والتشريعات المعمول بها في المملكة العربية السعودية.
                </p>
              ),
            },
          ].map((article, i) => (
            <div key={i} style={{ marginBottom: "18px" }}>
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "#0A0A0A",
                  marginBottom: "6px",
                  borderRight: "3px solid #C8A962",
                  paddingRight: "10px",
                }}
              >
                {article.title}
              </div>
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.9,
                  paddingRight: "13px",
                }}
              >
                {article.content}
              </div>
            </div>
          ))}

          {/* Signatures */}
          <div
            style={{
              marginTop: "36px",
              borderTop: "2px solid #C8A962",
              paddingTop: "24px",
            }}
          >
            <div
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "15px",
                fontWeight: 800,
                color: "#0A0A0A",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              التوقيعات
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "40px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Zain', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#C8A962",
                    marginBottom: "12px",
                  }}
                >
                  الطرف الأول — وكالة رقمية
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #ccc",
                    height: "40px",
                    marginBottom: "8px",
                  }}
                />
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "#999" }}>
                  التوقيع
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #ccc",
                    height: "32px",
                    marginBottom: "8px",
                    marginTop: "16px",
                  }}
                />
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "#999" }}>
                  التاريخ
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Zain', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#C8A962",
                    marginBottom: "12px",
                  }}
                >
                  الطرف الثاني — {contract.clientName}
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #ccc",
                    height: "40px",
                    marginBottom: "8px",
                  }}
                />
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "#999" }}>
                  التوقيع
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #ccc",
                    height: "32px",
                    marginBottom: "8px",
                    marginTop: "16px",
                  }}
                />
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "#999" }}>
                  التاريخ
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #eee",
              paddingTop: "12px",
            }}
          >
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "10px",
                color: "#aaa",
              }}
            >
              وكالة رقمية · +201007835547 · info@digitalagency.sa
            </div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "10px",
                color: "#C8A962",
              }}
            >
              {contract.number}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
