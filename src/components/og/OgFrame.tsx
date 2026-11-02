import { brand } from "@/lib/brand";

export const ogSize = { width: 1200, height: 630 };

interface OgFrameProps {
  eyebrow: string;
  title: string;
  figure?: string;
  figureLabel?: string;
  footer: string;
}

/** Shared layout for generated Open Graph images (rendered by next/og, so inline styles only). */
export function OgFrame({ eyebrow, title, figure, figureLabel, footer }: OgFrameProps) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: brand.base, color: brand.fg, padding: 72, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>
        EcomCla
        <div style={{ width: 9, height: 9, background: brand.accent, marginTop: 10 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: brand.fgSubtle }}>{eyebrow}</div>
        <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginTop: 18, maxWidth: 980 }}>{title}</div>
        {figure ? (
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 28 }}>
            <div style={{ fontSize: 64, fontWeight: 800, color: brand.accent, letterSpacing: -2 }}>{figure}</div>
            <div style={{ fontSize: 26, color: brand.fgMuted }}>{figureLabel}</div>
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${brand.line}`, paddingTop: 24, fontSize: 22, color: brand.fgMuted }}>
        <div>{footer}</div>
        <div>Verified figures · Escrow · Revenue guarantee</div>
      </div>
    </div>
  );
}
