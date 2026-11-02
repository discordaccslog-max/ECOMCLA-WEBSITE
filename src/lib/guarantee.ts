import raw from "@/data/guarantee.json";
import { formatCurrency, formatDate } from "./format";
import type { Clause, GuaranteeTerms } from "./types";

/**
 * The single source for the revenue guarantee. The homepage seal, the compact
 * seal on listings, the checkout reminder, Stripe's pay-button message and
 * /guarantee all render from here, so the terms cannot drift between them.
 *
 * Clause text may reference top-level numbers as {periodDays},
 * {claimWindowDays}, {reviewTimeBusinessDays}, {refundTimingBusinessDays}
 * and {thresholdAmount}; they are filled in below.
 */

function assertTerms(value: unknown): asserts value is GuaranteeTerms {
  const v = value as Partial<GuaranteeTerms>;
  const problems: string[] = [];
  if (typeof v.thresholdAmount !== "number" || v.thresholdAmount <= 0) problems.push("thresholdAmount");
  if (v.currency !== "USD") problems.push("currency");
  if (typeof v.periodDays !== "number" || v.periodDays <= 0) problems.push("periodDays");
  if (v.refundType !== "full-purchase-price") problems.push("refundType");
  if (!Array.isArray(v.qualifyingConditions) || v.qualifyingConditions.length === 0) problems.push("qualifyingConditions");
  if (!Array.isArray(v.exclusions) || v.exclusions.length === 0) problems.push("exclusions");
  if (typeof v.claimWindowDays !== "number") problems.push("claimWindowDays");
  if (!Array.isArray(v.claimProcess) || v.claimProcess.length === 0) problems.push("claimProcess");
  if (!Array.isArray(v.evidenceRequired)) problems.push("evidenceRequired");
  if (typeof v.lastUpdated !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v.lastUpdated)) problems.push("lastUpdated");
  if (problems.length) throw new Error(`guarantee.json is invalid: check ${problems.join(", ")}`);
}

assertTerms(raw);
const source: GuaranteeTerms = raw;

const tokens: Record<string, string> = {
  periodDays: String(source.periodDays),
  claimWindowDays: String(source.claimWindowDays),
  reviewTimeBusinessDays: String(source.reviewTimeBusinessDays),
  refundTimingBusinessDays: String(source.refundTimingBusinessDays),
  thresholdAmount: formatCurrency(source.thresholdAmount),
};

function fill(text: string): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => {
    if (!(key in tokens)) throw new Error(`guarantee.json references unknown value {${key}}`);
    return tokens[key];
  });
}

const fillClause = (c: Clause): Clause => ({ ...c, title: fill(c.title), detail: fill(c.detail) });

const terms: GuaranteeTerms = {
  ...source,
  revenueDefinition: fill(source.revenueDefinition),
  qualifyingConditions: source.qualifyingConditions.map(fillClause),
  exclusions: source.exclusions.map(fillClause),
  claimProcess: source.claimProcess.map((s) => ({ title: fill(s.title), detail: fill(s.detail) })),
  evidenceRequired: source.evidenceRequired.map(fill),
};

const refundLabels: Record<GuaranteeTerms["refundType"], string> = {
  "full-purchase-price": "the full purchase price",
};

export function getGuarantee(): GuaranteeTerms {
  return terms;
}

export interface GuaranteeSummary {
  amount: number;
  amountLabel: string;
  periodDays: number;
  periodLabel: string;
  refundLabel: string;
  promise: string;
  claimWindowLabel: string;
  lastUpdatedLabel: string;
}

export function getGuaranteeSummary(): GuaranteeSummary {
  const amountLabel = formatCurrency(terms.thresholdAmount);
  const refundLabel = refundLabels[terms.refundType];
  return {
    amount: terms.thresholdAmount,
    amountLabel,
    periodDays: terms.periodDays,
    periodLabel: `in your first ${terms.periodDays} days`,
    refundLabel,
    promise: `If your business doesn’t generate at least ${amountLabel} in revenue in your first ${terms.periodDays} days, we refund ${refundLabel}.`,
    claimWindowLabel: `${terms.claimWindowDays} days after the period ends`,
    lastUpdatedLabel: formatDate(terms.lastUpdated),
  };
}

/** A worked example of the claim window, computed from the terms (fixed example start date). */
export function getClaimWindowExample() {
  const day = 86_400_000;
  const start = Date.UTC(2027, 2, 1);
  const label = (t: number) => new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "UTC" });
  const periodEnd = start + (terms.periodDays - 1) * day;
  return {
    start: label(start),
    periodEnd: label(periodEnd),
    claimOpens: label(periodEnd + day),
    claimCloses: label(periodEnd + terms.claimWindowDays * day),
  };
}

/** Plain-text summary for Stripe Checkout's message above the Pay button (max 1,200 chars). */
export function getGuaranteeCheckoutMessage(termsUrl: string): string {
  const s = getGuaranteeSummary();
  const conditions = terms.qualifyingConditions.map((c) => c.title.toLowerCase()).join("; ");
  const message = `Revenue guarantee: ${s.promise} Conditions: ${conditions}. Full terms: ${termsUrl}`;
  return message.length <= 1200 ? message : `Revenue guarantee: ${s.promise} Full terms: ${termsUrl}`;
}
