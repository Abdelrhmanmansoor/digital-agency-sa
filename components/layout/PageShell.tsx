import Link from "next/link";
import styles from "./PageShell.module.css";

/* Shared frame for every inner page, so the store, Radar, the policy page
   and the blog stop reading as four different products. Each primitive is
   deliberately small — a page composes them, it does not restyle them. */

type Crumb = { label: string; href?: string };

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className={styles.shell}>{children}</div>;
}

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}

export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className={styles.crumbs}>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} style={{ display: "contents" }}>
          {i > 0 && <span aria-hidden>/</span>}
          {item.href ? <Link href={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}
        </span>
      ))}
    </nav>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className={styles.kicker}>{children}</p>;
}

export function PageHero({
  kicker,
  title,
  lead,
  crumbs,
  crumbsLabel,
  aside,
}: {
  kicker: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  crumbsLabel?: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className={styles.hero} data-own-spacing>
      <Container>
        <div className={styles.heroInner}>
          <div className={styles.heroLead}>
            {crumbs && crumbs.length > 0 && (
              <Breadcrumbs items={crumbs} label={crumbsLabel ?? "Breadcrumb"} />
            )}
            <Kicker>{kicker}</Kicker>
            <h1>{title}</h1>
            {lead && <p className={styles.heroText}>{lead}</p>}
          </div>
          {aside && <div className={styles.heroAside}>{aside}</div>}
        </div>
      </Container>
    </section>
  );
}

export function Section({
  children,
  tone = "paper",
  tight = false,
  id,
}: {
  children: React.ReactNode;
  tone?: "paper" | "surface" | "ink";
  tight?: boolean;
  id?: string;
}) {
  const toneClass =
    tone === "surface" ? styles.onSurface : tone === "ink" ? styles.onInk : styles.onPaper;
  return (
    <section
      id={id}
      data-own-spacing
      className={`${tight ? styles.sectionTight : styles.section} ${toneClass}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  lead,
  centered = false,
}: {
  kicker: string;
  title: string;
  lead?: string;
  centered?: boolean;
}) {
  return (
    <div className={`${styles.sectionHead} ${centered ? styles.sectionHeadCentered : ""}`}>
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      {lead && <p className={styles.sectionLead}>{lead}</p>}
    </div>
  );
}

export { styles as shellStyles };
