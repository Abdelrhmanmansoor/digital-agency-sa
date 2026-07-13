"use client";

/* Hero صفحة ثيم سِدرة: تعريف قوي + شارات + نقاط تفاعلية على معاينة الثيم */

import Image from "next/image";
import { useState } from "react";
import { SIDRA_INFO, HERO_HOTSPOTS } from "@/lib/sidra-data";

const BADGES = [
  { icon: "✓", label: "متوافق مع منصة سلة" },
  { icon: "▯", label: "متجاوب مع الجوال بالكامل" },
  { icon: "↯", label: "أداء سريع وخفيف" },
  { icon: "☎", label: "دعم فني وتحديثات" },
];

export default function HeroSection({
  orderHref,
  demoHref,
}: {
  orderHref: string;
  demoHref: string;
}) {
  const [openSpot, setOpenSpot] = useState<string | null>(null);
  const hasPrice = SIDRA_INFO.price !== null;
  const hasOffer = SIDRA_INFO.offer.enabled && SIDRA_INFO.originalPrice !== null && hasPrice;

  return (
    <section className="relative overflow-hidden border-b border-[#eadfd4] bg-[linear-gradient(180deg,#fbf7f2_0%,#f3e8df_100%)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[#a51218] via-[#C9A227] to-[#a51218]" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 start-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#C9A227]/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-20">
        {/* النص */}
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#a51218]/15 bg-white px-4 py-2 text-sm font-black text-[#a51218]">
            <span className="h-2 w-2 rounded-full bg-[#C9A227]" aria-hidden />
            ثيم سلة سعودي فاخر — {SIDRA_INFO.stats.components} مكونًا و{SIDRA_INFO.stats.settings} خيار تخصيص
          </p>

          <h1 className="text-4xl font-black leading-tight text-[#211711] sm:text-5xl lg:text-6xl">
            سِدرة <span className="text-[#a51218]">|</span> SIDRA
            <span className="mt-3 block text-2xl font-black leading-snug text-[#6d5f55] sm:text-3xl">
              فخامة هادئة وتراث نجدي معاصر لمتجرك على سلة
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-[#6d5f55]">
            {SIDRA_INFO.shortDesc} هذا المركز يرافقك من لحظة التعرف على الثيم حتى إطلاق متجرك:
            تثبيت، هوية، مكونات، مقاسات، سرعة، ودعم — كل شيء في مكان واحد.
          </p>

          {/* السعر / العرض */}
          {hasPrice ? (
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-[#eadfd4] bg-white p-4">
              <div>
                <span className="text-3xl font-black text-[#211711]">
                  {SIDRA_INFO.price} <span className="text-base">{SIDRA_INFO.currency === "SAR" ? "ر.س" : SIDRA_INFO.currency}</span>
                </span>
                {hasOffer ? (
                  <span className="ms-3 text-lg text-[#a58f7e] line-through">{SIDRA_INFO.originalPrice}</span>
                ) : null}
              </div>
              {hasOffer && SIDRA_INFO.offer.discountLabel ? (
                <span className="rounded-full bg-[#a51218] px-3 py-1 text-sm font-black text-white">
                  {SIDRA_INFO.offer.discountLabel}
                </span>
              ) : null}
              {hasOffer && SIDRA_INFO.offer.endDate ? (
                <span className="text-sm font-bold text-[#8a3a22]">العرض حتى {SIDRA_INFO.offer.endDate}</span>
              ) : null}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={SIDRA_INFO.buyUrl || orderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#a51218] px-7 py-4 text-base font-black text-white shadow-[0_18px_50px_rgba(165,18,24,0.22)] transition hover:-translate-y-0.5 hover:bg-[#8f0f14]"
            >
              {hasPrice ? "شراء ثيم سِدرة" : "اطلب ثيم سِدرة الآن"}
            </a>
            <a
              href={SIDRA_INFO.demoUrl || demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#211711]/15 bg-white px-7 py-4 text-base font-black text-[#211711] transition hover:-translate-y-0.5 hover:border-[#a51218]/40"
            >
              معاينة الثيم
            </a>
            <a
              href="#quick-start"
              className="inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-bold text-[#6d5f55] underline decoration-[#C9A227] decoration-2 underline-offset-8 transition hover:text-[#a51218]"
            >
              استكشف التوثيق ↓
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {BADGES.map((b) => (
              <li
                key={b.label}
                className="inline-flex items-center gap-2 rounded-full border border-[#eadfd4] bg-white/80 px-4 py-2 text-sm font-bold text-[#5f5148]"
              >
                <span className="text-[#C9A227]" aria-hidden>{b.icon}</span>
                {b.label}
              </li>
            ))}
          </ul>
        </div>

        {/* المعاينة التفاعلية */}
        <div className="mx-auto w-full max-w-md">
          <div className="relative rounded-[32px] border border-[#eadfd4] bg-white p-4 shadow-[0_28px_80px_rgba(80,48,34,0.14)]">
            {/* إطار المتصفح */}
            <div className="mb-3 flex items-center gap-1.5 px-2" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#eadfd4]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#eadfd4]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#C9A227]/50" />
              <span className="ms-3 h-5 flex-1 rounded-full bg-[#f4ece5]" />
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#f0e6dc] bg-[#f8f2ec]">
              {/* محاكاة توضيحية لتخطيط الثيم (وليست لقطة حية) */}
              <div aria-hidden className="select-none">
                {/* الهيدر */}
                <div className="flex items-center justify-between border-b border-[#eadfd4] bg-white px-4 py-3">
                  <span className="h-3 w-10 rounded-full bg-[#eadfd4]" />
                  <Image src={SIDRA_INFO.logoSrc} alt="" width={64} height={64} className="h-8 w-8 rounded-lg object-cover" priority />
                  <span className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#C9A227]/60" />
                    <span className="h-3 w-3 rounded-full bg-[#eadfd4]" />
                  </span>
                </div>
                {/* السلايدر */}
                <div className="relative m-3 flex h-28 items-end rounded-xl bg-[linear-gradient(135deg,#a51218_0%,#6e0c10_60%,#211711_100%)] p-3">
                  <div>
                    <span className="block h-2.5 w-24 rounded-full bg-white/80" />
                    <span className="mt-1.5 block h-2 w-16 rounded-full bg-[#C9A227]" />
                  </div>
                </div>
                {/* بطاقات المنتجات */}
                <div className="grid grid-cols-2 gap-2.5 px-3">
                  {[0, 1].map((i) => (
                    <div key={i} className="rounded-xl border border-[#eadfd4] bg-white p-2">
                      <div className="h-16 rounded-lg bg-[#f4ece5]" />
                      <span className="mt-2 block h-2 w-3/4 rounded-full bg-[#eadfd4]" />
                      <span className="mt-1.5 block h-2 w-1/3 rounded-full bg-[#a51218]/50" />
                    </div>
                  ))}
                </div>
                {/* آراء + شريط الجوال + الفوتر */}
                <div className="m-3 flex items-center gap-2 rounded-xl border border-[#eadfd4] bg-white p-2.5">
                  <span className="h-6 w-6 shrink-0 rounded-full bg-[#C9A227]/40" />
                  <span className="block h-2 w-2/3 rounded-full bg-[#eadfd4]" />
                </div>
                <div className="flex items-center justify-between bg-[#211711] px-5 py-3.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-[#C9A227]" : "bg-white/30"}`} />
                  ))}
                </div>
              </div>

              {/* النقاط التفاعلية */}
              {HERO_HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setOpenSpot(openSpot === h.id ? null : h.id)}
                  aria-expanded={openSpot === h.id}
                  aria-label={`استكشف: ${h.title}`}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xs font-black transition ${
                    openSpot === h.id
                      ? "scale-125 border-white bg-[#a51218] text-white"
                      : "border-[#a51218] bg-white/90 text-[#a51218] hover:scale-110"
                  }`}
                >
                  +
                </button>
              ))}
            </div>

            {/* بطاقة شرح النقطة */}
            {openSpot ? (
              (() => {
                const h = HERO_HOTSPOTS.find((x) => x.id === openSpot)!;
                return (
                  <div className="mt-3 rounded-2xl border border-[#a51218]/20 bg-[#fbf7f2] p-4">
                    <p className="font-black text-[#211711]">{h.title}</p>
                    <p className="mt-1 text-sm leading-7 text-[#6d5f55]">{h.desc}</p>
                    <a href={`#${h.linkId}`} className="mt-2 inline-block text-sm font-black text-[#a51218] hover:underline">
                      اقرأ التوثيق ←
                    </a>
                  </div>
                );
              })()
            ) : (
              <p className="mt-3 px-2 text-center text-xs font-bold text-[#a58f7e]">
                محاكاة توضيحية لتخطيط الثيم — اضغط على النقاط لاستكشاف كل جزء
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
