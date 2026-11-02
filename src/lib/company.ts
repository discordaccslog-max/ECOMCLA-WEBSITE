import { company } from "@/data/company";
import { formatFigure, formatPeriod } from "./format";
import type { Company } from "./types";

export function getCompany(): Company {
  return company;
}

/** "1 hr 48 min" with its period, for the response-time line beside every contact CTA. */
export function getResponseTime() {
  return {
    figure: company.responseTime,
    value: formatFigure(company.responseTime),
    period: formatPeriod(company.responseTime.period),
  };
}

export function getSupportHoursLine(): string {
  const { days, hours, timezone } = company.supportHours;
  return `${days}, ${hours} ${timezone}`;
}

export function getAddressLines(): string[] {
  const a = company.address;
  return [a.line1, a.line2, `${a.city}, ${a.region} ${a.postalCode}`, a.country].filter(Boolean) as string[];
}
