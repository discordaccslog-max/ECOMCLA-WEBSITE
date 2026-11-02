import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { EscrowFlow } from "@/components/process/EscrowFlow";
import { Timeline } from "@/components/process/Timeline";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResponseTime } from "@/components/ui/ResponseTime";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getGuaranteeSummary } from "@/lib/guarantee";
import { getDueDiligenceItems, getEscrow, getFirstFortyEightHours, getThreeSteps, getVerificationSteps } from "@/lib/process";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How buying a business through EcomCla works: verified figures, due diligence you run yourself, escrow that releases funds only when you confirm receipt, and a supported handover.",
  alternates: { canonical: "/how-it-works" },
  openGraph: { url: "/how-it-works", title: "How it works — EcomCla" },
};

export default function HowItWorksPage() {
  const steps = getThreeSteps();
  const escrow = getEscrow();
  const g = getGuaranteeSummary();

  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="From listing to launch, with your money protected at every step."
        lead="You see verified figures before you commit, inspect them yourself, and pay into escrow. The seller is paid only when everything has transferred and you say so."
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-2">
          {[
            ["#steps", "The three steps"],
            ["#verification", "How figures are verified"],
            ["#due-diligence", "Due diligence"],
            ["#escrow", "Escrow"],
            ["#handover", "Handover"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-line-strong px-4 py-2 text-sm text-fg-muted transition hover:border-fg-subtle hover:text-fg">
              {label}
            </a>
          ))}
        </nav>
      </PageHeader>

      <Section id="steps" aria-labelledby="steps-title" className="scroll-mt-20">
        <SectionHeading id="steps-title" eyebrow="Overview" title="Three steps." />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-base p-8 lg:p-10">
              <span className="font-display text-display-lg font-extrabold text-fg-subtle/60 tabular-nums">0{i + 1}</span>
              <h3 className="mt-8 font-display text-title font-bold">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-fg-muted">{s.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="verification" aria-labelledby="verification-title" className="scroll-mt-20 border-t border-line bg-surface">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="verification-title"
              eyebrow="Verification"
              title="How the figures on a listing are verified."
              lead="A verified badge on a listing means every step below was completed, on the date shown on that listing."
            />
          </div>
          <ol className="space-y-px overflow-hidden rounded-card border border-line bg-line lg:col-span-7">
            {getVerificationSteps().map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="flex gap-5 bg-base p-6 sm:p-8">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 font-display text-sm font-bold text-accent">{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-fg-muted">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="due-diligence" aria-labelledby="dd-title" className="scroll-mt-20">
        <SectionHeading
          id="dd-title"
          eyebrow="Due diligence"
          title="Check it yourself before you commit."
          lead="Request the due diligence pack from any listing. There's no commitment and no deposit."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getDueDiligenceItems().map((d, i) => (
            <Reveal as="li" key={d.title} delay={(i % 3) * 0.06} className="rounded-card border border-line bg-surface p-7">
              <Icon name="doc" size={22} className="text-fg-subtle" />
              <h3 className="mt-5 font-display text-lg font-bold">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{d.detail}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="escrow" aria-labelledby="escrow-title" className="scroll-mt-20 border-y border-line bg-surface">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="escrow-title"
            eyebrow="Escrow"
            title="The seller is paid last."
            lead={`Your payment is held by ${escrow.provider.name} from the moment you pay. It moves only after every asset is in your control and you confirm it, with a ${escrow.inspectionPeriodDays}-day inspection period to check.`}
          />
          <TextLink href="/buyer-protection" className="shrink-0 text-fg-muted hover:text-fg">
            If something doesn&rsquo;t transfer <Icon name="arrow-right" size={16} />
          </TextLink>
        </div>
        <div className="mt-14 rounded-card border border-line bg-base p-6 sm:p-10">
          <EscrowFlow />
        </div>
      </Section>

      <Section id="handover" aria-labelledby="handover-title" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="handover-title"
              eyebrow="Handover"
              title="Your first 48 hours."
              lead={`Then a launch within a week, and the revenue guarantee covering your first ${g.periodDays} days.`}
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/listings">Browse listings</ButtonLink>
              <ButtonLink href="/guarantee" variant="secondary" icon={null}>Guarantee terms</ButtonLink>
            </div>
            <ResponseTime className="mt-6" />
          </div>
          <div className="lg:col-span-7">
            <Timeline steps={getFirstFortyEightHours()} label="First 48 hours after purchase" />
          </div>
        </div>
      </Section>
    </>
  );
}
