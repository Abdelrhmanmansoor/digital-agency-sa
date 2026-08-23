/* Store FAQ — one list, rendered on the page and described in the FAQPage
   JSON-LD. The two used to be written separately: the markup asked a pricing
   question the page never showed, gave a different answer to the guarantee
   question than the one on screen, and was emitted in Arabic on /en and /fr.
   Google treats FAQ markup that does not match the visible page as a policy
   violation, so both now read from here.

   Prices and timelines below are read off lib/store-data.ts. The copy they
   replace quoted 1,499 / 1,999 SAR and 7 / 10 / 5 days — none of which
   matched the catalogue the same page sells. */

export type StoreFaq = { q: string; a: string };

export const STORE_FAQ: Record<"ar" | "en" | "fr", StoreFaq[]> = {
  ar: [
    {
      q: "كيف أطلب الخدمة؟",
      a: "اضغط على «اشتري الآن» أو «التفاصيل» في أي خدمة، وسيتواصل معك فريقنا فورًا لتأكيد التفاصيل قبل البدء.",
    },
    {
      q: "كم يكلف تصميم متجر سلة؟",
      a: "تصميم ثيم سلة خاص بعلامتك يبدأ من 399 ر.س، وتجهيز متجر سلة كامل من الصفر من 1,099 ر.س. كل خدمة في المتجر معروضة بسعرها ومدة تنفيذها قبل الطلب.",
    },
    {
      q: "هل الجودة مضمونة؟",
      a: "نعم. نراجع كل مخرج قبل التسليم، ونشاركك المخرجات الأولية قبل استكمال الدفع حتى تطمئن للاتجاه العام قبل إكمال العمل.",
    },
    {
      q: "هل يمكنني رؤية العمل قبل الدفع؟",
      a: "بالطبع. نعمل على مرحلة البداية ونشاركك المخرجات الأولية قبل استكمال الدفع.",
    },
    {
      q: "كم يستغرق التسليم؟",
      a: "يختلف حسب الخدمة: تصميم الثيم 5 أيام، تجهيز المتجر الكامل 7 أيام، الهوية البصرية 6 أيام عمل. المدة معروضة على كل خدمة داخل المتجر.",
    },
  ],
  en: [
    {
      q: "How do I order?",
      a: "Click “Buy Now” or “Details” on any service and our team contacts you to confirm the details before we start.",
    },
    {
      q: "How much does a Salla store design cost?",
      a: "A custom Salla theme starts at 399 SAR and a full store setup from scratch at 1,099 SAR. Every service in the store shows its price and delivery time before you order.",
    },
    {
      q: "Is quality guaranteed?",
      a: "Yes. Every deliverable is reviewed before handover, and we share the first outputs before payment is completed so you can confirm the direction.",
    },
    {
      q: "Can I see the work before paying?",
      a: "Of course. We complete the first phase and share the outputs before payment is completed.",
    },
    {
      q: "How long is delivery?",
      a: "It varies by service: theme design 5 days, full store setup 7 days, brand identity 6 working days. The timeline is shown on each service.",
    },
  ],
  fr: [
    {
      q: "Comment commander ?",
      a: "Cliquez sur « Acheter » ou « Détails » sur une prestation : notre équipe vous contacte pour confirmer les détails avant de commencer.",
    },
    {
      q: "Combien coûte le design d’une boutique Salla ?",
      a: "Un thème Salla sur mesure démarre à 399 SAR et une boutique complète à 1 099 SAR. Chaque prestation affiche son prix et son délai avant la commande.",
    },
    {
      q: "La qualité est-elle garantie ?",
      a: "Oui. Chaque livrable est relu avant la remise, et nous partageons les premiers rendus avant le solde du paiement.",
    },
    {
      q: "Puis-je voir le travail avant de payer ?",
      a: "Bien sûr. Nous réalisons la première phase et partageons les rendus avant le solde.",
    },
    {
      q: "Quels sont les délais ?",
      a: "Selon la prestation : thème 5 jours, boutique complète 7 jours, identité visuelle 6 jours ouvrés. Le délai est affiché sur chaque service.",
    },
  ],
};
