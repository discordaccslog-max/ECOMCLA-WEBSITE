import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Eyebrow } from "./Section";

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, lead, children, className }: PageHeaderProps) {
  return (
    <header className={cn("relative isolate overflow-hidden border-b border-line", className)}>
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-b-from-20%" />
      <div aria-hidden className="absolute inset-0 -z-10 glow-accent" />
      <Container className="pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl font-display text-display-lg font-extrabold text-fg">{title}</h1>
        {lead ? <p className="mt-7 max-w-2xl text-lead text-fg-muted">{lead}</p> : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </header>
  );
}
