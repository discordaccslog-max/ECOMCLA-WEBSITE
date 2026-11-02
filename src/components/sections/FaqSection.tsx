import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ResponseTime } from "@/components/ui/ResponseTime";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getFaq } from "@/lib/faq";

export function FaqSection() {
  const items = getFaq();
  return (
    <Section aria-labelledby="faq-title" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" eyebrow="Questions" title="The hard questions, answered directly." />
            <div className="mt-10 rounded-card border border-line bg-surface p-6">
              <p className="font-display text-lg font-bold">Ask us anything else</p>
              <ResponseTime className="mt-3" showHours />
              <ButtonLink href="/contact" variant="secondary" className="mt-6">
                Contact the team
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <ul className="border-t border-line">
            {items.map((item) => (
              <li key={item.id} className="border-b border-line">
                <details className="group" name="faq">
                  <summary className="flex cursor-pointer items-start justify-between gap-6 rounded-sm py-7 font-display text-xl font-bold text-fg transition-colors hover:text-accent">
                    <span>{item.question}</span>
                    <span aria-hidden className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45">
                      <Icon name="plus" size={16} />
                    </span>
                  </summary>
                  <div className="max-w-2xl space-y-4 pb-8 leading-relaxed text-fg-muted">
                    {item.answer.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {item.link ? (
                      <TextLink href={item.link.href} className="text-fg">
                        {item.link.label}
                        <Icon name="arrow-right" size={16} />
                      </TextLink>
                    ) : null}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
