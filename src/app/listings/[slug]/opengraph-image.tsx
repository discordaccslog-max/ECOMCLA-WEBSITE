import { ImageResponse } from "next/og";
import { OgFrame, ogSize } from "@/components/og/OgFrame";
import { formatCurrency, formatFigure, formatPeriodShort } from "@/lib/format";
import { getListing, getListingSlugs, getPerformance } from "@/lib/listings";

export const alt = "EcomCla listing";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getListingSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) return new ImageResponse(<OgFrame eyebrow="Listing" title="EcomCla" footer="ecomcla.com" />, size);
  const p = getPerformance(l);
  return new ImageResponse(
    <OgFrame
      eyebrow={`${l.niche} · ${l.status === "sold" ? "Sold" : "For sale"} · ${formatCurrency(l.askingPrice)}`}
      title={l.name}
      figure={`${formatFigure(p.revenue)}/mo`}
      figureLabel={`revenue, ${formatPeriodShort(p.revenue.period)}`}
      footer={l.tagline}
    />,
    size,
  );
}
