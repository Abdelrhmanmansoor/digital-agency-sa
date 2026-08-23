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
import type { Article, ClusterId } from "./blog/types";

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
].sort((a, b) => b.date.localeCompare(a.date));

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
