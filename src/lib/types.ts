/**
 * Shared content types. Data files in /src/data are typed against these;
 * components receive them only through the accessor modules in /src/lib.
 */

/** ISO month, e.g. "2026-10". */
export type IsoMonth = `${number}-${number}`;
/** ISO date, e.g. "2026-10-14". */
export type IsoDate = `${number}-${number}-${number}`;

/**
 * The period a figure covers. Every figure on the site carries one, and the
 * display component renders it beside the value, so it cannot be omitted.
 */
export type Period =
  | { kind: "trailing-months"; months: number; through: IsoMonth }
  | { kind: "trailing-days"; days: number }
  | { kind: "month"; month: IsoMonth }
  | { kind: "lifetime"; since: IsoMonth }
  | { kind: "as-of"; date: IsoDate };

export type FigureUnit = "currency" | "percent" | "count" | "multiple" | "months" | "duration-minutes";

export interface Figure {
  value: number;
  unit: FigureUnit;
  period: Period;
}

/* ------------------------------------------------------------------ */
/* Listings                                                            */
/* ------------------------------------------------------------------ */

export type ListingStatus = "available" | "sold";
export type ListingType = "pre-built" | "established";

export type Niche =
  | "Pet supplies"
  | "Beauty & skincare"
  | "Outdoor & camping"
  | "Home & living"
  | "Fitness & recovery"
  | "Baby & kids"
  | "Coffee & kitchen"
  | "Auto accessories";

export type TrafficSource =
  | "Meta ads"
  | "TikTok ads"
  | "Google Shopping"
  | "Organic search"
  | "Organic social"
  | "Email & SMS"
  | "Direct";

export interface MonthRecord {
  month: IsoMonth;
  revenue: number;
  profit: number;
  adSpend: number;
}

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export interface IncludedGroup {
  group: string;
  items: string[];
}

export interface Listing {
  slug: string;
  name: string;
  niche: Niche;
  type: ListingType;
  tagline: string;
  summary: string;
  status: ListingStatus;
  featured: boolean;
  askingPrice: number;
  currency: "USD";
  platform: "Shopify";
  /** First month of trading. */
  launched: IsoMonth;
  dateListed: IsoDate;
  previousOwners: number;
  hoursPerWeek: number;
  sellerReason: string;
  /** Month-by-month record, oldest first. Unsmoothed. */
  history: MonthRecord[];
  traffic: { period: Period; sources: { source: TrafficSource; share: number }[] };
  included: IncludedGroup[];
  excluded: string[];
  verification: { verifiedOn: IsoDate; methods: string[] };
  screenshots: Screenshot[];
  sale?: { salePrice: number; saleDate: IsoDate };
}

/* ------------------------------------------------------------------ */
/* Guarantee, stats, award (JSON-backed)                               */
/* ------------------------------------------------------------------ */

export interface Clause {
  id: string;
  title: string;
  detail: string;
}

export interface GuaranteeTerms {
  thresholdAmount: number;
  currency: "USD";
  periodDays: number;
  refundType: "full-purchase-price";
  revenueDefinition: string;
  qualifyingConditions: Clause[];
  exclusions: Clause[];
  claimWindowDays: number;
  claimProcess: { title: string; detail: string }[];
  evidenceRequired: string[];
  refundTimingBusinessDays: number;
  reviewTimeBusinessDays: number;
  lastUpdated: IsoDate;
}

export interface RevenueStat {
  label: string;
  value: number;
  currency: "USD";
  sampleSize: number;
  sampleDescription: string;
  measurement: string;
  lastUpdated: IsoDate;
  updateFrequency: "daily";
  source: { kind: "static" | "remote"; url?: string };
}

export interface Award {
  rank: number;
  awardName: string;
  year: number;
  category: string;
  awardingBody: string;
  sourceUrl: string;
  thankYou: string;
}

/* ------------------------------------------------------------------ */
/* People & proof                                                      */
/* ------------------------------------------------------------------ */

/** A string that has been checked to contain non-whitespace text. */
export type NonEmpty = string & { readonly __brand: "NonEmpty" };

export interface TestimonialInput {
  fullName: string;
  photo: { src: string; width: number; height: number };
  location: string;
  businessName: string;
  niche: Niche;
  listingSlug?: string;
  purchasedMonth: IsoMonth;
  quote: string;
  sample: boolean;
}

/** Only fully-populated testimonials can be rendered. Built by lib/testimonials. */
export interface Testimonial {
  fullName: NonEmpty;
  photo: { src: NonEmpty; width: number; height: number };
  location: NonEmpty;
  businessName: NonEmpty;
  niche: Niche;
  listingSlug?: string;
  purchasedMonth: IsoMonth;
  quote: NonEmpty;
  sample: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: { src: string; width: number; height: number };
  bio: string;
  background: string[];
  linkedinUrl: string;
  sample: boolean;
}

export interface CaseStudy {
  slug: string;
  buyerName: string;
  buyerPhoto: { src: string; width: number; height: number };
  buyerBackground: string;
  businessName: string;
  niche: Niche;
  listingSlug?: string;
  purchasedMonth: IsoMonth;
  purchasePrice: number;
  headline: string;
  summary: string;
  months: MonthRecord[];
  sections: { heading: string; body: string[] }[];
  setback?: { title: string; whatHappened: string; resolution: string; cost: string };
  hardParts: string[];
  quote: string;
  sample: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string[];
  link?: { href: string; label: string };
}

/* ------------------------------------------------------------------ */
/* Company & process                                                   */
/* ------------------------------------------------------------------ */

export interface Company {
  brand: string;
  legalName: string;
  jurisdiction: string;
  registrationNumber: string;
  address: { line1: string; line2?: string; city: string; region: string; postalCode: string; country: string };
  email: string;
  phone: string;
  responseTime: Figure;
  supportHours: { days: string; hours: string; timezone: string };
  channels: { name: string; detail: string; href?: string }[];
  founded: number;
  sample: boolean;
}

export interface EscrowStage {
  id: string;
  title: string;
  detail: string;
  owner: "Buyer" | "Seller" | "EcomCla" | "Escrow";
}

export interface EscrowConfig {
  provider: { name: string; description: string; url: string };
  inspectionPeriodDays: number;
  stages: EscrowStage[];
}

export interface Step {
  title: string;
  detail: string;
}

export interface TimedStep extends Step {
  when: string;
}

export interface LegalDocument {
  slug: "terms" | "privacy" | "earnings-disclaimer";
  title: string;
  summary: string;
  lastUpdated: IsoDate;
  sections: { heading: string; paragraphs: string[] }[];
}
