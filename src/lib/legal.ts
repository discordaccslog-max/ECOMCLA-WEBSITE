import { legalDocuments } from "@/data/legal";
import type { LegalDocument } from "./types";

export function getLegalDocument(slug: LegalDocument["slug"]): LegalDocument {
  const doc = legalDocuments.find((d) => d.slug === slug);
  if (!doc) throw new Error(`Missing legal document: ${slug}`);
  return doc;
}
