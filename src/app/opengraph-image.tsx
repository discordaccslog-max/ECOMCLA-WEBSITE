import { ImageResponse } from "next/og";
import { OgFrame, ogSize } from "@/components/og/OgFrame";
import { getGuaranteeSummary } from "@/lib/guarantee";

export const alt = "EcomCla — pre-built e-commerce businesses, verified and ready to run";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const g = getGuaranteeSummary();
  return new ImageResponse(
    <OgFrame
      eyebrow="Pre-built e-commerce businesses"
      title="Own a store that's already selling."
      figure={g.amountLabel}
      figureLabel={`in revenue ${g.periodLabel}, or ${g.refundLabel} back`}
      footer="ecomcla.com"
    />,
    size,
  );
}
