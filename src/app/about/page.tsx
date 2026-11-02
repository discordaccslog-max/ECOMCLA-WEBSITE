import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResponseTime } from "@/components/ui/ResponseTime";
import { SampleTag } from "@/components/ui/SampleTag";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getAddressLines, getCompany } from "@/lib/company";
import { getTeam } from "@/lib/team";

export const metadata: Metadata = {
  title: "About us",
  description: "The people behind EcomCla: who we are, where we're registered, and why we built a marketplace around verified figures and escrow.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About EcomCla" },
};

const principles = [
  { title: "Access, not screenshots", detail: "We verify figures on a live screen-share of the store admin and match them to payouts. Screenshots are too easy to edit." },
  { title: "Every month, on the record", detail: "We publish the bad months with the good ones. A listing that hides its dips is a listing you can't price." },
  { title: "The seller is paid last", detail: "Funds sit in escrow until everything has transferred and the buyer confirms. That order doesn't change." },
  { title: "Terms in writing", detail: "The guarantee, buyer protection and our terms are published in full, and every summary on the site is generated from them." },
];

export default function AboutPage() {
  const team = getTeam();
  const company = getCompany();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We built the marketplace we wanted when we bought our first store."
        lead={`EcomCla was founded in ${company.founded} by operators who had bought, run and sold Shopify businesses, and had been burned by edited screenshots and handovers that stalled halfway.`}
      />

      <Section aria-labelledby="team-title">
        <SectionHeading id="team-title" eyebrow="The team" title="The people you'll deal with." lead="You'll speak to these people directly during due diligence and handover." />
        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} className="flex flex-col">
              <Image src={m.photo.src} alt={`Portrait of ${m.name}`} width={m.photo.width} height={m.photo.height} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-4/5 w-full rounded-card border border-line object-cover" />
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-title font-bold">
                    {m.name} <SampleTag sample={m.sample} />
                  </h3>
                  <p className="mt-1 text-fg-muted">{m.role}</p>
                </div>
                <a href={m.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn (opens in a new tab)`} className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition hover:border-line-strong hover:text-fg">
                  <Icon name="linkedin" size={20} />
                </a>
              </div>
              <p className="mt-4 leading-relaxed text-fg-muted">{m.bio}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-fg">
                {m.background.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-fg-subtle" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="principles-title" className="border-y border-line bg-surface">
        <SectionHeading id="principles-title" eyebrow="How we work" title="Four rules we don't bend." />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {principles.map((p, i) => (
            <li key={p.title} className="bg-base p-8 lg:p-10">
              <span className="font-display text-sm font-bold text-fg-subtle tabular-nums">0{i + 1}</span>
              <h3 className="mt-4 font-display text-title font-bold">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="company-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="company-title" eyebrow="Company" title="Who you're buying from." />
          </div>
          <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <div className="border-t border-line pt-5">
              <dt className="text-label font-semibold text-fg-subtle uppercase">Legal entity</dt>
              <dd className="mt-2 text-fg">{company.legalName}</dd>
              <dd className="text-fg-muted">Registered in {company.jurisdiction}</dd>
              <dd className="text-fg-muted">{company.registrationNumber}</dd>
            </div>
            <div className="border-t border-line pt-5">
              <dt className="text-label font-semibold text-fg-subtle uppercase">Registered office</dt>
              <dd className="mt-2 text-fg">
                <address className="not-italic">
                  {getAddressLines().map((line) => <span key={line} className="block">{line}</span>)}
                </address>
              </dd>
            </div>
            <div className="border-t border-line pt-5 sm:col-span-2">
              <dt className="text-label font-semibold text-fg-subtle uppercase">Talk to us</dt>
              <dd className="mt-3"><ResponseTime showHours /></dd>
              <dd className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Contact the team</ButtonLink>
                <ButtonLink href="/listings" variant="secondary" icon={null}>Browse listings</ButtonLink>
              </dd>
            </div>
          </dl>
        </div>
      </Section>
    </>
  );
}
