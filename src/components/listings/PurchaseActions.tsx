"use client";

import Link from "next/link";
import { useState } from "react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { PaymentMarks } from "@/components/ui/PaymentMarks";

interface PurchaseActionsProps {
  slug: string;
  name: string;
  priceLabel: string;
  escrowLine: string;
  /** Server-rendered compact guarantee, shown as the last thing before payment. */
  checkoutGuarantee: React.ReactNode;
  responseTime: string;
  supportHours: string;
}

type CheckoutError = { code: string; message: string };

const errorCopy: Record<string, string> = {
  listing_sold: "This business has just been sold, so it's no longer available to buy. Nothing has been charged.",
  listing_not_found: "We couldn't find this listing. It may have been withdrawn. Nothing has been charged.",
  checkout_unavailable: "Checkout is temporarily unavailable. Nothing has been charged. Please try again shortly or contact us.",
  session_failed: "We couldn't start a secure checkout session. Nothing has been charged. Please try again.",
  network: "We couldn't reach the server. Check your connection and try again. Nothing has been charged.",
};

export function PurchaseActions({ slug, name, priceLabel, escrowLine, checkoutGuarantee, responseTime, supportHours }: PurchaseActionsProps) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<CheckoutError | null>(null);

  async function startCheckout() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const body = (await res.json().catch(() => ({}))) as { url?: string; code?: string };
      if (res.ok && body.url) {
        window.location.assign(body.url);
        return;
      }
      const code = body.code ?? "session_failed";
      setError({ code, message: errorCopy[code] ?? errorCopy.session_failed });
    } catch {
      setError({ code: "network", message: errorCopy.network });
    }
    setPending(false);
  }

  return (
    <>
      <div className="space-y-3">
        <Button variant="primary" size="lg" className="w-full" onClick={() => setReviewOpen(true)} aria-haspopup="dialog" icon="arrow-right">
          Buy now · {priceLabel}
        </Button>
        <Button variant="secondary" size="lg" className="w-full" onClick={() => setDdOpen(true)} aria-haspopup="dialog">
          <Icon name="doc" size={18} />
          Request due diligence pack
        </Button>
      </div>

      <Dialog open={reviewOpen} onClose={() => !pending && setReviewOpen(false)} labelledBy="review-title" describedBy="review-desc" closeLabel="Close checkout review">
        <div className="p-6 pt-8 sm:p-8">
          <p className="text-label font-semibold text-fg-subtle uppercase">Review before payment</p>
          <h2 id="review-title" className="mt-3 pr-12 font-display text-title font-bold">
            {name}
          </h2>
          <dl id="review-desc" className="mt-6 divide-y divide-line border-y border-line text-sm">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-fg-muted">Purchase price</dt>
              <dd className="font-display text-lg font-bold text-fg tabular-nums">{priceLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-fg-muted">Where your payment goes</dt>
              <dd className="max-w-xs text-right text-fg">{escrowLine}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-fg-muted">If assets don&rsquo;t transfer</dt>
              <dd className="text-right">
                <Link href="/buyer-protection" className="text-fg underline underline-offset-4">Buyer protection applies</Link>
              </dd>
            </div>
          </dl>

          <div className="mt-6">{checkoutGuarantee}</div>

          {error ? (
            <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-danger/40 bg-danger/5 p-4 text-sm text-fg">
              <Icon name="alert" size={18} className="mt-0.5 shrink-0 text-danger" />
              <div>
                <p>{error.message}</p>
                {error.code === "listing_sold" || error.code === "listing_not_found" ? (
                  <Link href="/listings" className="mt-2 inline-block font-semibold underline underline-offset-4">Browse available businesses</Link>
                ) : (
                  <Link href="/contact" className="mt-2 inline-block font-semibold underline underline-offset-4">Contact us</Link>
                )}
              </div>
            </div>
          ) : null}

          <Button
            variant="primary"
            size="lg"
            className="mt-6 w-full"
            onClick={startCheckout}
            disabled={pending || error?.code === "listing_sold"}
            icon={pending ? null : "lock"}
          >
            {pending ? "Opening secure checkout…" : `Continue to secure payment`}
          </Button>
          <p className="mt-3 text-center text-xs text-fg-subtle">You&rsquo;ll pay on Stripe&rsquo;s secure checkout page. Card details never touch our servers.</p>
          <PaymentMarks className="mt-5 justify-center" />
        </div>
      </Dialog>

      <Dialog open={ddOpen} onClose={() => setDdOpen(false)} labelledBy="dd-title" closeLabel="Close due diligence request">
        <div className="p-6 pt-8 sm:p-8">
          <p className="text-label font-semibold text-fg-subtle uppercase">Due diligence</p>
          <h2 id="dd-title" className="mt-3 pr-12 font-display text-title font-bold">Request the due diligence pack</h2>
          <p className="mt-3 text-fg-muted">
            Analytics screen-share, full ad account history, supplier contacts and payout statements for {name}. No commitment to buy.
          </p>
          <div className="mt-6">
            <InquiryForm kind="due-diligence" listingSlug={slug} listingName={name} responseTime={responseTime} supportHours={supportHours} />
          </div>
        </div>
      </Dialog>
    </>
  );
}
