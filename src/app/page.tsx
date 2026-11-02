import type { Metadata } from "next";
import { GuaranteeSeal } from "@/components/guarantee/GuaranteeSeal";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { AwardBand, CaseStudyTeaser, FeaturedListings, IncludedSummary, Testimonials, ThreeSteps } from "@/components/sections/HomeSections";
import { LiveStatBand } from "@/components/sections/LiveStatBand";
import { getFaq } from "@/lib/faq";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getFaq().map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }} />;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <GuaranteeSeal />
      <LiveStatBand />
      <ThreeSteps />
      <FeaturedListings />
      <AwardBand />
      <IncludedSummary />
      <CaseStudyTeaser />
      <Testimonials />
      <FaqSection />
      <FaqJsonLd />
    </>
  );
}
