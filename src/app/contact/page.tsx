import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAddressLines, getCompany, getResponseTime, getSupportHoursLine } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the EcomCla team. Average first reply time, support hours and every channel, stated plainly.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact EcomCla" },
};

const topics = [
  { value: "buying", label: "Buying a business" },
  { value: "listing", label: "A specific listing" },
  { value: "selling", label: "Selling a business" },
  { value: "guarantee", label: "Guarantee claim or question" },
  { value: "transfer", label: "Transfer issue (buyer protection)" },
  { value: "other", label: "Something else" },
];

interface Props {
  searchParams: Promise<{ topic?: string | string[] }>;
}

async function ContactForm({ searchParams }: Props) {
  const { topic } = await searchParams;
  return <ContactFormView defaultTopic={typeof topic === "string" && topics.some((t) => t.value === topic) ? topic : undefined} />;
}

function ContactFormView({ defaultTopic }: { defaultTopic?: string }) {
  const rt = getResponseTime();
  return <InquiryForm key={defaultTopic ?? "default"} kind="contact" topics={topics} defaultTopic={defaultTopic} responseTime={rt.value} supportHours={getSupportHoursLine()} />;
}

export default function ContactPage(props: Props) {
  const company = getCompany();
  const rt = getResponseTime();

  return (
    <>
      <PageHeader eyebrow="Contact" title="Ask us anything before you buy." lead="A person on our team reads every message. Here's how quickly, and when.">
        <dl className="grid max-w-3xl gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-label font-semibold text-fg-subtle uppercase">Average first reply</dt>
            <dd className="mt-2 font-display text-display font-extrabold text-accent tabular-nums">{rt.value}</dd>
            <dd className="mt-1 text-sm text-fg-subtle">{rt.period}, during support hours</dd>
          </div>
          <div>
            <dt className="text-label font-semibold text-fg-subtle uppercase">Support hours</dt>
            <dd className="mt-2 font-display text-title font-bold">{company.supportHours.days}</dd>
            <dd className="mt-1 text-fg-muted">{company.supportHours.hours} {company.supportHours.timezone}</dd>
          </div>
        </dl>
      </PageHeader>

      <Container className="py-section-sm lg:py-section">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <section aria-labelledby="form-title" className="lg:col-span-7">
            <h2 id="form-title" className="font-display text-title font-bold">Send a message</h2>
            <div className="mt-8 rounded-card border border-line bg-surface p-6 sm:p-8">
              <Suspense fallback={<ContactFormView />}>
                <ContactForm {...props} />
              </Suspense>
            </div>
          </section>

          <aside aria-labelledby="channels-title" className="lg:col-span-5">
            <h2 id="channels-title" className="font-display text-title font-bold">Other ways to reach us</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {company.channels.map((c) => (
                <li key={c.name} className="flex items-start justify-between gap-4 py-5">
                  <div>
                    <p className="font-semibold text-fg">{c.name}</p>
                    <p className="mt-1 text-sm text-fg-muted">
                      {c.href && !c.href.startsWith("/") ? <a href={c.href} className="underline decoration-line-strong underline-offset-4 hover:text-fg">{c.detail}</a> : c.detail}
                    </p>
                  </div>
                  <Icon name={c.name === "Email" ? "mail" : c.name === "Phone" ? "phone" : "chat"} size={20} className="mt-0.5 text-fg-subtle" />
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <p className="text-label font-semibold text-fg-subtle uppercase">Registered office</p>
              <address className="mt-3 text-sm leading-relaxed text-fg-muted not-italic">
                {company.legalName}
                {getAddressLines().map((line) => <span key={line} className="block">{line}</span>)}
              </address>
              <p className="mt-3 text-sm text-fg-subtle">Visits by appointment only.</p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
