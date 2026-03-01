"use client";

import { useState, useEffect } from "react";

interface WebsitePreviewProps {
  url: string;
  title?: string;
  description?: string;
  className?: string;
}

// Generate screenshot URL using Microlink API (free tier available)
function getScreenshotUrl(url: string): string {
  // Remove protocol for cleaner URLs
  const cleanUrl = url.replace(/^https?:\/\//, "");
  // Using Microlink screenshot API with premium options
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=3000`;
}

// Alternative: Using PageCDN screenshot API (free)
function getPageCDNThumbnail(url: string): string {
  return `https://pagecdn.io/lib/1/image/screenshot/${encodeURIComponent(url)}?w=800&h=600`;
}

export default function WebsitePreview({ url, title, description, className = "" }: WebsitePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url || url === "#") {
      setError(true);
      setLoading(false);
      return;
    }

    // Use Microlink API for screenshots
    const screenshotUrl = getScreenshotUrl(url);
    setImageUrl(screenshotUrl);
    setLoading(false);
  }, [url]);

  const handleImageError = () => {
    setError(true);
    setLoading(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  // Extract domain for display
  const getDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 ${className}`}
      style={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Browser Chrome Header */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Window Controls */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        {/* URL Bar */}
        <div
          className="flex-1 mx-4 px-4 py-1.5 rounded-lg text-xs truncate"
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          {url !== "#" ? getDomain(url) : "example.com"}
        </div>

        {/* Security Icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="text-green-400"
        >
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Screenshot Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-950">
        {/* Loading Skeleton */}
        {loading && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
              backgroundSize: "200% 200%",
              animation: "shimmer 2s ease-in-out infinite",
            }}
          >
            <div className="text-center">
              <div
                className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: "rgba(200, 169, 98, 0.3)", borderTopColor: "#C8A962" }}
              />
              <p className="text-xs text-white/40">جاري تحميل المعاينة...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
            <div
              className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(200,169,98,0.1) 0%, rgba(200,169,98,0.05) 100%)",
                border: "1px solid rgba(200,169,98,0.2)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-amber-500">
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12h6v10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-sm text-white/60">معاينة غير متوفرة</p>
          </div>
        )}

        {/* Screenshot Image */}
        {!error && imageUrl && (
          <img
            src={imageUrl}
            alt={title || "Website Preview"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ opacity: loading ? 0 : 1 }}
          />
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(2px)",
          }}
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #C8A962 0%, #B8944F 100%)",
              color: "#0A0A0A",
              boxShadow: "0 10px 30px rgba(200, 169, 98, 0.4)",
            }}
          >
            <span>زيارة الموقع</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Info Footer */}
      {(title || description) && (
        <div
          className="px-5 py-4"
          style={{
            background: "linear-gradient(180deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,1) 100%)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {title && (
            <h3 className="font-semibold text-white mb-1 text-sm truncate">{title}</h3>
          )}
          {description && (
            <p className="text-xs text-white/50 line-clamp-2">{description}</p>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
