import type { LegalDocument } from "@/lib/types";

/**
 * Legal documents. Written as a working draft in plain English; have them
 * reviewed by a qualified lawyer for your jurisdiction before launch.
 */
export const legalDocuments: LegalDocument[] = [
  {
    slug: "terms",
    title: "Terms of sale",
    summary: "The agreement between you and EcomCla when you buy a business through our marketplace.",
    lastUpdated: "2026-10-14",
    sections: [
      {
        heading: "Who these terms are between",
        paragraphs: [
          "These terms apply when you buy a business listed on EcomCla. “We” means EcomCla LLC. “You” means the buyer. Each listing is sold by its seller, who may be EcomCla (for pre-built stores) or a third party (for established businesses). We act as the marketplace, verifier and escrow agent.",
        ],
      },
      {
        heading: "What you are buying",
        paragraphs: [
          "You are buying the assets listed under “Included” on the listing at the time of payment, and nothing listed under “Not included”. The listing, as it appears when you pay, forms part of this agreement. We keep a dated copy.",
          "Figures on a listing describe past performance over the period stated beside each figure. They are not a forecast or a promise of future results.",
        ],
      },
      {
        heading: "Price and payment",
        paragraphs: [
          "The price is the asking price shown on the listing in US dollars. Payment is taken through our checkout, processed by Stripe, and held in escrow as described on our How it works page. Funds are released to the seller only after all assets have transferred and you confirm receipt, or after the inspection period ends without an open issue.",
        ],
      },
      {
        heading: "Transfer and inspection",
        paragraphs: [
          "The seller must transfer every included asset within the transfer window stated in our buyer protection terms. You have an inspection period after transfer to confirm that each asset matches the listing. If an asset doesn't transfer or doesn't match, buyer protection applies.",
        ],
      },
      {
        heading: "Revenue guarantee",
        paragraphs: [
          "Purchases made through EcomCla checkout are covered by the revenue guarantee on the terms published on our guarantee page, which form part of this agreement. The guarantee has qualifying conditions and exclusions; please read them before you buy.",
        ],
      },
      {
        heading: "After handover",
        paragraphs: [
          "Once funds are released, the business and its results are yours. You are responsible for your own platform subscriptions, ad spend, taxes, legal compliance and insurance. We provide the post-purchase support described on the listing for the period stated.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "Our total liability to you in connection with a purchase is limited to the price you paid for that business. Nothing in these terms limits liability that cannot be limited by law, including for fraud.",
        ],
      },
      {
        heading: "Disputes and governing law",
        paragraphs: [
          "If something goes wrong, contact us first; most issues are resolved during the inspection period. These terms are governed by the laws of the State of Delaware, and disputes will be heard in its courts, unless the law where you live gives you the right to bring a claim there.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    summary: "What personal information we collect, why, who we share it with, and the choices you have.",
    lastUpdated: "2026-10-14",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "When you contact us or request a due diligence pack: your name, email address and the message you send. When you buy: your name, email, billing address and payment details, which are collected and stored by Stripe, not by us. We receive confirmation of payment and the last four digits of your card.",
          "When you browse: standard server logs (IP address, browser, pages requested) kept for security and kept for no longer than 30 days.",
        ],
      },
      {
        heading: "Why we use it",
        paragraphs: [
          "To answer your questions, arrange due diligence calls, complete purchases and handovers, verify guarantee claims, meet our legal and tax obligations, and prevent fraud. We don't sell personal information and we don't use it for advertising profiles.",
        ],
      },
      {
        heading: "Who we share it with",
        paragraphs: [
          "Stripe (payments), our hosting provider (Vercel), our email provider, and, during a purchase, the seller of the business you're buying, limited to what's needed for the transfer. We share information with authorities only when the law requires it.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "Enquiries: 24 months from your last contact. Purchase records: 7 years, for tax and legal reasons. You can ask us to delete enquiry data at any time.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You can ask to see, correct, export or delete the personal information we hold about you, and object to how we use it. Email us and we'll respond within 30 days. If you're in the EU, UK or California, you have additional rights under local law, and you can complain to your data protection authority.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "This site uses only cookies that are strictly necessary for it to work, plus those Stripe sets on its checkout page to prevent fraud. We don't use advertising or cross-site tracking cookies.",
        ],
      },
    ],
  },
  {
    slug: "earnings-disclaimer",
    title: "Earnings disclaimer",
    summary: "How to read the figures on this site, and what they do and don't tell you.",
    lastUpdated: "2026-10-14",
    sections: [
      {
        heading: "Past figures are not a forecast",
        paragraphs: [
          "Revenue, profit and ad spend on listings describe what a business did over the period stated beside each figure. They are verified records of the past. They do not predict what the business will earn for you, and no statement on this site is a promise of future income.",
        ],
      },
      {
        heading: "Results depend on you and on things outside your control",
        paragraphs: [
          "How a business performs after handover depends on how it's run, how much is spent on advertising, ad platform policies and costs, supplier reliability, competition, seasonality and the wider economy. Businesses can earn less than they did before sale, and some lose money.",
        ],
      },
      {
        heading: "Case studies and testimonials",
        paragraphs: [
          "Case studies and testimonials describe individual buyers' experiences. They are not typical results and they are not a prediction of yours. Where a case study shows figures, they come from that buyer's store, shared with their permission.",
        ],
      },
      {
        heading: "The revenue stat",
        paragraphs: [
          "The average monthly revenue figure on our homepage is calculated across the sample of businesses stated beneath it, over the period stated. An average hides a range: some businesses in the sample earn considerably less.",
        ],
      },
      {
        heading: "The revenue guarantee",
        paragraphs: [
          "The revenue guarantee is a refund commitment with published conditions and exclusions. It is not a promise that a business will reach any level of revenue, and it covers only the period stated in its terms.",
        ],
      },
      {
        heading: "Get your own advice",
        paragraphs: [
          "Buying a business is a significant financial decision. We recommend speaking to an accountant or financial adviser before you buy. Nothing on this site is financial, legal or tax advice.",
        ],
      },
    ],
  },
];
