/** A blind-embossed notary-style mark. Decorative, low-contrast, paper only. */
export function EmbossedSeal({ className, year }: { className?: string; year: string }) {
  const text = `WRITTEN COMMITMENT · ECOMCLA · REVENUE GUARANTEE · ${year} · `;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden focusable="false">
      <defs>
        <path id="seal-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1 3" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
      <text fill="currentColor" fontSize="10.5" fontWeight="700" letterSpacing="2.4" fontFamily="var(--font-inter)">
        <textPath href="#seal-circle">{text}</textPath>
      </text>
      <text x="100" y="97" textAnchor="middle" fill="currentColor" fontSize="15" fontWeight="800" letterSpacing="1.5" fontFamily="var(--font-manrope)">
        ECOMCLA
      </text>
      <text x="100" y="116" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="600" letterSpacing="2" fontFamily="var(--font-inter)">
        IN WRITING
      </text>
    </svg>
  );
}
