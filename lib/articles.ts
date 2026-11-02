/* Blog aggregator.
   The blog used to be three articles duplicated across two files, tagged with
   four loose categories, three of which pointed at posts that did not exist.
   It is now 50 articles across eight clusters that mirror the taxonomy of
   Salla's own help centre — the shape merchants' questions actually arrive
   in — with each article carrying a slug rather than a bare number. */

import { START } from "./blog/c1-start";
import { CATALOG } from "./blog/c2-catalog";
import { ORDERS } from "./blog/c3-orders";
import { PAYMENTS } from "./blog/c4-payments";
import { SHIPPING } from "./blog/c5-shipping";
import { DESIGN } from "./blog/c6-design";
import { MARKETING } from "./blog/c7-marketing";
import { SEO } from "./blog/c8-seo";
import { NEWS } from "./blog/c9-news";
import { GUIDES } from "./blog/c10-guides";
import { DEPTH_NEWS } from "./blog/depth-news";
import { DEPTH_GUIDES } from "./blog/depth-guides";
import type { Article, ClusterId } from "./blog/types";

/* Long-form depth: a practical section and an FAQ appended to the Arabic
   body of the newer articles. Kept in separate files so each article file
   stays readable; the FAQ also feeds the FAQPage markup on the article. */
const DEPTH = { ...DEPTH_NEWS, ...DEPTH_GUIDES };

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function withDepth(a: Article): Article {
  const d = DEPTH[a.id];
  if (!d) return a;
  const faq = d.faqAr.length
    ? `<h2>أسئلة شائعة</h2>${d.faqAr.map(([q, ans]) => `<h3>${esc(q)}</h3><p>${esc(ans)}</p>`).join("")}`
    : "";
  const contentAr = a.contentAr + d.bodyAr + faq;
  /* Reading time from the real length (~180 Arabic words a minute), not a guess. */
  const words = contentAr.replace(/<[^>]+>/g, " ").split(/s+/).filter(Boolean).length;
  return { ...a, contentAr, faqAr: d.faqAr, readTime: Math.max(3, Math.round(words / 180)) };
}

export type { Article, Cluster, ClusterId } from "./blog/types";
export { CLUSTERS, clusterOf } from "./blog/types";

/** Newest first — the order the index renders in. */
export const ARTICLES: Article[] = [
  ...START,
  ...CATALOG,
  ...ORDERS,
  ...PAYMENTS,
  ...SHIPPING,
  ...DESIGN,
  ...MARKETING,
  ...SEO,
  ...NEWS,
  ...GUIDES,
]
  .map(withDepth)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

export function articlesInCluster(cluster: ClusterId): Article[] {
  return ARTICLES.filter((a) => a.cluster === cluster);
}

/** Same-cluster articles first: that is what makes the cluster a cluster. */
export function relatedArticles(id: string, limit = 3): Article[] {
  const current = getArticle(id);
  if (!current) return ARTICLES.slice(0, limit);

  const sameCluster = ARTICLES.filter((a) => a.id !== id && a.cluster === current.cluster);
  if (sameCluster.length >= limit) return sameCluster.slice(0, limit);

  const others = ARTICLES.filter((a) => a.id !== id && a.cluster !== current.cluster);
  return [...sameCluster, ...others].slice(0, limit);
}
