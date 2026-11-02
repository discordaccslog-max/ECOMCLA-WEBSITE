import { listings } from "@/data/listings";
import { monthsBetween } from "./format";
import type { Figure, IsoMonth, Listing, MonthRecord, Niche, Period } from "./types";

/**
 * Listing accessors and derived performance figures. Headline numbers are
 * always computed from the month-by-month history, so a figure can never
 * disagree with the chart beneath it.
 */

const TRAILING_MONTHS = 6;

function lastMonth(l: Listing): IsoMonth {
  return l.history[l.history.length - 1].month;
}

function average(records: MonthRecord[], key: keyof Omit<MonthRecord, "month">): number {
  return records.reduce((sum, r) => sum + r[key], 0) / records.length;
}

export interface Performance {
  revenue: Figure;
  profit: Figure;
  margin: Figure;
  adSpend: Figure;
  roas: Figure;
  multiple: Figure;
  lifetimeRevenue: Figure;
  latestRevenue: Figure;
  age: Figure;
}

export function getPerformance(l: Listing): Performance {
  const window = l.history.slice(-TRAILING_MONTHS);
  const through = lastMonth(l);
  const period: Period = { kind: "trailing-months", months: window.length, through };
  const revenue = average(window, "revenue");
  const profit = average(window, "profit");
  const adSpend = average(window, "adSpend");
  const lifetime = l.history.reduce((sum, r) => sum + r.revenue, 0);
  return {
    revenue: { value: Math.round(revenue), unit: "currency", period },
    profit: { value: Math.round(profit), unit: "currency", period },
    margin: { value: (profit / revenue) * 100, unit: "percent", period },
    adSpend: { value: Math.round(adSpend), unit: "currency", period },
    roas: { value: revenue / adSpend, unit: "multiple", period },
    multiple: { value: l.askingPrice / (profit * 12), unit: "multiple", period },
    lifetimeRevenue: { value: lifetime, unit: "currency", period: { kind: "lifetime", since: l.history[0].month } },
    latestRevenue: { value: l.history[l.history.length - 1].revenue, unit: "currency", period: { kind: "month", month: through } },
    age: { value: getAgeMonths(l), unit: "months", period: { kind: "month", month: through } },
  };
}

export function getAgeMonths(l: Listing): number {
  return monthsBetween(l.launched, lastMonth(l));
}

/* ------------------------------------------------------------------ */

export function getAllListings(): Listing[] {
  return listings;
}

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getListingSlugs(): string[] {
  return listings.map((l) => l.slug);
}

export function getAvailableListings(): Listing[] {
  return listings.filter((l) => l.status === "available");
}

export function getSoldListings(): Listing[] {
  return listings
    .filter((l) => l.status === "sold" && l.sale)
    .sort((a, b) => b.sale!.saleDate.localeCompare(a.sale!.saleDate));
}

export function getFeaturedListings(limit = 3): Listing[] {
  return listings.filter((l) => l.featured && l.status === "available").slice(0, limit);
}

export function getNiches(): Niche[] {
  return Array.from(new Set(listings.map((l) => l.niche))).sort();
}

/* ------------------------------------------------------------------ */
/* Card summaries: small, serialisable, safe to pass to client code.   */
/* ------------------------------------------------------------------ */

export interface ListingCardData {
  slug: string;
  name: string;
  niche: Niche;
  type: Listing["type"];
  tagline: string;
  status: Listing["status"];
  askingPrice: number;
  revenue: Figure;
  profit: Figure;
  multiple: Figure;
  ageMonths: number;
  dateListed: Listing["dateListed"];
  previousOwners: number;
  image: Listing["screenshots"][number];
  /** Last 12 months of revenue for the card sparkline. */
  spark: number[];
}

export function toCardData(l: Listing): ListingCardData {
  const p = getPerformance(l);
  return {
    slug: l.slug,
    name: l.name,
    niche: l.niche,
    type: l.type,
    tagline: l.tagline,
    status: l.status,
    askingPrice: l.askingPrice,
    revenue: p.revenue,
    profit: p.profit,
    multiple: p.multiple,
    ageMonths: getAgeMonths(l),
    dateListed: l.dateListed,
    previousOwners: l.previousOwners,
    image: l.screenshots[0],
    spark: l.history.slice(-12).map((r) => r.revenue),
  };
}

export function getListingCards(): ListingCardData[] {
  return listings.map(toCardData);
}
