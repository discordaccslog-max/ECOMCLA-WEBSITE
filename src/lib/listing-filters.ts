import type { ListingCardData } from "./listings";
import type { Niche } from "./types";

/**
 * Pure filter and sort logic for /listings. Filter state lives in the URL;
 * these functions parse it, serialise it and apply it. No data imports, so
 * it is safe to use in client components.
 */

export interface Range {
  key: string;
  label: string;
  min: number;
  max: number;
}

export const priceRanges: Range[] = [
  { key: "under-15k", label: "Under $15k", min: 0, max: 15_000 },
  { key: "15k-40k", label: "$15k – $40k", min: 15_000, max: 40_000 },
  { key: "40k-60k", label: "$40k – $60k", min: 40_000, max: 60_000 },
  { key: "60k-plus", label: "$60k+", min: 60_000, max: Infinity },
];

export const revenueRanges: Range[] = [
  { key: "under-5k", label: "Under $5k / mo", min: 0, max: 5_000 },
  { key: "5k-10k", label: "$5k – $10k / mo", min: 5_000, max: 10_000 },
  { key: "10k-plus", label: "$10k+ / mo", min: 10_000, max: Infinity },
];

export const ageRanges: Range[] = [
  { key: "under-6m", label: "Under 6 months", min: 0, max: 6 },
  { key: "6-12m", label: "6 – 12 months", min: 6, max: 12 },
  { key: "12m-plus", label: "12 months+", min: 12, max: Infinity },
];

export const sortOptions = [
  { key: "newest", label: "Newest listed" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "revenue-desc", label: "Monthly revenue: highest" },
  { key: "profit-desc", label: "Monthly profit: highest" },
  { key: "multiple-asc", label: "Profit multiple: lowest" },
] as const;

export type SortKey = (typeof sortOptions)[number]["key"];
export type StatusFilter = "available" | "sold" | "all";

export interface ListingFilters {
  niches: Niche[];
  price: string | null;
  revenue: string | null;
  age: string | null;
  status: StatusFilter;
  sort: SortKey;
}

export const defaultFilters: ListingFilters = {
  niches: [],
  price: null,
  revenue: null,
  age: null,
  status: "available",
  sort: "newest",
};

const validKey = (ranges: Range[], key: string | null) => (key && ranges.some((r) => r.key === key) ? key : null);

export function parseFilters(params: URLSearchParams, knownNiches: readonly Niche[]): ListingFilters {
  const niches = (params.get("niche") ?? "")
    .split(",")
    .map((n) => decodeURIComponent(n))
    .filter((n): n is Niche => (knownNiches as readonly string[]).includes(n));
  const status = params.get("status");
  const sort = params.get("sort");
  return {
    niches,
    price: validKey(priceRanges, params.get("price")),
    revenue: validKey(revenueRanges, params.get("revenue")),
    age: validKey(ageRanges, params.get("age")),
    status: status === "sold" || status === "all" ? status : "available",
    sort: sortOptions.some((o) => o.key === sort) ? (sort as SortKey) : "newest",
  };
}

export function serializeFilters(f: ListingFilters): string {
  const p = new URLSearchParams();
  if (f.niches.length) p.set("niche", f.niches.join(","));
  if (f.price) p.set("price", f.price);
  if (f.revenue) p.set("revenue", f.revenue);
  if (f.age) p.set("age", f.age);
  if (f.status !== defaultFilters.status) p.set("status", f.status);
  if (f.sort !== defaultFilters.sort) p.set("sort", f.sort);
  return p.toString();
}

export function countActiveFilters(f: ListingFilters): number {
  return f.niches.length + Number(Boolean(f.price)) + Number(Boolean(f.revenue)) + Number(Boolean(f.age)) + Number(f.status !== "available");
}

const inRange = (ranges: Range[], key: string | null, value: number) => {
  if (!key) return true;
  const r = ranges.find((x) => x.key === key);
  return !r || (value >= r.min && value < r.max);
};

const sorters: Record<SortKey, (a: ListingCardData, b: ListingCardData) => number> = {
  newest: (a, b) => b.dateListed.localeCompare(a.dateListed),
  "price-asc": (a, b) => a.askingPrice - b.askingPrice,
  "price-desc": (a, b) => b.askingPrice - a.askingPrice,
  "revenue-desc": (a, b) => b.revenue.value - a.revenue.value,
  "profit-desc": (a, b) => b.profit.value - a.profit.value,
  "multiple-asc": (a, b) => a.multiple.value - b.multiple.value,
};

export function applyFilters(cards: ListingCardData[], f: ListingFilters): ListingCardData[] {
  return cards
    .filter((c) => (f.status === "all" ? true : c.status === f.status))
    .filter((c) => f.niches.length === 0 || f.niches.includes(c.niche))
    .filter((c) => inRange(priceRanges, f.price, c.askingPrice))
    .filter((c) => inRange(revenueRanges, f.revenue, c.revenue.value))
    .filter((c) => inRange(ageRanges, f.age, c.ageMonths))
    .sort((a, b) => (a.status === b.status ? sorters[f.sort](a, b) : a.status === "available" ? -1 : 1));
}
