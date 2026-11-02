/** Site-wide constants: canonical URL and navigation. */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteName = "EcomCla";
export const siteDescription =
  "A marketplace for pre-built and established e-commerce businesses. Verified figures, ad creatives, video assets and social accounts included, handed over set up and ready to run.";

export const primaryNav = [
  { href: "/listings", label: "Listings" },
  { href: "/whats-included", label: "What's included" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/guarantee", label: "Guarantee" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = [
  {
    heading: "Marketplace",
    links: [
      { href: "/listings", label: "Available businesses" },
      { href: "/listings/sold", label: "Sold archive" },
      { href: "/whats-included", label: "What's included" },
      { href: "/case-studies", label: "Case studies" },
    ],
  },
  {
    heading: "Buying safely",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/how-it-works#escrow", label: "Escrow" },
      { href: "/guarantee", label: "Revenue guarantee" },
      { href: "/buyer-protection", label: "Buyer protection" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export const legalNav = [
  { href: "/terms", label: "Terms of sale" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/earnings-disclaimer", label: "Earnings disclaimer" },
] as const;
