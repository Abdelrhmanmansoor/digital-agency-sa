import { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import FloatingActions from "@/components/home/FloatingActions";
import ProductDetailClient from "./ProductDetailClient";
import { getProductBySlug, PRODUCTS } from "@/lib/store-data";
import { SITE_URL, hreflangMap } from "@/lib/site";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

/* ─── Generate Static Params ────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return PRODUCTS.flatMap((product) =>
    ["ar", "en", "fr"].map((locale) => ({
      locale,
      slug: product.slug,
    }))
  );
}

/* ─── SEO Metadata ──────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Not Found", robots: { index: false, follow: false } };
  }

  const isAr = locale === "ar";
  const title = isAr ? product.nameAr : product.nameEn;
  const description = isAr ? product.shortDescAr : product.shortDescEn;
  /* The suffix was a hard-coded Arabic string appended to English and French
     titles too, and the page carried neither canonical nor hreflang. */
  const suffix = isAr ? "متجر الخدمات الرقمية" : locale === "fr" ? "Boutique de services" : "Digital Services Store";
  const canonical = `${SITE_URL}/${locale}/store/${product.slug}`;

  return {
    title: `${title} | ${suffix}`,
    description,
    alternates: {
      canonical,
      languages: hreflangMap(`/store/${product.slug}`),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "AM Design",
      type: "website",
      locale: isAr ? "ar_SA" : locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ─── Page Component ────────────────────────────────────────────────────────── */
export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isAr = locale === "ar";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: isAr ? product.nameAr : product.nameEn,
        description: isAr ? product.shortDescAr : product.shortDescEn,
        sku: product.id,
        brand: { "@type": "Brand", name: "AM Design" },
        /* No aggregateRating. It used to be emitted from two hard-coded
           numbers in store-data.ts with no review system anywhere behind
           them. Google requires ratings in Product markup to come from
           genuine, first-party reviews; fabricated ones are a policy
           violation that risks a manual action against the whole domain.
           `offers` stays — the price and availability below are real. */
        offers: {
          "@type": "Offer",
          price: String(product.price),
          priceCurrency: "SAR",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: `${SITE_URL}/${locale}/store/${product.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isAr ? "الرئيسية" : "Home", item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: isAr ? "المتجر" : "Store", item: `${SITE_URL}/${locale}/store` },
          { "@type": "ListItem", position: 3, name: isAr ? product.nameAr : product.nameEn },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteShell>
        <ProductDetailClient product={product} />
      </SiteShell>
      <FloatingActions />
    </>
  );
}
