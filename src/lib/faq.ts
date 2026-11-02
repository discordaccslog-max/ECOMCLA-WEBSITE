import { buyerProtection } from "@/data/buyer-protection";
import { faq } from "@/data/faq";
import { getGuaranteeSummary } from "./guarantee";
import { getEscrow } from "./process";
import type { FaqItem } from "./types";

function buildTokens(): Record<string, string> {
  const g = getGuaranteeSummary();
  const e = getEscrow();
  return {
    guaranteeAmount: g.amountLabel,
    guaranteePeriodDays: String(g.periodDays),
    inspectionDays: String(e.inspectionPeriodDays),
    escrowProvider: e.provider.name,
    transferWindowDays: String(buyerProtection.transferWindowDays),
  };
}

export function getFaq(): FaqItem[] {
  const tokens = buildTokens();
  const fill = (s: string) =>
    s.replace(/\{(\w+)\}/g, (m, k: string) => {
      if (!(k in tokens)) throw new Error(`faq.ts references unknown value {${k}}`);
      return tokens[k];
    });
  return faq.map((item) => ({ ...item, question: fill(item.question), answer: item.answer.map(fill) }));
}
