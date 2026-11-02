"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  ageRanges,
  applyFilters,
  countActiveFilters,
  defaultFilters,
  type ListingFilters,
  parseFilters,
  priceRanges,
  type Range,
  revenueRanges,
  serializeFilters,
  type SortKey,
  sortOptions,
  type StatusFilter,
} from "@/lib/listing-filters";
import type { ListingCardData } from "@/lib/listings";
import type { Niche } from "@/lib/types";

interface ExplorerProps {
  cards: ListingCardData[];
  niches: Niche[];
  /** Server-rendered grid elements keyed by slug, so cards stay server components. */
  renderCard: Record<string, React.ReactNode>;
}

/** Reads and writes filter state in the URL. */
export function ListingsExplorer(props: ExplorerProps) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const filters = useMemo(() => parseFilters(new URLSearchParams(params.toString()), props.niches), [params, props.niches]);

  const onChange = useCallback(
    (next: ListingFilters) => {
      const qs = serializeFilters(next);
      startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
    },
    [router, pathname],
  );

  return <ExplorerView {...props} filters={filters} onChange={onChange} />;
}

/** Suspense fallback and no-JS view: the default filter state, rendered identically. */
export function ListingsExplorerStatic(props: ExplorerProps) {
  return <ExplorerView {...props} filters={defaultFilters} onChange={() => {}} />;
}

/* ------------------------------------------------------------------ */

