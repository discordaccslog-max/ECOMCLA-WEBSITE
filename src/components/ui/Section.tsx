import { cn } from "@/lib/cn";
import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "default" | "sm";
  bleed?: boolean;
  containerClassName?: string;
}

export function Section({ size = "default", bleed = false, className, containerClassName, children, ...rest }: SectionProps) {
  return (
    <section className={cn(size === "sm" ? "py-section-sm" : "py-section", className)} {...rest}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("font-sans text-label font-semibold uppercase text-fg-subtle", className)}>
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
  size?: "lg" | "md";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, lead, id, as: As = "h2", size = "md", align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
      <As id={id} className={cn("font-display font-bold text-fg", size === "lg" ? "text-display-lg" : "text-display")}>
        {title}
      </As>
      {lead ? <p className="mt-6 text-lead text-fg-muted">{lead}</p> : null}
    </div>
  );
}
