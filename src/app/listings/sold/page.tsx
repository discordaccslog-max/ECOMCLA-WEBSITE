import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatCurrency, formatDate, formatFigure, formatPeriodShort } from "@/lib/format";
import { getPerformance, getSoldListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Sold businesses",
  description: "Completed sales on EcomCla: asking price, sale price, sale date and the verified figures each business sold on.",
  alternates: { canonical: "/listings/sold" },
  openGraph: { url: "/listings/sold", title: "Sold businesses — EcomCla" },
};

export default function SoldPage() {
  const sold = getSoldListings();
  return (
    <>
      <PageHeader
        eyebrow="Sold archive"
        title="Completed sales."
        lead="Every business sold through EcomCla, with the asking price, the price it sold for, and the verified figures it was listed on. Listings stay viewable after sale."
      />
      <Container className="py-section-sm">
        <div className="overflow-hidden rounded-card border border-line">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Sold businesses with asking price, sale price, sale date and monthly figures at listing</caption>
            <thead className="hidden bg-surface text-label font-semibold text-fg-subtle uppercase md:table-header-group">
              <tr>
                <th scope="col" className="px-6 py-4">Business</th>
                <th scope="col" className="px-6 py-4 text-right">Asking price</th>
                <th scope="col" className="px-6 py-4 text-right">Sale price</th>
                <th scope="col" className="px-6 py-4">Sale date</th>
                <th scope="col" className="px-6 py-4 text-right">Revenue / mo at listing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sold.map((l) => {
                const p = getPerformance(l);
                return (
                  <tr key={l.slug} className="grid grid-cols-2 gap-x-4 gap-y-3 p-5 transition-colors hover:bg-surface md:table-row md:p-0">
                    <th scope="row" className="col-span-2 font-normal md:px-6 md:py-5">
                      <Link href={`/listings/${l.slug}`} className="group flex items-center gap-4">
                        <Image src={l.screenshots[0].src} alt="" width={96} height={60} className="hidden h-15 w-24 rounded-md border border-line object-cover sm:block" />
                        <span>
                          <span className="block font-display text-base font-bold text-fg group-hover:text-accent">{l.name}</span>
                          <span className="block text-fg-muted">{l.niche}</span>
                        </span>
                      </Link>
                    </th>
                    <td className="md:px-6 md:py-5 md:text-right">
                      <span className="block text-xs text-fg-subtle md:hidden">Asking price</span>
                      <span className="tabular-nums text-fg-muted">{formatCurrency(l.askingPrice)}</span>
                    </td>
                    <td className="md:px-6 md:py-5 md:text-right">
                      <span className="block text-xs text-fg-subtle md:hidden">Sale price</span>
                      <span className="font-semibold text-fg tabular-nums">{formatCurrency(l.sale!.salePrice)}</span>
                    </td>
                    <td className="md:px-6 md:py-5">
                      <span className="block text-xs text-fg-subtle md:hidden">Sale date</span>
                      <time dateTime={l.sale!.saleDate} className="text-fg-muted">{formatDate(l.sale!.saleDate)}</time>
                    </td>
                    <td className="md:px-6 md:py-5 md:text-right">
                      <span className="block text-xs text-fg-subtle md:hidden">Revenue / mo at listing</span>
                      <span className="tabular-nums text-fg">{formatFigure(p.revenue)}</span>
                      <span className="block text-xs text-fg-subtle">{formatPeriodShort(p.revenue.period)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}
