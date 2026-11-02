import type { Company } from "@/lib/types";

/**
 * SAMPLE VALUES. Replace the legal name, registration number, address and
 * phone with your real details before launch. The phone number uses the
 * reserved 555-01xx fictional range and the street is deliberately generic.
 */
export const company: Company = {
  brand: "EcomCla",
  legalName: "EcomCla LLC",
  jurisdiction: "Delaware, USA",
  registrationNumber: "File No. 0000000",
  address: {
    line1: "1000 Example Street",
    line2: "Suite 100",
    city: "Wilmington",
    region: "DE",
    postalCode: "19801",
    country: "United States",
  },
  email: "hello@ecomcla.com",
  phone: "+1 (555) 010-0142",
  responseTime: { value: 108, unit: "duration-minutes", period: { kind: "trailing-days", days: 90 } },
  supportHours: { days: "Monday to Friday", hours: "8:00–18:00", timezone: "US Eastern" },
  channels: [
    { name: "Email", detail: "hello@ecomcla.com", href: "mailto:hello@ecomcla.com" },
    { name: "Phone", detail: "+1 (555) 010-0142", href: "tel:+15550100142" },
    { name: "Inquiry form", detail: "Replies within support hours", href: "/contact" },
    { name: "Buyer Slack channel", detail: "Private channel for buyers during handover" },
  ],
  founded: 2023,
  sample: true,
};