function ExplorerView({ cards, niches, renderCard, filters, onChange }: ExplorerProps & { filters: ListingFilters; onChange: (f: ListingFilters) => void }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const results = applyFilters(cards, filters);
  const active = countActiveFilters(filters);
  const set = (patch: Partial<ListingFilters>) => onChange({ ...filters, ...patch });
  const clear = () => onChange({ ...defaultFilters, sort: filters.sort });

  const chips = buildChips(filters, set);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <aside aria-label="Filters" className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Filters</h2>
            {active > 0 ? (
              <button type="button" onClick={clear} className="text-sm font-medium text-fg-muted underline-offset-4 hover:text-fg hover:underline">
                Clear all
              </button>
            ) : null}
          </div>
          <FilterForm idPrefix="desk" cards={cards} niches={niches} filters={filters} set={set} />
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <p className="text-sm text-fg-muted" aria-live="polite" aria-atomic="true">
            <strong className="font-semibold text-fg">{results.length}</strong> {results.length === 1 ? "business" : "businesses"}
            {filters.status === "available" ? " available" : filters.status === "sold" ? " sold" : ""}
          </p>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="lg:hidden" onClick={() => setSheetOpen(true)} aria-haspopup="dialog">
              <Icon name="filter" size={18} />
              Filters{active > 0 ? ` (${active})` : ""}
            </Button>
            <label className="flex items-center gap-2 text-sm text-fg-muted">
              <span className="hidden sm:inline">Sort by</span>
              <span className="sr-only sm:hidden">Sort by</span>
              <span className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => set({ sort: e.target.value as SortKey })}
                  className="h-11 appearance-none rounded-full border border-line-strong bg-surface pr-10 pl-4 text-sm font-medium text-fg transition hover:border-fg-subtle"
                >
                  {sortOptions.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Icon name="chevron-down" size={16} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-fg-muted" />
              </span>
            </label>
          </div>
        </div>

        {chips.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Active filters">
            {chips.map((chip) => (
              <li key={chip.key}>
                <button
                  type="button"
                  onClick={chip.remove}
                  aria-label={`Remove filter: ${chip.label}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface py-1.5 pr-2.5 pl-3.5 text-sm text-fg transition hover:border-fg-subtle"
                >
                  {chip.label}
                  <Icon name="x" size={14} className="text-fg-muted" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {results.length > 0 ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
            {results.map((c) => (
              <li key={c.slug}>{renderCard[c.slug]}</li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-card border border-dashed border-line-strong px-6 py-16 text-center">
            <p className="font-display text-title font-bold">No businesses match these filters</p>
            <p className="mx-auto mt-3 max-w-md text-fg-muted">New listings go up most weeks. Widen the price or revenue range, or clear the filters to see everything.</p>
            <Button variant="primary" className="mt-8" onClick={clear}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <Dialog open={sheetOpen} onClose={() => setSheetOpen(false)} labelledBy="filter-sheet-title" variant="sheet" closeLabel="Close filters">
        <div className="px-gutter pt-6 pb-4">
          <h2 id="filter-sheet-title" className="font-display text-title font-bold">
            Filters
          </h2>
          <FilterForm idPrefix="sheet" cards={cards} niches={niches} filters={filters} set={set} />
        </div>
        <div className="sticky bottom-0 flex gap-3 border-t border-line bg-surface px-gutter py-4">
          <Button variant="secondary" onClick={clear} disabled={active === 0} className="flex-1">
            Clear all
          </Button>
          <Button variant="primary" onClick={() => setSheetOpen(false)} className="flex-2">
            Show {results.length} {results.length === 1 ? "business" : "businesses"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function buildChips(f: ListingFilters, set: (p: Partial<ListingFilters>) => void) {
  const label = (ranges: Range[], key: string | null) => ranges.find((r) => r.key === key)?.label;
  const chips: { key: string; label: string; remove: () => void }[] = [];
  if (f.status !== "available") chips.push({ key: "status", label: f.status === "sold" ? "Sold only" : "Including sold", remove: () => set({ status: "available" }) });
  for (const n of f.niches) chips.push({ key: `niche-${n}`, label: n, remove: () => set({ niches: f.niches.filter((x) => x !== n) }) });
  if (f.price) chips.push({ key: "price", label: label(priceRanges, f.price) ?? f.price, remove: () => set({ price: null }) });
  if (f.revenue) chips.push({ key: "revenue", label: label(revenueRanges, f.revenue) ?? f.revenue, remove: () => set({ revenue: null }) });
  if (f.age) chips.push({ key: "age", label: label(ageRanges, f.age) ?? f.age, remove: () => set({ age: null }) });
  return chips;
}

interface FilterFormProps {
  idPrefix: string;
  cards: ListingCardData[];
  niches: Niche[];
  filters: ListingFilters;
  set: (p: Partial<ListingFilters>) => void;
}

function FilterForm({ idPrefix, cards, niches, filters, set }: FilterFormProps) {
  const statusCount = (s: StatusFilter) => (s === "all" ? cards.length : cards.filter((c) => c.status === s).length);
  const nicheCount = (n: Niche) => cards.filter((c) => c.niche === n && (filters.status === "all" || c.status === filters.status)).length;

  return (
    <form className="mt-6 divide-y divide-line border-t border-line" onSubmit={(e) => e.preventDefault()}>
      <Fieldset legend="Status">
        {(["available", "sold", "all"] as const).map((s) => (
          <Choice
            key={s}
            type="radio"
            name={`${idPrefix}-status`}
            checked={filters.status === s}
            onChange={() => set({ status: s })}
            label={s === "available" ? "Available" : s === "sold" ? "Sold" : "All"}
            count={statusCount(s)}
          />
        ))}
      </Fieldset>
      <Fieldset legend="Niche">
        {niches.map((n) => (
          <Choice
            key={n}
            type="checkbox"
            name={`${idPrefix}-niche`}
            checked={filters.niches.includes(n)}
            onChange={(checked) => set({ niches: checked ? [...filters.niches, n] : filters.niches.filter((x) => x !== n) })}
            label={n}
            count={nicheCount(n)}
          />
        ))}
      </Fieldset>
      <RangeGroup legend="Asking price" name={`${idPrefix}-price`} ranges={priceRanges} value={filters.price} onChange={(price) => set({ price })} />
      <RangeGroup legend="Monthly revenue" name={`${idPrefix}-revenue`} ranges={revenueRanges} value={filters.revenue} onChange={(revenue) => set({ revenue })} />
      <RangeGroup legend="Business age" name={`${idPrefix}-age`} ranges={ageRanges} value={filters.age} onChange={(age) => set({ age })} />
    </form>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="py-5">
      <legend className="float-left mb-3 w-full text-label font-semibold text-fg-subtle uppercase">{legend}</legend>
      <div className="clear-both space-y-1">{children}</div>
    </fieldset>
  );
}

function RangeGroup({ legend, name, ranges, value, onChange }: { legend: string; name: string; ranges: Range[]; value: string | null; onChange: (v: string | null) => void }) {
  return (
    <Fieldset legend={legend}>
      <Choice type="radio" name={name} checked={value === null} onChange={() => onChange(null)} label="Any" />
      {ranges.map((r) => (
        <Choice key={r.key} type="radio" name={name} checked={value === r.key} onChange={() => onChange(r.key)} label={r.label} />
      ))}
    </Fieldset>
  );
}

function Choice({ type, name, checked, onChange, label, count }: { type: "radio" | "checkbox"; name: string; checked: boolean; onChange: (checked: boolean) => void; label: string; count?: number }) {
  return (
    <label className={cn("flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm transition-colors hover:bg-surface-2", checked ? "text-fg" : "text-fg-muted")}>
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={cn("size-4 shrink-0 accent-accent", type === "radio" ? "rounded-full" : "rounded")}
      />
      <span className="flex-1">{label}</span>
      {count !== undefined ? <span className="text-xs text-fg-subtle tabular-nums">{count}</span> : null}
    </label>
  );
}
