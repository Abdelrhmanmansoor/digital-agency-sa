import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "120px",
          fontWeight: 700,
          color: "rgba(200,169,98,0.2)",
          lineHeight: 1,
          marginBottom: "24px",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: "'Zain', sans-serif",
          fontSize: "32px",
          fontWeight: 700,
          color: "#FAFAF7",
          marginBottom: "16px",
        }}
      >
        الصفحة غير موجودة
      </h1>
      <p style={{ color: "#8C8C7A", fontSize: "16px", marginBottom: "32px" }}>
        عذراً، الصفحة التي تبحث عنها غير موجودة
      </p>
      <Link href="/ar">
        <button
          className="btn-primary"
          style={{ padding: "16px 40px" }}
        >
          <span>العودة للرئيسية</span>
        </button>
      </Link>
    </div>
  );
}
