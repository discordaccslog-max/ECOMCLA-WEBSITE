import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/ui/LegalDocumentView";
import { getLegalDocument } from "@/lib/legal";

const doc = getLegalDocument("terms");

export const metadata: Metadata = {
  title: doc.title,
  description: doc.summary,
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms", title: "Terms of sale — EcomCla" },
};

export default function Page() {
  return <LegalDocumentView doc={doc} />;
}
