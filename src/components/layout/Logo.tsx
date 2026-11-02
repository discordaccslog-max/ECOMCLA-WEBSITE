import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="EcomCla home" className={className}>
      <span className="flex items-baseline gap-0.5 font-display text-xl font-extrabold tracking-tight text-fg">
        EcomCla
        <span aria-hidden className="inline-block size-1.5 translate-y-px bg-accent" />
      </span>
    </Link>
  );
}
