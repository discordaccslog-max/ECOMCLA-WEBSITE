import type { Metadata } from "next";
import { Suspense } from "react";
import { Timeline } from "@/components/process/Timeline";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ResponseTime } from "@/components/ui/ResponseTime";
import { Eyebrow } from "@/components/ui/Section";
import { getCompany } from "@/lib/company";
import { formatCurrency } from "@/lib/format";
import { getListing } from "@/lib/listings";
import { getHandoverNextSteps } from "@/lib/process";
import { getCheckoutSummary } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Purchase confirmed",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ session_id?: string | string[] }>;
}

async function Confirmation({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const id = typeof session_id === "string" ? session_id : "";
  const summary = id ? await getCheckoutSummary(id) : null;
  const listing = summary?.listingSlug ? getListing(summary.listingSlug) : undefined;
  const company = getCompany();

  if (!summary || !summary.paid) {
    return (
      <div className="max-w-2xl">
        <Eyebrow>Checkout</Eyebrow>
        <h1 className="mt-5 font-display text-display-lg font-extrabold">We couldn&rsquo;t confirm this payment here.</h1>
        <p className="mt-6 text-lead text-fg-muted">
          {summary && !summary.paid
            ? "Stripe hasn't marked this payment as complete yet. If you were charged, you'll receive a receipt by email and we'll be in touch."
            : "This confirmation link is missing or has expired. If you completed a payment, your receipt from Stripe is the record, and our team has the same details."}
        </p>
        <p className="mt-4 text-fg-muted">
          Email <a className="text-fg underline underline-offset-4" href={`mailto:${company.email}`}>{company.email}</a> with the address you paid from and we&rsquo;ll confirm the status.
        </p>
        <ResponseTime className="mt-6" showHours />
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Contact us</ButtonLink>
          <ButtonLink href="/listings" variant="secondary" icon={null}>Back to listings</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-6">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-ink">
          <Icon name="check" size={28} />
        </span>
        <h1 className="mt-8 font-display text-display-lg font-extrabold">
          {listing ? <>{listing.name} is on its way to you.</> : <>Your purchase is confirmed.</>}
        </h1>
        <p className="mt-6 text-lead text-fg-muted">
          Your payment is held in escrow, not paid to the seller. It&rsquo;s released only after every asset has transferred and you&rsquo;ve confirmed receipt.
        </p>
        <dl className="mt-10 divide-y divide-line rounded-card border border-line bg-surface text-sm">
          {listing ? (
            <div className="flex justify-between gap-4 px-6 py-4">
              <dt className="text-fg-muted">Business</dt>
              <dd className="font-semibold text-fg">{listing.name}</dd>
            </div>
          ) : null}
          {summary.amountTotal !== null ? (
            <div className="flex justify-between gap-4 px-6 py-4">
              <dt className="text-fg-muted">Amount paid into escrow</dt>
              <dd className="font-display text-lg font-bold text-fg tabular-nums">{formatCurrency(summary.amountTotal)}</dd>
            </div>
          ) : null}
          {summary.email ? (
            <div className="flex justify-between gap-4 px-6 py-4">
              <dt className="text-fg-muted">Receipt sent to</dt>
              <dd className="text-fg">{summary.email}</dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-4 px-6 py-4">
            <dt className="text-fg-muted">Reference</dt>
            <dd className="max-w-48 truncate font-mono text-xs text-fg-muted sm:max-w-none">{summary.id}</dd>
          </div>
        </dl>
        <ResponseTime className="mt-6" showHours />
      </div>
      <div className="lg:col-span-6">
        <h2 className="font-display text-title font-bold">What happens next</h2>
        <div className="mt-8">
          <Timeline steps={getHandoverNextSteps()} label="Handover next steps" />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/guarantee" variant="secondary" icon={null}>Guarantee terms</ButtonLink>
          <ButtonLink href="/buyer-protection" variant="secondary" icon={null}>Buyer protection</ButtonLink>
        </div>
      </div>
    </div>
  );
}

function ConfirmationSkeleton() {
  return (
    <div className="max-w-2xl" aria-busy="true" aria-live="polite">
      <p className="text-fg-muted">Confirming your payment with Stripe…</p>
      <div className="mt-6 h-16 w-3/4 animate-pulse rounded-lg bg-surface-2" />
      <div className="mt-4 h-6 w-full animate-pulse rounded bg-surface-2" />
    </div>
  );
}

export default function CheckoutSuccessPage(props: Props) {
  return (
    <Container className="py-section">
      <Suspense fallback={<ConfirmationSkeleton />}>
        <Confirmation {...props} />
      </Suspense>
    </Container>
  );
}
