import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResponseTime } from "@/components/ui/ResponseTime";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { getIncluded } from "@/lib/included";

export const metadata: Metadata = {
  title: "What's included",
  description:
    "Exactly what comes with every EcomCla business: the store build, ad creatives and video assets, social accounts, supplier and fulfilment setup, and 60 days of support. And what doesn't.",
  alternates: { canonical: "/whats-included" },
  openGraph: { url: "/whats-included", title: "What's included — EcomCla" },
};

function ProvidedLists({ provided, notProvided }: { provided: readonly string[]; notProvided: readonly string[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
      <div className="bg-base p-6 sm:p-8">
        <h3 className="flex items-center gap-2 text-label font-bold text-fg uppercase">
          <Icon name="check" size={16} className="text-accent" /> Provided
        </h3>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-fg">
          {provided.map((p) => (
            <li key={p} className="flex gap-3">
              <Icon name="check" size={16} className="mt-0.5 shrink-0 text-fg-subtle" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-base p-6 sm:p-8">
        <h3 className="flex items-center gap-2 text-label font-bold text-fg uppercase">
          <Icon name="x" size={16} className="text-fg-muted" /> Not provided
        </h3>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-fg">
          {notProvided.map((p) => (
            <li key={p} className="flex gap-3">
              <Icon name="minus" size={16} className="mt-0.5 shrink-0 text-fg-subtle" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SectionIntro({ index, title, figure, figureLabel, summary, id }: { index: number; title: string; figure: string; figureLabel: string; summary: string; id: string }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Eyebrow>{String(index).padStart(2, "0")} / 05</Eyebrow>
        <h2 id={`${id}-title`} className="mt-5 font-display text-display font-extrabold">{title}</h2>
        <p className="mt-5 max-w-xl text-lead text-fg-muted">{summary}</p>
      </div>
      <div className="lg:col-span-5 lg:text-right">
        <p className="font-display text-display-lg font-extrabold text-accent tabular-nums">{figure}</p>
        <p className="mt-1 text-sm text-fg-subtle">{figureLabel}</p>
      </div>
    </div>
  );
}

export default function WhatsIncludedPage() {
  const { store, creatives, social, supplier, support } = getIncluded();
  const nav = [store, creatives, social, supplier, support];

  return (
    <>
      <PageHeader
        eyebrow="What's included"
        title="Everything the business runs on, handed over. And a plain list of what isn't."
        lead="These are the standards every EcomCla business meets. Exact quantities for each business, such as follower counts and the number of creatives, are on its listing."
      >
        <nav aria-label="Sections">
          <ul className="flex flex-wrap gap-2">
            {nav.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-fg-muted transition hover:border-fg-subtle hover:text-fg">
                  <span className="text-fg-subtle tabular-nums">0{i + 1}</span> {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {/* 01 — Store build: an annotated storefront */}
      <section id={store.id} aria-labelledby={`${store.id}-title`} className="scroll-mt-20 py-section">
        <Container>
          <SectionIntro index={1} {...store} />
          <Reveal className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7" aria-hidden>
              <div className="overflow-hidden rounded-card border border-line-strong bg-surface shadow-lift">
                <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                  <span className="size-2.5 rounded-full bg-line-strong" />
                  <span className="size-2.5 rounded-full bg-line-strong" />
                  <span className="size-2.5 rounded-full bg-line-strong" />
                  <span className="ml-3 h-6 flex-1 rounded-full bg-surface-3" />
                </div>
                <div className="relative p-5 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="h-4 w-28 rounded bg-fg/70" />
                    <span className="flex gap-3">
                      <span className="h-2.5 w-10 rounded bg-fg/25" />
                      <span className="h-2.5 w-10 rounded bg-fg/25" />
                      <span className="h-2.5 w-10 rounded bg-fg/25" />
                    </span>
                  </div>
                  <div className="mt-6 grid grid-cols-5 gap-4 rounded-xl bg-surface-3 p-5 sm:p-8">
                    <div className="col-span-3 space-y-3">
                      <span className="block h-5 w-11/12 rounded bg-fg/70" />
                      <span className="block h-5 w-2/3 rounded bg-fg/70" />
                      <span className="block h-2.5 w-1/2 rounded bg-fg/25" />
                      <span className="mt-5 block h-8 w-28 rounded-full bg-accent" />
                    </div>
                    <span className="col-span-2 aspect-square rounded-full bg-fg/10" />
                  </div>
                  <div className="mt-5 grid grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className="aspect-4/5 rounded-lg bg-surface-3" />
                    ))}
                  </div>
                  {[
                    ["top-16 left-6", 1],
                    ["top-36 right-1/3", 2],
                    ["bottom-12 left-1/4", 3],
                  ].map(([pos, n]) => (
                    <span key={n} className={cn("absolute grid size-7 place-items-center rounded-full bg-accent font-display text-xs font-extrabold text-accent-ink ring-4 ring-base", pos as string)}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ol className="space-y-5 lg:col-span-5">
              {store.features.map((f, i) => (
                <li key={f.label} className="flex gap-4">
                  <span className={cn("grid size-7 shrink-0 place-items-center rounded-full font-display text-xs font-extrabold", i < 3 ? "bg-accent text-accent-ink" : "border border-line-strong text-fg-muted")}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold">{f.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="mt-14">
            <ProvidedLists provided={store.provided} notProvided={store.notProvided} />
          </div>
        </Container>
      </section>

      {/* 02 — Creatives: the formats, as frames */}
      <section id={creatives.id} aria-labelledby={`${creatives.id}-title`} className="scroll-mt-20 border-y border-line bg-surface py-section">
        <Container>
          <SectionIntro index={2} {...creatives} />
          <Reveal className="mt-14">
            <ul className="flex items-end gap-4 overflow-x-auto pb-2 sm:gap-6" aria-label="Ad formats supplied">
              {creatives.formats.map((f, i) => (
                <li key={f.ratio} className={cn("shrink-0", i === 0 ? "w-28 sm:w-36" : i === 3 ? "w-52 sm:w-72" : "w-36 sm:w-48")}>
                  <div className={cn("relative grid place-items-center overflow-hidden rounded-xl border border-line-strong bg-base", f.aspect)}>
                    <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
                    {i % 2 === 0 ? (
                      <span aria-hidden className="relative grid size-10 place-items-center rounded-full bg-fg/90 text-base">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5v11l9-5.5z" /></svg>
                      </span>
                    ) : (
                      <span aria-hidden className="relative h-1/3 w-1/2 rounded-md bg-fg/10" />
                    )}
                  </div>
                  <p className="mt-3 font-display text-lg font-bold tabular-nums">{f.ratio}</p>
                  <p className="text-sm text-fg-subtle">{f.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="mt-14">
            <ProvidedLists provided={creatives.provided} notProvided={creatives.notProvided} />
          </div>
        </Container>
      </section>

      {/* 03 — Social: a transfer ledger */}
      <section id={social.id} aria-labelledby={`${social.id}-title`} className="scroll-mt-20 py-section">
        <Container>
          <SectionIntro index={3} {...social} />
          <Reveal className="mt-14 overflow-hidden rounded-card border border-line">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Social accounts and how each transfers</caption>
              <thead className="bg-surface text-label font-semibold text-fg-subtle uppercase">
                <tr>
                  <th scope="col" className="px-5 py-4 sm:px-8">Platform</th>
                  <th scope="col" className="px-5 py-4 sm:px-8">What transfers</th>
                  <th scope="col" className="hidden px-8 py-4 md:table-cell">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {social.platforms.map((p) => (
                  <tr key={p.name}>
                    <th scope="row" className="px-5 py-5 font-display text-base font-bold text-fg sm:px-8">{p.name}</th>
                    <td className="px-5 py-5 text-fg sm:px-8">
                      {p.what}
                      <span className="mt-1 block text-fg-subtle md:hidden">{p.note}</span>
                    </td>
                    <td className="hidden px-8 py-5 text-fg-muted md:table-cell">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <div className="mt-14">
            <ProvidedLists provided={social.provided} notProvided={social.notProvided} />
          </div>
        </Container>
      </section>

      {/* 04 — Supplier: the order flow */}
      <section id={supplier.id} aria-labelledby={`${supplier.id}-title`} className="scroll-mt-20 border-y border-line bg-surface py-section">
        <Container>
          <SectionIntro index={4} {...supplier} />
          <Reveal className="mt-14">
            <ol className="grid gap-3 md:grid-cols-4 md:gap-0" aria-label="Order flow">
              {supplier.flow.map((s, i) => (
                <li key={s.node} className="relative flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                  <div className="w-full rounded-card border border-line-strong bg-base p-5 md:mr-8">
                    <p className="text-label font-semibold text-fg-subtle uppercase">Step {i + 1}</p>
                    <p className="mt-2 font-display text-lg font-bold">{s.node}</p>
                    <p className="mt-1 text-sm text-fg-muted">{s.detail}</p>
                  </div>
                  {i < supplier.flow.length - 1 ? (
                    <Icon name="arrow-right" size={20} className="absolute top-1/2 -right-1 hidden -translate-y-1/2 text-accent md:block" />
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="mt-14">
            <ProvidedLists provided={supplier.provided} notProvided={supplier.notProvided} />
          </div>
        </Container>
      </section>

      {/* 05 — Support: a 60-day calendar */}
      <section id={support.id} aria-labelledby={`${support.id}-title`} className="scroll-mt-20 py-section">
        <Container>
          <SectionIntro index={5} {...support} />
          <Reveal className="mt-14 rounded-card border border-line bg-surface p-6 sm:p-10">
            <ol className="grid gap-6 md:grid-cols-4">
              {support.timeline.slice(0, 4).map((t) => (
                <li key={t.when} className="border-t-2 border-accent pt-4">
                  <p className="font-display text-xl font-extrabold">{t.when}</p>
                  <p className="mt-2 text-sm text-fg-muted">{t.what}</p>
                </li>
              ))}
            </ol>
            {support.timeline[4] ? (
              <div className="mt-8 flex flex-col gap-2 rounded-xl border border-line-strong bg-base px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display font-bold">{support.timeline[4].when}</p>
                <p className="text-sm text-fg-muted">{support.timeline[4].what}</p>
              </div>
            ) : null}
          </Reveal>
          <div className="mt-14">
            <ProvidedLists provided={support.provided} notProvided={support.notProvided} />
          </div>
        </Container>
      </section>

      <Container className="pb-section">
        <div className="flex flex-col gap-8 rounded-card border border-line bg-surface p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-display font-extrabold">See it on a real listing.</h2>
            <p className="mt-3 max-w-xl text-fg-muted">Every listing breaks down exactly what transfers, with counts, and what doesn&rsquo;t.</p>
            <ResponseTime className="mt-5" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/listings" size="lg">Browse listings</ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary" icon={null}>Ask a question</ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
