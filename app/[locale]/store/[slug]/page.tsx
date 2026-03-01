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
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <ProductDetailClient product={product} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
