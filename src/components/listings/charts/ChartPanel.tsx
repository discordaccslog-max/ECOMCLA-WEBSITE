"use client";

import dynamic from "next/dynamic";
import { formatCurrency, formatMonth } from "@/lib/format";
import type { MonthRecord } from "@/lib/types";

// Recharts loads after the page; the fixed-height frame below reserves its space so nothing shifts.
const RevenueChart = dynamic(() => import("./PerformanceCharts").then((m) => m.RevenueChart), { ssr: false });
const AdSpendChart = dynamic(() => import("./PerformanceCharts").then((m) => m.AdSpendChart), { ssr: false });

interface ChartPanelProps {
  kind: "revenue" | "adSpend";
  records: MonthRecord[];
  title: string;
  description: string;
  id: string;
}

export function ChartPanel({ kind, records, title, description, id }: ChartPanelProps) {
  const Chart = kind === "revenue" ? RevenueChart : AdSpendChart;
  return (
    <figure aria-labelledby={`${id}-title`} aria-describedby={`${id}-desc`} className="rounded-card border border-line bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 id={`${id}-title`} className="font-display text-xl font-bold">{title}</h3>
          <p id={`${id}-desc`} className="mt-1 text-sm text-fg-muted">{description}</p>
        </div>
        {kind === "revenue" ? (
          <ul className="flex gap-5 text-sm text-fg-muted" aria-label="Legend">
            <li className="flex items-center gap-2"><span aria-hidden className="size-3 rounded-sm bg-accent" />Revenue</li>
            <li className="flex items-center gap-2"><span aria-hidden className="h-0.5 w-4 rounded-full bg-fg" />Profit</li>
          </ul>
        ) : null}
      </div>
      <div className="mt-6 h-72 sm:h-80" role="img" aria-label={`${title}, ${records.length} months. Full figures are in the table below.`}>
        <Chart records={records} />
      </div>
      <details className="group mt-5 border-t border-line pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-fg-muted hover:text-fg">
          View as table
        </summary>
        <div className="mt-4 max-h-80 overflow-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{title} by month</caption>
            <thead className="sticky top-0 bg-surface text-label text-fg-subtle uppercase">
              <tr>
                <th scope="col" className="py-2 pr-4 font-semibold">Month</th>
                <th scope="col" className="py-2 pr-4 text-right font-semibold">Revenue</th>
                <th scope="col" className="py-2 pr-4 text-right font-semibold">Profit</th>
                <th scope="col" className="py-2 text-right font-semibold">Ad spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line tabular-nums">
              {records.map((r) => (
                <tr key={r.month}>
                  <th scope="row" className="py-2 pr-4 font-normal text-fg-muted">{formatMonth(r.month)}</th>
                  <td className="py-2 pr-4 text-right text-fg">{formatCurrency(r.revenue)}</td>
                  <td className="py-2 pr-4 text-right text-fg">{formatCurrency(r.profit)}</td>
                  <td className="py-2 text-right text-fg">{formatCurrency(r.adSpend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
