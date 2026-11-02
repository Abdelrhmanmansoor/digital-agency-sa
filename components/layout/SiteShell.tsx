import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import RevealRoot from "./RevealRoot";
import WhatsAppFab from "./WhatsAppFab";

/* One frame for every public page: header, content, footer, and the single
   persistent WhatsApp action. The seasonal popup and banner are gone — the
   frame no longer changes with the calendar. */
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
      <WhatsAppFab />
    </>
  );
}
