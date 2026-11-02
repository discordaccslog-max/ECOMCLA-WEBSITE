import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/ui/LegalDocumentView";
import { getLegalDocument } from "@/lib/legal";

const doc = getLegalDocument("earnings-disclaimer");

export const metadata: Metadata = {
  title: doc.title,
  description: doc.summary,
  alternates: { canonical: "/earnings-disclaimer" },
  openGraph: { url: "/earnings-disclaimer", title: "Earnings disclaimer — EcomCla" },
};

export default function Page() {
  return <LegalDocumentView doc={doc} />;
}
