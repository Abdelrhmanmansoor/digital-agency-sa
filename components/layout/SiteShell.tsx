import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import RevealRoot from "./RevealRoot";

/* One frame for every public page.
   Before this existed the homepage rendered its own header and footer while
   the eight inner pages imported a different pair, so a visitor moving from
   the home page to the store crossed into what looked like another site.
   Server component: `children` still stream, and only the header, footer and
   reveal observer ship as client code. */
export default function SiteShell({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main" className={className} style={style}>
        {children}
      </main>
      <SiteFooter />
      <RevealRoot />
    </>
  );
}
