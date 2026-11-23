import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import RevealRoot from "./RevealRoot";
import WhatsAppFab from "./WhatsAppFab";
import OfferPopup from "./OfferPopup";
import ScrollFx from "./ScrollFx";

/* One frame for every public page: header, content, footer, the persistent
   WhatsApp action, the 50% store-design offer popup, and the page-wide
   motion layer (scroll progress, cursor spotlight on cards). */
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
      <OfferPopup />
      <ScrollFx />
    </>
  );
}
