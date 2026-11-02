import Link from "next/link";
import { Icon } from "./Icon";

/** Sits beside revenue figures; links to how figures are verified. */
export function VerifiedBadge() {
  return (
    <Link
      href="/how-it-works#verification"
      className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 py-0.5 pr-2 pl-1 text-xs font-semibold tracking-normal text-accent normal-case transition-colors hover:border-accent/60"
    >
      <Icon name="verified" size={14} />
      Verified
      <span className="sr-only">: how we verify figures</span>
    </Link>
  );
}
