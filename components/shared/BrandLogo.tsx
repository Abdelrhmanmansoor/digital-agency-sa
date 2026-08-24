import type { Brand } from "@/lib/brands";
import styles from "./BrandLogo.module.css";

/* Simple Icons serves a single-colour SVG per brand at this path. Asking for
   the brand's own hex rather than the default black means the hover reveal
   below has something to reveal. */
function cdn(slug: string, hex: string) {
  return `https://cdn.simpleicons.org/${slug}/${hex}`;
}

export default function BrandLogo({
  brand,
  height = 26,
  dim = true,
}: {
  brand: Brand;
  /** Optical height in px. Every source is normalised to it. */
  height?: number;
  /** Grey until hovered. Off for single-logo placements. */
  dim?: boolean;
}) {
  const label = brand.nameAr ? `${brand.name} — ${brand.nameAr}` : brand.name;
  const style = { "--logo-h": `${height}px`, "--brand": `#${brand.hex}` } as React.CSSProperties;

  const inner =
    brand.source === "mark" ? (
      <span className={styles.mark} aria-hidden>
        {brand.name}
      </span>
    ) : (
      /* Plain <img>: these are 1-3 KB SVGs that the optimiser cannot improve,
         and routing them through it would only add a request hop. */
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={styles.img}
        src={brand.source === "local" ? brand.ref! : cdn(brand.ref!, brand.hex)}
        alt={label}
        loading="lazy"
        decoding="async"
        height={height}
      />
    );

  const className = `${styles.logo}${dim ? ` ${styles.dim}` : ""}`;

  /* A logo that links to the brand is useful; one that does not should not
     look interactive, so the anchor only appears when there is a url. */
  return brand.url ? (
    <a
      className={className}
      style={style}
      href={brand.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      title={label}
      aria-label={label}
    >
      {inner}
    </a>
  ) : (
    <span className={className} style={style} title={label} aria-label={label} role="img">
      {inner}
    </span>
  );
}
