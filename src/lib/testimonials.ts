import { testimonials } from "@/data/testimonials";
import { formatMonth } from "./format";
import type { NonEmpty, Testimonial, TestimonialInput } from "./types";

/**
 * Testimonials are only renderable once every field is present. Components
 * accept `Testimonial` (with branded non-empty strings), which can only be
 * produced here; an entry with a blank name, photo, business or quote fails
 * the build instead of rendering as a vague, anonymous quote.
 */

function nonEmpty(value: string | undefined, field: string, who: string): NonEmpty {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Testimonial "${who}" is missing ${field}. Partial testimonials cannot be published.`);
  }
  return value.trim() as NonEmpty;
}

function toTestimonial(t: TestimonialInput): Testimonial {
  const who = t.fullName || t.businessName || "(unnamed)";
  const fullName = nonEmpty(t.fullName, "fullName", who);
  if (fullName.split(/\s+/).length < 2) {
    throw new Error(`Testimonial "${who}" needs a full name (first and last), not a first name only.`);
  }
  return {
    fullName,
    photo: { src: nonEmpty(t.photo?.src, "photo", who), width: t.photo.width, height: t.photo.height },
    location: nonEmpty(t.location, "location", who),
    businessName: nonEmpty(t.businessName, "businessName", who),
    niche: t.niche,
    listingSlug: t.listingSlug,
    purchasedMonth: t.purchasedMonth,
    quote: nonEmpty(t.quote, "quote", who),
    sample: t.sample,
  };
}

const validated: Testimonial[] = testimonials.map(toTestimonial);

export function getTestimonials(): Testimonial[] {
  return validated;
}

export function purchasedLabel(t: Testimonial): string {
  return `Bought ${formatMonth(t.purchasedMonth)}`;
}

export function hasSampleTestimonials(): boolean {
  return validated.some((t) => t.sample);
}
