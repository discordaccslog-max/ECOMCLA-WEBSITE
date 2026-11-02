import type { Metadata } from "next";
import { Suspense } from "react";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingsExplorer, ListingsExplorerStatic } from "@/components/listings/ListingsExplorer";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAvailableListings, getListingCards, getNiches } from "@/lib/listings";
import { TextLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Businesses for sale",
  description:
    "Pre-built and established Shopify businesses for sale. Filter by niche, asking price, monthly revenue and age. Every figure verified, with month-by-month history.",
  alternates: { canonical: "/listings" },
  openGraph: { url: "/listings", title: "Businesses for sale — EcomCla" },
};

export default function ListingsPage() {
  const cards = getListingCards();
  const niches = getNiches();
  const available = getAvailableListings().length;
  const renderCard = Object.fromEntries(cards.map((c, i) => [c.slug, <ListingCard key={c.slug} listing={c} headingLevel="h2" priority={i < 2} />]));
  const props = { cards, niches, renderCard };

  return (
    <>
      <PageHeader
        eyebrow={`${available} businesses available`}
        title="Businesses for sale, with every month on the record."
        lead="Figures are verified on a live screen-share before a listing goes up. Each one states the period it covers."
      >
        <TextLink href="/listings/sold" className="text-fg-muted hover:text-fg">
          See completed sales
          <Icon name="arrow-right" size={16} />
        </TextLink>
      </PageHeader>
      <Container className="py-section-sm">
        <Suspense fallback={<ListingsExplorerStatic {...props} />}>
          <ListingsExplorer {...props} />
        </Suspense>
      </Container>
    </>
  );
}
