import type { Metadata } from "next";
import { Suspense } from "react";
import { GuaranteeCompact } from "@/components/guarantee/GuaranteeCompact";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ResponseTime } from "@/components/ui/ResponseTime";
import { Eyebrow } from "@/components/ui/Section";
import { getListing } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Payment cancelled",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ listing?: string | string[] }>;
}

async function BackToListing({ searchParams }: Props) {
  const { listing: slug } = await searchParams;
  const listing = typeof slug === "string" ? getListing(slug) : undefined;
  if (!listing) {
    return <ButtonLink href="/listings">Browse listings</ButtonLink>;
  }
  return (
    <>
      <ButtonLink href={`/listings/${listing.slug}`}>Back to {listing.name}</ButtonLink>
      <ButtonLink href="/listings" variant="secondary" icon={null}>All listings</ButtonLink>
    </>
  );
}

export default function CheckoutCancelledPage(props: Props) {
  return (
    <Container className="py-section">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Eyebrow>Checkout</Eyebrow>
          <h1 className="mt-5 font-display text-display-lg font-extrabold">Payment cancelled. Nothing was charged.</h1>
          <p className="mt-6 max-w-xl text-lead text-fg-muted">
            You left checkout before paying, so no money has moved and the business hasn&rsquo;t been reserved. If something gave you pause, we&rsquo;d rather answer it than have you guess.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Suspense fallback={<ButtonLink href="/listings">Browse listings</ButtonLink>}>
              <BackToListing {...props} />
            </Suspense>
            <ButtonLink href="/contact" variant="ghost" icon={null}>Ask a question</ButtonLink>
          </div>
          <ResponseTime className="mt-8" showHours />
        </div>
        <div className="lg:col-span-5">
          <GuaranteeCompact idSuffix="cancelled" />
        </div>
      </div>
    </Container>
  );
}
