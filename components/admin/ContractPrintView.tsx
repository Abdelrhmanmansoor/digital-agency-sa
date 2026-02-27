"use client";

import { Contract } from "@/lib/db";

/* ── helpers ─────────────────────────────────────────────────────────────── */
function fmt(n: number) {
  return n.toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(s: string) {
  try { return new Date(s).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" }); }
  catch { return s; }
}
function addDays(dateStr: string, days: number) {
  try {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
  } catch { return "—"; }
}

const TYPE_LABELS: Record<string, string> = {
  "service-agreement": "عقد تقديم خدمات",
  maintenance: "عقد صيانة ودعم تقني",
  marketing: "عقد تسويق رقمي",
  custom: "عقد أعمال مخصص",
};

interface Props { contract: Contract }

/* ── Info row inside the parties table ──────────────────────────────────── */
function InfoRow({ label, value }: { label: string; value?: string | number }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "5px", alignItems: "flex-start" }}>
      <span style={{
        fontFamily: "Space Mono, monospace", fontSize: "8px", color: "#999",
        letterSpacing: "0.08em", whiteSpace: "nowrap", paddingTop: "3px", minWidth: "96px",
      }}>
        {label}
      </span>
      <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600, color: "#111", flex: 1 }}>
        {value}
      </span>
    </div>
  );
}

