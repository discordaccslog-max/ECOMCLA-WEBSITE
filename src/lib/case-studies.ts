import { caseStudies } from "@/data/case-studies";
import type { CaseStudy, Figure } from "./types";

export function getCaseStudies(): CaseStudy[] {
  return caseStudies;
}

/** Month-one and latest-month revenue, each with its own period. */
export function getCaseStudyHighlights(c: CaseStudy): { first: Figure; latest: Figure } {
  const first = c.months[0];
  const latest = c.months[c.months.length - 1];
  return {
    first: { value: first.revenue, unit: "currency", period: { kind: "month", month: first.month } },
    latest: { value: latest.revenue, unit: "currency", period: { kind: "month", month: latest.month } },
  };
}
