import { formatDate } from "@/lib/format";
import type { LegalDocument } from "@/lib/types";
import { Container } from "./Container";
import { PageHeader } from "./PageHeader";
import { ResponseTime } from "./ResponseTime";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <PageHeader eyebrow={`Last updated ${formatDate(doc.lastUpdated)}`} title={doc.title} lead={doc.summary} />
      <Container className="py-section-sm">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label={`${doc.title} sections`} className="lg:col-span-4">
            <ol className="space-y-2 border-l border-line pl-5 text-sm lg:sticky lg:top-28">
              {doc.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#${slugify(s.heading)}`} className="flex gap-3 text-fg-muted hover:text-fg">
                    <span className="w-5 text-fg-subtle tabular-nums">{i + 1}.</span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="max-w-measure space-y-12 lg:col-span-8">
            {doc.sections.map((s, i) => (
              <section key={s.heading} id={slugify(s.heading)} aria-labelledby={`${slugify(s.heading)}-h`} className="scroll-mt-28">
                <h2 id={`${slugify(s.heading)}-h`} className="font-display text-title font-bold">
                  <span className="mr-3 text-fg-subtle tabular-nums">{i + 1}.</span>
                  {s.heading}
                </h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-fg-muted">{p}</p>
                ))}
              </section>
            ))}
            <div className="border-t border-line pt-8">
              <p className="font-semibold">Questions about this document?</p>
              <ResponseTime className="mt-3" showHours />
            </div>
          </article>
        </div>
      </Container>
    </>
  );
}
