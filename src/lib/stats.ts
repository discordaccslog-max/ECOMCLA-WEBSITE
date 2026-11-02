import raw from "@/data/stats.json";
import { cacheLife } from "next/cache";
import { formatDate } from "./format";
import type { RevenueStat } from "./types";

/**
 * The live revenue stat. Today it reads /src/data/stats.json. To wire it to a
 * real source, set STATS_SOURCE_URL (see README, "Live revenue stat"):
 * getRevenueStat() will fetch it, cached for a day, and fall back to the JSON
 * if the request fails.
 */

function assertStat(v: unknown): asserts v is RevenueStat {
  const s = v as Partial<RevenueStat>;
  if (typeof s.value !== "number" || typeof s.sampleSize !== "number" || typeof s.lastUpdated !== "string" || typeof s.label !== "string") {
    throw new Error("stats.json is invalid: label, value, sampleSize and lastUpdated are required");
  }
}

assertStat(raw);
const fallback: RevenueStat = raw;

export async function getRevenueStat(): Promise<RevenueStat> {
  "use cache";
  cacheLife("days");
  const url = process.env.STATS_SOURCE_URL;
  if (!url) return fallback;
  try {
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) return fallback;
    const data: unknown = await res.json();
    assertStat(data);
    return { ...fallback, ...data, source: { kind: "remote", url } };
  } catch {
    return fallback;
  }
}

export function describeStat(stat: RevenueStat) {
  return {
    lastUpdatedLabel: formatDate(stat.lastUpdated),
    sampleLabel: `${stat.sampleSize.toLocaleString("en-US")} ${stat.sampleDescription}`,
  };
}
