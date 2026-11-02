import type { MetadataRoute } from "next";
import { getAllListings } from "@/lib/listings";
import { siteUrl } from "@/lib/site";

const staticRoutes = [
  "", "/listings", "/listings/sold", "/whats-included", "/how-it-works", "/guarantee",
  "/buyer-protection", "/case-studies", "/about", "/contact", "/terms", "/privacy", "/earnings-disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: path === "" || path === "/listings" ? ("daily" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/listings" ? 0.9 : 0.6,
    })),
    ...getAllListings().map((l) => ({
      url: `${siteUrl}/listings/${l.slug}`,
      lastModified: l.sale?.saleDate ?? l.dateListed,
      changeFrequency: "weekly" as const,
      priority: l.status === "available" ? 0.8 : 0.4,
    })),
  ];
}
