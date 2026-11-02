import raw from "@/data/award.json";
import type { Award } from "./types";

const award: Award = raw;

const ordinal = (n: number) => `#${n}`;

export function getAward() {
  return {
    ...award,
    rankLabel: ordinal(award.rank),
    /** Rendered as a link only when a real announcement URL is set in award.json. */
    sourceUrl: award.sourceUrl.trim() || null,
  };
}
