import { CountUp } from "@/components/motion/CountUp";
import { Container } from "@/components/ui/Container";
import { describeStat, getRevenueStat } from "@/lib/stats";

/**
 * The live revenue stat. Reads from lib/stats (stats.json today, a remote
 * source once STATS_SOURCE_URL is set). The CountUp reserves the final
 * width, so there is no layout shift as it animates.
 */
export async function LiveStatBand() {
  const stat = await getRevenueStat();
  const d = describeStat(stat);

  return (
    <section aria-labelledby="live-stat-label" className="relative isolate overflow-hidden border-y border-line bg-surface">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <Container className="py-section">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-label font-bold text-accent uppercase">
              <span className="relative flex size-2" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Live — updates {stat.updateFrequency}
            </p>
            <h2 id="live-stat-label" className="mt-6 max-w-md font-display text-title font-bold text-fg">
              {stat.label}
            </h2>
          </div>
          <p className="font-display text-stat font-extrabold text-accent lg:col-span-7 lg:text-right">
            <CountUp value={stat.value} format="currency-cents" duration={2} />
          </p>
        </div>

        <dl className="mt-12 grid gap-6 border-t border-line pt-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-label font-semibold text-fg-subtle uppercase">Sample size</dt>
            <dd className="mt-2 text-fg">{d.sampleLabel}</dd>
          </div>
          <div>
            <dt className="text-label font-semibold text-fg-subtle uppercase">Last updated</dt>
            <dd className="mt-2 text-fg">
              <time dateTime={stat.lastUpdated}>{d.lastUpdatedLabel}</time>
            </dd>
          </div>
          <div>
            <dt className="text-label font-semibold text-fg-subtle uppercase">How it&rsquo;s measured</dt>
            <dd className="mt-2 text-fg-muted">{stat.measurement}</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
