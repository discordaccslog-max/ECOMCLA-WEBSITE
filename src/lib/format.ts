import type { Figure, IsoDate, IsoMonth, Period } from "./types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currencyWhole = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const currencyCents = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatCurrency(value: number, opts: { cents?: boolean } = {}): string {
  return (opts.cents ? currencyCents : currencyWhole).format(value);
}

/** $52.5k style, for tight spaces such as filter chips and chart axes. */
export function formatCurrencyCompact(value: number): string {
  if (Math.abs(value) >= 1000) {
    const k = value / 1000;
    return `$${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  return formatCurrency(value);
}

export function formatInteger(value: number): string {
  return integer.format(value);
}

export function formatPercent(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}

export function formatMonth(month: IsoMonth, style: "short" | "long" = "long"): string {
  const [y, m] = month.split("-").map(Number);
  return `${(style === "long" ? MONTHS_LONG : MONTHS)[m - 1]} ${y}`;
}

export function formatMonthAxis(month: IsoMonth): string {
  const [y, m] = month.split("-").map(Number);
  return `${MONTHS[m - 1]} ’${String(y).slice(2)}`;
}

export function formatDate(date: IsoDate): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${d} ${MONTHS_LONG[m - 1]} ${y}`;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

export function formatPeriod(period: Period): string {
  switch (period.kind) {
    case "trailing-months":
      return `Trailing ${period.months} months to ${formatMonth(period.through, "short")}`;
    case "trailing-days":
      return `Trailing ${period.days} days`;
    case "month":
      return formatMonth(period.month);
    case "lifetime":
      return `Since ${formatMonth(period.since, "short")}`;
    case "as-of":
      return `As of ${formatDate(period.date)}`;
  }
}

export function formatFigure(figure: Figure, opts: { cents?: boolean } = {}): string {
  switch (figure.unit) {
    case "currency":
      return formatCurrency(figure.value, opts);
    case "percent":
      return formatPercent(figure.value, 1);
    case "multiple":
      return `${figure.value.toFixed(1)}×`;
    case "months":
      return `${figure.value} mo`;
    case "duration-minutes":
      return formatDuration(figure.value);
    case "count":
      return formatInteger(figure.value);
  }
}

/** Whole months between an ISO month and a reference month (inclusive of the first). */
export function monthsBetween(from: IsoMonth, to: IsoMonth): number {
  const [fy, fm] = from.split("-").map(Number);
  const [ty, tm] = to.split("-").map(Number);
  return (ty - fy) * 12 + (tm - fm) + 1;
}
