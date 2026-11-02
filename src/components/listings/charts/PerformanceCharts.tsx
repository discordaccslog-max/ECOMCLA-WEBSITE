"use client";

import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, type TooltipContentProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { formatCurrency, formatCurrencyCompact, formatMonth, formatMonthAxis } from "@/lib/format";
import type { MonthRecord } from "@/lib/types";

const axisTick = { fill: "var(--color-fg-subtle)", fontSize: 12 };

function change(records: MonthRecord[], i: number, key: "revenue" | "adSpend") {
  if (i === 0) return null;
  const prev = records[i - 1][key];
  return ((records[i][key] - prev) / prev) * 100;
}

function TooltipCard({ active, payload, records, mode }: TooltipContentProps<ValueType, NameType> & { records: MonthRecord[]; mode: "revenue" | "adSpend" }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload as MonthRecord;
  const i = records.findIndex((r) => r.month === row.month);
  const delta = change(records, i, mode);
  return (
    <div className="min-w-48 rounded-xl border border-line-strong bg-surface-2 px-4 py-3 text-sm shadow-lift">
      <p className="font-semibold text-fg">{formatMonth(row.month)}</p>
      {mode === "revenue" ? (
        <dl className="mt-2 space-y-1">
          <Row swatch="bg-accent" label="Revenue" value={formatCurrency(row.revenue)} />
          <Row swatch="bg-fg" label="Profit" value={formatCurrency(row.profit)} line />
          <Row label="Ad spend" value={formatCurrency(row.adSpend)} />
        </dl>
      ) : (
        <dl className="mt-2 space-y-1">
          <Row swatch="bg-fg-muted" label="Ad spend" value={formatCurrency(row.adSpend)} />
          <Row label="Revenue per $1" value={`$${(row.revenue / row.adSpend).toFixed(2)}`} />
        </dl>
      )}
      {delta !== null ? (
        <p className="mt-2 border-t border-line pt-2 text-xs text-fg-muted">
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}% vs previous month
        </p>
      ) : null}
    </div>
  );
}

function Row({ swatch, label, value, line }: { swatch?: string; label: string; value: string; line?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <dt className="flex items-center gap-2 text-fg-muted">
        {swatch ? <span aria-hidden className={line ? `h-0.5 w-3 rounded-full ${swatch}` : `size-2.5 rounded-sm ${swatch}`} /> : <span className="w-3" />}
        {label}
      </dt>
      <dd className="font-semibold text-fg tabular-nums">{value}</dd>
    </div>
  );
}

export function RevenueChart({ records }: { records: MonthRecord[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={records} margin={{ top: 8, right: 4, bottom: 0, left: 0 }} barCategoryGap="22%">
        <CartesianGrid vertical={false} stroke="var(--color-line)" strokeWidth={1} />
        <XAxis dataKey="month" tickFormatter={formatMonthAxis} tick={axisTick} tickLine={false} axisLine={{ stroke: "var(--color-line-strong)" }} interval="preserveStartEnd" minTickGap={16} />
        <YAxis tickFormatter={formatCurrencyCompact} tick={axisTick} tickLine={false} axisLine={false} width={52} />
        <Tooltip
          cursor={{ fill: "var(--color-fg)", fillOpacity: 0.05 }}
          content={(props) => <TooltipCard {...props} records={records} mode="revenue" />}
          isAnimationActive={false}
        />
        <Bar dataKey="revenue" name="Revenue" fill="var(--color-accent)" radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false} />
        <Line
          dataKey="profit"
          name="Profit"
          type="linear"
          stroke="var(--color-fg)"
          strokeWidth={2}
          dot={{ r: 4, fill: "var(--color-fg)", stroke: "var(--color-surface)", strokeWidth: 2 }}
          activeDot={{ r: 5, fill: "var(--color-fg)", stroke: "var(--color-surface)", strokeWidth: 2 }}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function AdSpendChart({ records }: { records: MonthRecord[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={records} margin={{ top: 8, right: 4, bottom: 0, left: 0 }} barCategoryGap="22%">
        <CartesianGrid vertical={false} stroke="var(--color-line)" strokeWidth={1} />
        <XAxis dataKey="month" tickFormatter={formatMonthAxis} tick={axisTick} tickLine={false} axisLine={{ stroke: "var(--color-line-strong)" }} interval="preserveStartEnd" minTickGap={16} />
        <YAxis tickFormatter={formatCurrencyCompact} tick={axisTick} tickLine={false} axisLine={false} width={52} />
        <Tooltip
          cursor={{ fill: "var(--color-fg)", fillOpacity: 0.05 }}
          content={(props) => <TooltipCard {...props} records={records} mode="adSpend" />}
          isAnimationActive={false}
        />
        <Bar dataKey="adSpend" name="Ad spend" fill="var(--color-fg-muted)" radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
