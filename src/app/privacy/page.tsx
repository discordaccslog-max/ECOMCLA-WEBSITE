import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/ui/LegalDocumentView";
import { getLegalDocument } from "@/lib/legal";

const doc = getLegalDocument("privacy");

export const metadata: Metadata = {
  title: doc.title,
  description: doc.summary,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy", title: "Privacy policy — EcomCla" },
};

export default function Page() {
  return <LegalDocumentView doc={doc} />;
}