/* ── Article block ───────────────────────────────────────────────────────── */
function Article({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "16px", pageBreakInside: "avoid" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "6px" }}>
        <div style={{
          width: "24px", height: "24px", borderRadius: "50%",
          background: "#C8A962", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "8px", fontWeight: 700, color: "#0A0A0A" }}>{num}</span>
        </div>
        <div style={{
          fontFamily: "'Zain', sans-serif", fontSize: "13.5px", fontWeight: 800, color: "#0A0A0A",
          borderBottom: "1px solid #E8E0CE", paddingBottom: "3px", flex: 1,
        }}>
          {title}
        </div>
      </div>
      <div style={{
        paddingRight: "33px", fontFamily: "'Zain', sans-serif",
        fontSize: "13px", color: "#2a2a2a", lineHeight: 2, textAlign: "justify",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════ */
export default function ContractPrintView({ contract: c }: Props) {
  const contractType = TYPE_LABELS[c.type] ?? "عقد خدمات";
  const endDate = addDays(c.startDate, c.deliveryDays);

  const providerDisplayName =
    c.providerEntityName ?? c.providerFullName ?? "الطرف الأول";

  /* Payment body text */
  const fmt2 = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const paymentBody =
    c.paymentTerms === "full"
      ? `يُسدَّد المبلغ الإجمالي كاملاً وقدره (${fmt2(c.totalAmount)}) ريال سعودي دفعةً واحدةً عند توقيع هذا العقد.`
      : c.paymentTerms === "50-50"
      ? `يُسدَّد المبلغ الإجمالي وقدره (${fmt2(c.totalAmount)}) ريال سعودي على دفعتين متساويتين: الأولى (${fmt2(c.totalAmount / 2)}) ريال عند توقيع العقد، والثانية (${fmt2(c.totalAmount / 2)}) ريال عند التسليم النهائي واعتماد جميع المخرجات.`
      : c.paymentTerms === "3-installments"
      ? `يُسدَّد المبلغ الإجمالي وقدره (${fmt2(c.totalAmount)}) ريال سعودي على ثلاث دفعات متساوية: الأولى (${fmt2(c.totalAmount / 3)}) ريال عند توقيع العقد، والثانية عند اعتماد النموذج الأولي، والثالثة (${fmt2(c.totalAmount / 3)}) ريال عند التسليم النهائي.`
      : c.paymentNotes ?? "وفق ما يتفق عليه الطرفان كتابةً.";

  const articleCount = (c.penaltyPerDay ?? 0) > 0 ? 12 : 11;
  const lastArticleNum = articleCount === 12 ? "١٢" : "١١";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body { margin: 0 !important; padding: 0 !important; background: white !important; }
          .no-print { display: none !important; }
          .admin-sidebar, nav, aside { display: none !important; }
          .admin-main { margin: 0 !important; padding: 0 !important; background: white !important; min-height: unset !important; }
          #contract-print-root { width: 210mm !important; margin: 0 auto !important; box-shadow: none !important; border-radius: 0 !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
        }
      ` }} />

      <div
        id="contract-print-root"
        style={{
          width: "210mm", minHeight: "297mm", background: "white",
          position: "relative", fontFamily: "'Zain', sans-serif",
          color: "#1a1a1a", direction: "rtl", boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Logo watermark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" aria-hidden style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%) rotate(-22deg)",
          width: "60%", maxWidth: "390px", opacity: 0.05,
          pointerEvents: "none", userSelect: "none", zIndex: 0,
          filter: "sepia(1) saturate(0.4)",
        }} />

        {/* ══ HEADER ══ */}
        <div style={{ background: "#0A0A0A", padding: "20px 40px 16px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" style={{ height: "36px", objectFit: "contain", maxWidth: "140px", filter: "brightness(0) invert(1)" }} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 700, color: "#C8A962" }}>{contractType}</div>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(200,169,98,0.55)", letterSpacing: "0.1em" }}>{c.number}</div>
            </div>
          </div>
        </div>
        <div style={{ height: "3px", background: "linear-gradient(90deg, #9A7B3E, #C8A962, #E8C97A, #C8A962, #9A7B3E)" }} />

        {/* ══ BODY ══ */}
        <div style={{ padding: "24px 40px 28px", position: "relative", zIndex: 1 }}>

          {/* Basmalah */}
          <div style={{ textAlign: "center", marginBottom: "5px" }}>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px", fontWeight: 800, color: "#C8A962" }}>
              بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
            </span>
          </div>

          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: "3px" }}>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "19px", fontWeight: 800, color: "#0A0A0A" }}>
              {contractType}
            </div>
          </div>

          {/* Sub info */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "#888", letterSpacing: "0.1em" }}>{c.number}</span>
            <span style={{ margin: "0 8px", color: "#DDD" }}>·</span>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "#666" }}>
              تاريخ التحرير: {fmtDate(c.startDate)} · مدينة {c.jurisdiction}
            </span>
          </div>

          {/* ══ PARTIES TABLE ══ */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            border: "1px solid #E0D8CC", borderRadius: "8px", overflow: "hidden",
            marginBottom: "20px",
          }}>
            {/* Column headers */}
            <div style={{ background: "#0A0A0A", padding: "8px 16px", borderLeft: "1px solid #1E1E1E" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#C8A962", letterSpacing: "0.2em" }}>الطرف الأول — مقدم الخدمة</div>
            </div>
            <div style={{ background: "#0A0A0A", padding: "8px 16px" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#C8A962", letterSpacing: "0.2em" }}>الطرف الثاني — العميل</div>
            </div>

            {/* First Party data */}
            <div style={{ padding: "14px 16px", borderLeft: "1px solid #EEE", borderTop: "1px solid #EEE", background: "#FAFAF8" }}>
              {c.providerType === "institution" && (
                <>
                  <InfoRow label="اسم المؤسسة" value={c.providerEntityName} />
                  <InfoRow label="المالك / الممثل" value={c.providerOwnerName} />
                  <InfoRow label="السجل التجاري" value={c.providerCR} />
                  <InfoRow label="رقم ضريبة ق.م" value={c.providerVAT} />
                </>
              )}
              {(c.providerType === "individual-saudi" || !c.providerType) && (
                <>
                  <InfoRow label="الاسم الكامل" value={c.providerFullName ?? c.providerEntityName} />
                  <InfoRow label="رقم الهوية" value={c.providerNationalId} />
                  <InfoRow label="وثيقة العمل الحر" value={c.providerFreelanceDoc} />
                  <InfoRow label="رقم ضريبة ق.م" value={c.providerVAT} />
                  <InfoRow label="المهنة" value={c.providerProfession} />
                </>
              )}
              {c.providerType === "individual-expat" && (
                <>
                  <InfoRow label="الاسم الكامل" value={c.providerFullName} />
                  <InfoRow label="رقم الإقامة" value={c.providerIqama} />
                  <InfoRow label="انتهاء الإقامة" value={c.providerIqamaExpiry ? fmtDate(c.providerIqamaExpiry) : undefined} />
                  <InfoRow label="السجل التجاري" value={c.providerCR} />
                  <InfoRow label="رقم ضريبة ق.م" value={c.providerVAT} />
                </>
              )}
              <InfoRow label="الجوال" value={c.providerPhone} />
              <InfoRow label="البريد الإلكتروني" value={c.providerEmail} />
              <InfoRow label="العنوان" value={[c.providerAddress, c.providerCity].filter(Boolean).join("، ")} />
            </div>

            {/* Second Party data */}
            <div style={{ padding: "14px 16px", borderTop: "1px solid #EEE", background: "#FAFAF8" }}>
              {c.clientType === "institution" ? (
                <>
                  <InfoRow label="اسم المؤسسة" value={c.clientCompany ?? c.clientName} />
                  <InfoRow label="الممثل القانوني" value={c.clientName} />
                  <InfoRow label="السجل التجاري" value={c.clientCR} />
                  <InfoRow label="رقم ضريبة ق.م" value={c.clientVAT} />
                </>
              ) : (
                <>
                  <InfoRow label="الاسم الكامل" value={c.clientName} />
                  <InfoRow label="رقم الهوية" value={c.clientNationalId} />
                  <InfoRow label="رقم الإقامة" value={c.clientIqama} />
                  <InfoRow label="الشركة" value={c.clientCompany} />
                </>
              )}
              <InfoRow label="الجوال" value={c.clientPhone} />
              <InfoRow label="البريد الإلكتروني" value={c.clientEmail} />
              <InfoRow label="العنوان" value={c.clientAddress} />
            </div>
          </div>

          {/* ══ ARTICLES ══ */}
          <Article num="١" title="موضوع العقد ونطاق الخدمات">
            اتفق الطرفان على قيام الطرف الأول بتقديم خدمة: <strong>{c.serviceTitleAr}</strong>
            {c.serviceDescriptionAr && <>، وتشمل: {c.serviceDescriptionAr}</>}.
            {c.serviceDescription && (
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "#AAA", marginTop: "3px", direction: "ltr", textAlign: "left" }}>
                {c.serviceDescription}
              </div>
            )}
            {" يلتزم الطرف الأول بأداء الخدمة المتفق عليها بكفاءة واحترافية وفقاً لأعلى معايير الجودة المهنية المعمول بها في المجال."}
          </Article>

          <Article num="٢" title="قيمة العقد وشروط الدفع">
            {paymentBody}
            {" يُنفَّذ السداد عبر التحويل المصرفي أو الوسيلة المتفق عليها كتابةً. "}
            {c.providerVAT
              ? "تُضاف ضريبة القيمة المضافة (١٥٪) وفقاً لأنظمة هيئة الزكاة والضريبة والجمارك."
              : "المبلغ المذكور شامل لجميع الرسوم ولا تُضاف عليه ضرائب إضافية."}
            {" لا يُستحق أي التزام بفائدة ربوية على التأخير في السداد، وتُنظَّم حالات التأخير وفق المادة المختصة من هذا العقد."}
          </Article>

          <Article num="٣" title="مدة التنفيذ والجدول الزمني">
            {`يلتزم الطرف الأول بإنجاز جميع التسليمات المتفق عليها في غضون (${c.deliveryDays}) يوم عمل من تاريخ استلام الدفعة الأولى وإقرار متطلبات المشروع، وذلك اعتباراً من تاريخ ${fmtDate(c.startDate)} حتى ${endDate}. يُحتسب التأخير الناجم عن تأخر الطرف الثاني في تزويد المعلومات أو التعليقات أو اتخاذ القرارات ضمن مدة التسليم ولا يُعدُّ إخلالاً من الطرف الأول.`}
          </Article>

          <Article num="٤" title="التسليمات">
            {`يشمل نطاق العمل المتفق عليه في هذا العقد التسليمات التالية:`}
            {c.deliverables.filter(d => d.trim()).length > 0 && (
              <ul style={{ margin: "6px 0 0 0", paddingRight: "16px" }}>
                {c.deliverables.filter(d => d.trim()).map((d, i) => (
                  <li key={i} style={{ marginBottom: "3px" }}>{d}</li>
                ))}
              </ul>
            )}
            {" أي أعمال أو مخرجات إضافية تتجاوز ما هو منصوص عليه أعلاه تستلزم اتفاقاً كتابياً منفصلاً على النطاق والسعر."}
          </Article>

          <Article num="٥" title="المراجعات والتعديلات">
            {`يتضمن هذا العقد (${c.revisions ?? 2}) جولة/جولات مراجعة ضمن نطاق العمل الأصلي. تُعرَّف المراجعة بأنها طلبات تعديل معقولة دون تغيير جوهري في نطاق العمل. أي طلبات تتجاوز هذا العدد أو تستلزم تغيير النطاق الأصلي تُعتبر أعمالاً إضافية وتستلزم موافقةً كتابيةً على سعرٍ جديد قبل البدء بتنفيذها.`}
          </Article>

          <Article num="٦" title="حقوق الملكية الفكرية">
            {`عند استلام كامل المبلغ المتفق عليه، تنتقل ملكية جميع نواتج العمل المُنجزة بموجب هذا العقد — بما فيها التصاميم والأكواد البرمجية والمحتوى والمواد الإبداعية — إلى الطرف الثاني انتقالاً حصرياً وكاملاً وفقاً لنظام حقوق المؤلف السعودي. يحتفظ الطرف الأول بحق عرض العمل في معرضه المهني كمرجع تعريفي دون الإفصاح عن أي بيانات سرية. في حالة الإنهاء المبكر أو عدم اكتمال السداد، تبقى جميع نواتج العمل ملكاً خالصاً للطرف الأول ولا يحق للطرف الثاني استخدامها أو نشرها.`}
          </Article>

          <Article num="٧" title="السرية والخصوصية">
            {`يلتزم الطرفان بالحفاظ التام على سرية جميع المعلومات والبيانات والمواد التجارية والتقنية التي يطّلعان عليها بموجب هذا العقد، وعدم إفشائها لأي طرف ثالث دون موافقة خطية مسبقة. يسري هذا الالتزام خلال مدة العقد ولمدة ثلاث (3) سنوات بعد انتهائه، باستثناء المعلومات المتاحة للعموم أصلاً أو الصادر بالإفصاح عنها أمراً قضائياً ملزماً.`}
          </Article>

          <Article num="٨" title="التزامات الطرف الثاني">
            يلتزم الطرف الثاني بما يلي:
            <ul style={{ margin: "6px 0 0 0", paddingRight: "16px" }}>
              <li style={{ marginBottom: "3px" }}>تزويد الطرف الأول بجميع المواد والمعلومات اللازمة في المواعيد المتفق عليها.</li>
              <li style={{ marginBottom: "3px" }}>تعيين جهة تواصل واحدة مخوَّلة باتخاذ القرارات للتنسيق مع الطرف الأول.</li>
              <li style={{ marginBottom: "3px" }}>مراجعة التسليمات والرد عليها كتابةً خلال (٥) أيام عمل من استلامها، وإلا اعتُبر ذلك قبولاً ضمنياً.</li>
              <li style={{ marginBottom: "3px" }}>الوفاء بمواعيد السداد المنصوص عليها في المادة الثانية من هذا العقد.</li>
            </ul>
          </Article>

          <Article num="٩" title="إنهاء العقد">
            {`يحق لأيٍّ من الطرفين إنهاء هذا العقد بإخطار خطي مسبق مدته (٣٠) يوماً. في حال إنهاء العقد من قِبل الطرف الثاني دون مسوّغ مشروع بعد الشروع في التنفيذ، يستحق الطرف الأول تعويضاً يعادل قيمة الأعمال المُنجزة مضافاً إليها (١٥٪) من المبلغ المتبقي تعويضاً عن الأضرار المباشرة. في حالة الإخلال الجوهري دون تصحيحه خلال (٧) أيام عمل من تاريخ الإخطار الكتابي، يحق للطرف المتضرر إنهاء العقد فورياً وطلب التعويض.`}
          </Article>

          <Article num="١٠" title="القوة القاهرة">
            {`لا يُعدُّ أيٌّ من الطرفين مخلاً بالتزاماته إذا حال دون تنفيذها ظرف استثنائي ذو طابع عام لم يكن في الوسع توقعه أو دفعه وفقاً لأحكام المادة (٩٧) من نظام المعاملات المدنية السعودي، كالكوارث الطبيعية والأوبئة والقرارات الحكومية وما في حكمها. يلتزم الطرف المتأثر بإخطار الطرف الآخر كتابةً خلال (٥) أيام عمل وبذل مساعي التخفيف. إذا استمرت حالة القوة القاهرة أكثر من (٦٠) يوماً، جاز لأيٍّ من الطرفين إنهاء العقد دون التزام بتعويضات عن الفترة المتأثرة.`}
          </Article>

          {(c.penaltyPerDay ?? 0) > 0 && (
            <Article num="١١" title="غرامة التأخير">
              {`في حال تأخر الطرف الأول عن تسليم الأعمال في المواعيد المتفق عليها دون عذر مقبول، وبعد مضي (٣) أيام عمل من إخطار الطرف الثاني كتابةً، تُطبَّق غرامة تأخير يومية مقدارها (${c.penaltyPerDay!.toFixed(2)}) ريال سعودي على ألا يتجاوز مجموع الغرامات (١٠٪) من إجمالي قيمة العقد. تمثل هذه الغرامة تعويضاً متفقاً عليه مسبقاً عن الأضرار المباشرة وفق أحكام الشريعة الإسلامية ونظام المعاملات المدنية، وليست فائدةً ربوية.`}
            </Article>
          )}

          <Article num={lastArticleNum} title="القانون الحاكم وتسوية النزاعات">
            {`يخضع هذا العقد لأحكام نظام المعاملات المدنية في المملكة العربية السعودية وما يتوافق مع أحكام الشريعة الإسلامية الغراء. `}
            {c.useArbitration
              ? `يسعى الطرفان أولاً إلى التسوية الودية خلال (٣٠) يوماً، فإن تعذَّر ذلك أُحيل النزاع إلى التحكيم وفقاً لقواعد المركز السعودي للتحكيم التجاري (SCCA) في مدينة ${c.jurisdiction}، ويكون حكم هيئة التحكيم نهائياً وملزماً للطرفين.`
              : `تختص المحاكم التجارية في مدينة ${c.jurisdiction} بالفصل في أي نزاع ينشأ عن هذا العقد، على أن يسعى الطرفان قبل ذلك إلى التسوية الودية خلال (٣٠) يوماً من نشوء النزاع.`
            }
          </Article>

          {/* ══ SIGNATURES ══ */}
          <div style={{
            marginTop: "22px", border: "1px solid #E0D8CC", borderRadius: "8px",
            overflow: "hidden", pageBreakInside: "avoid",
          }}>
            <div style={{ background: "#F8F5EE", padding: "9px 20px", borderBottom: "1px solid #E0D8CC", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "3px", height: "15px", background: "#C8A962", borderRadius: "2px" }} />
              <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13.5px", fontWeight: 800, color: "#0A0A0A" }}>التوقيعات والاعتماد</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {/* First party */}
              <div style={{ padding: "16px 20px", borderLeft: "1px solid #EEE" }}>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#C8A962", letterSpacing: "0.2em", marginBottom: "8px" }}>الطرف الأول / مقدم الخدمة</div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12.5px", fontWeight: 700, color: "#111", marginBottom: "12px" }}>
                  {providerDisplayName}
                  {c.providerOwnerName && (
                    <div style={{ fontSize: "10.5px", color: "#888", fontWeight: 400, marginTop: "1px" }}>{c.providerOwnerName}</div>
                  )}
                </div>
                <div style={{ borderBottom: "1px solid #888", marginBottom: "3px", height: "32px" }} />
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA" }}>التوقيع</div>
                <div style={{ marginTop: "10px", borderBottom: "1px solid #BBB", height: "28px" }} />
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA" }}>التاريخ</div>
                <div style={{ marginTop: "10px", width: "72px", height: "72px", border: "1px dashed #CCC", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "9px", color: "#CCC" }}>الختم</span>
                </div>
              </div>

              {/* Second party */}
              <div style={{ padding: "16px 20px" }}>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#C8A962", letterSpacing: "0.2em", marginBottom: "8px" }}>الطرف الثاني / العميل</div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12.5px", fontWeight: 700, color: "#111", marginBottom: "12px" }}>
                  {c.clientType === "institution" ? (c.clientCompany ?? c.clientName) : c.clientName}
                </div>
                <div style={{ borderBottom: "1px solid #888", marginBottom: "3px", height: "32px" }} />
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA" }}>التوقيع</div>
                <div style={{ marginTop: "10px", borderBottom: "1px solid #BBB", height: "28px" }} />
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA" }}>التاريخ</div>
                <div style={{ marginTop: "10px", width: "72px", height: "72px", border: "1px dashed #CCC", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "9px", color: "#CCC" }}>الختم</span>
                </div>
              </div>
            </div>

            <div style={{ background: "#F8F5EE", padding: "8px 20px", borderTop: "1px solid #E0D8CC" }}>
              <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#999", margin: 0, lineHeight: 1.8, textAlign: "center" }}>
                هذا العقد محرَّر من نسختين أصليتين متطابقتين لكل طرف نسخة للعمل بها قانوناً · يخضع لنظام المعاملات المدنية السعودي والشريعة الإسلامية
              </p>
            </div>
          </div>

        </div>{/* /body */}

        {/* ══ FOOTER ══ */}
        <div style={{
          borderTop: "2px solid #C8A962", padding: "10px 40px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          position: "relative", zIndex: 1, background: "#FAFAF8",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" style={{ height: "18px", objectFit: "contain", opacity: 0.35 }} />
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8px", color: "#BBB", textAlign: "center" }}>
            {c.providerEmail ?? "info@digitalagency.sa"} · {c.providerPhone ?? "+201007835547"}
          </div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "#C8A962", fontWeight: 600 }}>{c.number}</div>
        </div>

      </div>
    </>
  );
}
