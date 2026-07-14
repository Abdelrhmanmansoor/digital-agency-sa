"use client";

const FILE_ICONS: Record<string, string> = {
  design: "🎨",
  document: "📄",
  video: "🎬",
  archive: "📦",
  other: "📎",
};

interface FileItem {
  id: string;
  name: string;
  url: string;
  type: string;
  description?: string;
  addedAt: string;
  orderId: string;
  orderTitle: string;
  orderServiceAr: string;
  orderServiceEn: string;
}

interface Props {
  files: FileItem[];
  locale: string;
}

export default function FilesClient({ files, locale }: Props) {
  const isRTL = locale === "ar";
  const basePath = `/${locale}/dashboard`;

  return (
    <div style={{ padding: "40px", direction: isRTL ? "rtl" : "ltr", maxWidth: "1000px" }}>
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "28px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
          {isRTL ? "ملفاتي المستلمة" : "My Delivered Files"}
        </h1>
        <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", marginTop: "8px" }}>
          {files.length} {isRTL ? "ملف مستلم" : "files received"}
        </p>
      </div>

      {files.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 40px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "16px",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
          <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#FAFAF7", marginBottom: "8px" }}>
            {isRTL ? "لا توجد ملفات بعد" : "No files yet"}
          </div>
          <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", marginBottom: "24px" }}>
            {isRTL ? "ستظهر ملفاتك هنا عند تسليمها من فريقنا" : "Your files will appear here once our team delivers them"}
          </div>
          <a
            href={`${basePath}/orders/new`}
            style={{
              display: "inline-block",
              padding: "11px 28px",
              background: "#F0B100",
              color: "#0A0A0A",
              borderRadius: "10px",
              textDecoration: "none",
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {isRTL ? "اطلب خدمة الآن" : "Place an order now"}
          </a>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {files.map((f) => (
            <a
              key={f.id}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(240,177,0,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,177,0,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              {/* Icon + name */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(240,177,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                  {FILE_ICONS[f.type] || "📎"}
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", fontWeight: 700, color: "#FAFAF7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {f.name}
                  </div>
                  {f.description && (
                    <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {f.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Order link */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
                <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "3px" }}>
                  {isRTL ? "من طلب:" : "From order:"}
                </div>
                <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "12px", color: "#F0B100" }}>
                  {f.orderTitle}
                </div>
              </div>

              {/* Date + download */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>
                  {new Date(f.addedAt).toLocaleDateString(isRTL ? "ar-SA" : "en-US")}
                </span>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "#F0B100", display: "flex", alignItems: "center", gap: "4px" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  {isRTL ? "فتح" : "Open"}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
