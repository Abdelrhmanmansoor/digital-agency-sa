import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/home/FloatingActions";
import ProductDetailClient from "./ProductDetailClient";
import { getProductBySlug, PRODUCTS } from "@/lib/store-data";

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
    return { title: "Not Found" };
  }

  const isAr = locale === "ar";
  const title = isAr ? product.nameAr : product.nameEn;
  const description = isAr ? product.shortDescAr : product.shortDescEn;

  return {
    title: `${title} | متجر الخدمات الرقمية`,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
    },
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(product.rating),
          reviewCount: String(product.reviewCount),
        },
        offers: {
          "@type": "Offer",
          price: String(product.price),
          priceCurrency: "SAR",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: `https://tf1one.com/${locale}/store/${product.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isAr ? "الرئيسية" : "Home", item: `https://tf1one.com/${locale}` },
          { "@type": "ListItem", position: 2, name: isAr ? "المتجر" : "Store", item: `https://tf1one.com/${locale}/store` },
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
      <Header />
      <main>
        <ProductDetailClient product={product} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
