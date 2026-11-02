import type { TestimonialInput } from "@/lib/types";

/**
 * SAMPLE TESTIMONIALS — placeholders for layout only.
 * Replace with real buyers, with their written permission, before launch.
 * Publishing invented testimonials as genuine is prohibited under the FTC's
 * rule on fake reviews (16 CFR Part 465). Photos are generated monograms.
 *
 * Every field is required: lib/testimonials rejects an entry with any blank
 * field, so a partial testimonial cannot render.
 */
export const testimonials: TestimonialInput[] = [
  {
    fullName: "Marcus Bell",
    photo: { src: "/people/marcus-bell.svg", width: 160, height: 160 },
    location: "Columbus, Ohio",
    businessName: "Ridgeway Auto",
    niche: "Auto accessories",
    listingSlug: "ridgeway-auto",
    purchasedMonth: "2026-09",
    quote:
      "The screen-share of the Shopify admin is what sold me. I watched the seller pull the payout reports live instead of trusting a PDF. Handover took eleven days, and the first ads were running on day three.",
    sample: true,
  },
  {
    fullName: "Aisha Khan",
    photo: { src: "/people/aisha-khan.svg", width: 160, height: 160 },
    location: "Leeds, United Kingdom",
    businessName: "Brewcraft Supply",
    niche: "Coffee & kitchen",
    listingSlug: "brewcraft-supply",
    purchasedMonth: "2026-07",
    quote:
      "I asked about the January dip before I paid and got a straight answer: a supplier delay, with the emails to prove it. That told me more than the good months did.",
    sample: true,
  },
  {
    fullName: "Daniel Reyes",
    photo: { src: "/people/daniel-reyes.svg", width: 160, height: 160 },
    location: "San Antonio, Texas",
    businessName: "Ember Kitchen",
    niche: "Coffee & kitchen",
    listingSlug: "ember-kitchen",
    purchasedMonth: "2026-04",
    quote:
      "First business I have owned. The creative schedule meant I was not guessing what to run each week, and the Slack channel answered things I would have been embarrassed to ask anywhere else.",
    sample: true,
  },
  {
    fullName: "Hannah Okoro",
    photo: { src: "/people/hannah-okoro.svg", width: 160, height: 160 },
    location: "Atlanta, Georgia",
    businessName: "Fernway Plant Co.",
    niche: "Home & living",
    purchasedMonth: "2026-02",
    quote:
      "My ad account was flagged in week two, which was stressful. The team helped me file the appeal the same afternoon and swapped in compliant creatives while it was reviewed.",
    sample: true,
  },
];
