import Image from "next/image";
import Link from "next/link";
import { FigureValue } from "@/components/ui/FigureValue";
import { Icon } from "@/components/ui/Icon";
import { Sparkline } from "@/components/ui/Sparkline";
import { StatusBadge, TypeBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";
import { formatCurrency, formatDate } from "@/lib/format";
import type { ListingCardData } from "@/lib/listings";

interface ListingCardProps {
  listing: ListingCardData;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}

export function ListingCard({ listing: l, headingLevel = "h3", priority = false }: ListingCardProps) {
  const Heading = headingLevel;
  const sold = l.status === "sold";
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition duration-300 ease-out",
        "hover:-translate-y-1 hover:border-line-strong hover:shadow-lift focus-within:border-line-strong motion-reduce:hover:translate-y-0",
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden border-b border-line bg-surface-2">
        <Image
          src={l.image.src}
          alt={l.image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className={cn("object-cover transition duration-500 group-hover:scale-102 motion-reduce:group-hover:scale-100", sold && "opacity-60 grayscale")}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <StatusBadge status={l.status} className="bg-base/85 backdrop-blur" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-fg-muted">
          <span>{l.niche}</span>
          <span aria-hidden className="text-fg-subtle">·</span>
          <TypeBadge type={l.type} />
        </div>
        <Heading className="mt-3 font-display text-xl font-bold text-fg">
          <Link href={`/listings/${l.slug}`} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent">
            {l.name}
          </Link>
        </Heading>
        <p className="mt-1 text-sm text-fg-muted">{l.tagline}</p>

        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-5">
          <div>
            <dt className="text-label font-semibold text-fg-subtle uppercase">Asking price</dt>
            <dd className="mt-1 font-display text-lg font-bold text-fg tabular-nums">{formatCurrency(l.askingPrice)}</dd>
            <dd className="mt-0.5 text-xs text-fg-subtle">Listed {formatDate(l.dateListed)}</dd>
          </div>
          <FigureValue label="Revenue / mo" figure={l.revenue} size="sm" periodStyle="short" highlight={!sold} />
          <FigureValue label="Profit / mo" figure={l.profit} size="sm" periodStyle="short" />
          <div>
            <dt className="text-label font-semibold text-fg-subtle uppercase">Age</dt>
            <dd className="mt-1 font-display text-lg font-bold text-fg tabular-nums">{l.ageMonths} months</dd>
            <dd className="mt-0.5 text-xs text-fg-subtle">
              {l.previousOwners === 0 ? "No previous owners" : `${l.previousOwners} previous owner${l.previousOwners > 1 ? "s" : ""}`}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div className={cn(sold ? "text-fg-subtle" : "text-accent")}>
            <Sparkline values={l.spark} />
            <p className="mt-1 text-xs text-fg-subtle">Monthly revenue, last {l.spark.length} months</p>
          </div>
          <span aria-hidden className="grid size-10 place-items-center rounded-full border border-line text-fg-muted transition group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
            <Icon name="arrow-up-right" size={18} />
          </span>
        </div>
      </div>
    </article>
  );
}
