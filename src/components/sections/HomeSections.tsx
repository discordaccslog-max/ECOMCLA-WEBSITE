import Image from "next/image";
import Link from "next/link";
import { ListingCard } from "@/components/listings/ListingCard";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FigureValue } from "@/components/ui/FigureValue";
import { Icon } from "@/components/ui/Icon";
import { SampleTag } from "@/components/ui/SampleTag";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getAward } from "@/lib/award";
import { getCaseStudies, getCaseStudyHighlights } from "@/lib/case-studies";
import { formatCurrency, formatMonth, formatMonthAxis } from "@/lib/format";
import { getIncludedSummary } from "@/lib/included";
import { getAvailableListings, getFeaturedListings, toCardData } from "@/lib/listings";
import { getThreeSteps } from "@/lib/process";
import { getTestimonials, purchasedLabel } from "@/lib/testimonials";

/* ------------------------------------------------------------------ */

export function ThreeSteps() {
  const steps = getThreeSteps();
  return (
    <Section aria-labelledby="steps-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="steps-title" eyebrow="How it works" title="Three steps from listing to launch." />
        <TextLink href="/how-it-works" className="shrink-0 text-fg-muted hover:text-fg">
          The full process, including escrow
          <Icon name="arrow-right" size={18} />
        </TextLink>
      </div>
      <ol className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.08} className="bg-base p-8 lg:p-10">
            <span className="font-display text-display-lg font-extrabold text-fg-subtle/60 tabular-nums">0{i + 1}</span>
            <h3 className="mt-8 font-display text-title font-bold">{step.title}</h3>
            <p className="mt-4 leading-relaxed text-fg-muted">{step.detail}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function FeaturedListings() {
  const featured = getFeaturedListings(3).map(toCardData);
  const total = getAvailableListings().length;
  return (
    <Section aria-labelledby="featured-title" className="border-t border-line">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="featured-title"
          eyebrow="Available now"
          title="Verified businesses, ready to hand over."
          lead="Every figure states the period it covers. Every chart shows every month."
        />
        <ButtonLink href="/listings" variant="secondary" className="shrink-0">
          View all {total} businesses
        </ButtonLink>
      </div>
      <ul className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((l, i) => (
          <Reveal as="li" key={l.slug} delay={i * 0.08}>
            <ListingCard listing={l} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function AwardBand() {
  const award = getAward();
  return (
    <section aria-labelledby="award-title" className="relative isolate overflow-hidden border-y border-silver-lo/40 bg-steel">
      <div aria-hidden className="absolute inset-0 -z-10 bg-brushed-steel" />
      <Container className="py-section-sm">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex items-center gap-8 lg:col-span-5">
            <p className="font-display text-stat font-extrabold text-silver-gradient" aria-hidden>
              {award.rankLabel}
            </p>
            <div className="h-20 w-px bg-silver-lo/50" aria-hidden />
            <div>
              <p className="text-label font-bold text-silver uppercase">Ranked &amp; selected</p>
              <p className="mt-2 font-display text-lg font-bold text-silver-hi">{award.year}</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 id="award-title" className="font-display text-title font-bold text-silver-hi">
              <span className="sr-only">Ranked and selected {award.rankLabel}, </span>
              {award.year} {award.awardName}
            </h2>
            <p className="mt-2 text-silver">{award.category} category</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-silver">{award.thankYou}</p>
            {award.sourceUrl ? (
              <a href={award.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-silver-hi underline underline-offset-4">
                View the announcement from {award.awardingBody}
                <Icon name="arrow-up-right" size={16} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function IncludedSummary() {
  const items = getIncludedSummary();
  return (
    <Section aria-labelledby="included-title">
      <SectionHeading
        id="included-title"
        eyebrow="What's included"
        title="Everything the business needs to keep selling."
        lead="And a plain list of what isn't, on every listing. The standards below apply to every business we sell."
      />
      <ul className="mt-16 grid gap-4 md:grid-cols-6">
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={item.id}
            delay={i * 0.06}
            className={i < 2 ? "md:col-span-3" : "md:col-span-2"}
          >
            <Link
              href={`/whats-included#${item.id}`}
              className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-line-strong motion-reduce:hover:translate-y-0"
            >
              <p className="font-display text-display font-extrabold text-fg tabular-nums">{item.figure}</p>
              <p className="mt-1 text-sm text-fg-subtle">{item.figureLabel}</p>
              <h3 className="mt-8 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-fg group-hover:text-accent">
                What is and isn&rsquo;t included
                <Icon name="arrow-right" size={16} />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function CaseStudyTeaser() {
  const study = getCaseStudies().find((c) => c.setback) ?? getCaseStudies()[0];
  const h = getCaseStudyHighlights(study);
  const max = Math.max(...study.months.map((m) => m.revenue));
  return (
    <Section aria-labelledby="case-teaser-title" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            id="case-teaser-title"
            eyebrow="Case study"
            title={study.headline}
            lead={study.summary}
          />
          <div className="mt-8 flex items-center gap-4">
            <Image src={study.buyerPhoto.src} alt="" width={56} height={56} className="size-14 rounded-full" />
            <div>
              <p className="font-semibold text-fg">
                {study.buyerName} <SampleTag sample={study.sample} />
              </p>
              <p className="text-sm text-fg-muted">
                Bought {study.businessName} in {formatMonth(study.purchasedMonth)} for {formatCurrency(study.purchasePrice)}
              </p>
            </div>
          </div>
          <ButtonLink href={`/case-studies#${study.slug}`} variant="secondary" className="mt-10">
            Read what happened
          </ButtonLink>
        </div>

        <Reveal className="lg:col-span-6">
          <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
            {study.setback ? (
              <div className="flex gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4">
                <Icon name="alert" size={20} className="mt-0.5 shrink-0 text-danger" />
                <div>
                  <p className="font-semibold text-fg">{study.setback.title}</p>
                  <p className="mt-1 text-sm text-fg-muted">{study.setback.cost}</p>
                </div>
              </div>
            ) : null}
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <FigureValue label="Month one revenue" figure={h.first} />
              <FigureValue label="Latest month" figure={h.latest} highlight />
            </dl>
            <div className="mt-8" aria-hidden>
              <div className="flex h-32 items-end gap-3">
                {study.months.map((m, i) => (
                  <div
                    key={m.month}
                    className={i === study.months.length - 1 ? "flex-1 rounded-t-sm bg-accent" : "flex-1 rounded-t-sm bg-fg/20"}
                    style={{ height: `${(m.revenue / max) * 100}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex gap-3 text-xs text-fg-subtle">
                {study.months.map((m) => (
                  <span key={m.month} className="flex-1 text-center">{formatMonthAxis(m.month)}</span>
                ))}
              </div>
            </div>
            <p className="sr-only">
              Monthly revenue: {study.months.map((m) => `${formatMonth(m.month)} ${formatCurrency(m.revenue)}`).join(", ")}.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function Testimonials() {
  const items = getTestimonials();
  return (
    <Section aria-labelledby="testimonials-title" className="border-t border-line">
      <SectionHeading id="testimonials-title" eyebrow="From buyers" title="In their words, with their names on it." />
      <ul className="mt-16 grid gap-6 md:grid-cols-2">
        {items.map((t, i) => (
          <Reveal as="li" key={t.fullName} delay={(i % 2) * 0.08}>
            <figure className="flex h-full flex-col rounded-card border border-line bg-surface p-7 sm:p-9">
              <blockquote className="flex-1 text-lg leading-relaxed text-fg">
                <p>&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <Image src={t.photo.src} alt={`Portrait of ${t.fullName}`} width={56} height={56} className="size-14 shrink-0 rounded-full" />
                <div className="min-w-0">
                  <p className="font-semibold text-fg">
                    {t.fullName} <SampleTag sample={t.sample} />
                  </p>
                  <p className="text-sm text-fg-muted">{t.location}</p>
                  <p className="mt-1 text-sm text-fg-subtle">
                    {t.listingSlug ? (
                      <Link href={`/listings/${t.listingSlug}`} className="underline decoration-line-strong underline-offset-4 hover:text-fg">
                        {t.businessName}
                      </Link>
                    ) : (
                      t.businessName
                    )}{" "}
                    · {purchasedLabel(t)}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
