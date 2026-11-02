import type { FaqItem } from "@/lib/types";

/**
 * Objection-handling FAQ. Answers may reference live terms as
 * {guaranteeAmount}, {guaranteePeriodDays}, {inspectionDays},
 * {escrowProvider} and {transferWindowDays}; lib/faq fills them from the
 * guarantee, escrow and buyer-protection data so they never drift.
 */
export const faq: FaqItem[] = [
  {
    id: "why-selling",
    question: "Why is the seller selling a business that makes money?",
    answer: [
      "Every listing states the seller's reason, and we ask for it in writing before we list. The common ones are a change of job, consolidating around a bigger brand, or wanting capital for something else. Pre-built stores are built by our team specifically to sell, and say so.",
      "If a reason doesn't add up, for example a seller leaving a store that is growing fast with no explanation, we ask more questions or decline the listing. You can also ask the seller directly on a due diligence call.",
    ],
  },
  {
    id: "revenue-drops",
    question: "What if revenue drops after I buy?",
    answer: [
      "It can. Revenue depends on how the store is run after handover, on ad platforms, and on the market. Several listings show months where revenue fell, and we show them on the chart rather than averaging them away.",
      "In your first {guaranteePeriodDays} days, the revenue guarantee applies: if the business doesn't generate at least {guaranteeAmount} in revenue and you met the conditions, we refund the full purchase price. After that, the business is yours, and so are its results. The 60-day support programme is there to help you through the first months.",
    ],
    link: { href: "/guarantee", label: "Read the guarantee terms" },
  },
  {
    id: "verification",
    question: "How are the figures verified?",
    answer: [
      "We don't accept screenshots. Before a listing goes live we review the Shopify admin on a live screen-share, match revenue against payment processor payouts, and export the ad account history. Each listing shows the date it was verified and the methods used.",
      "During due diligence you can repeat the screen-share yourself and ask the seller to open any report you like.",
    ],
    link: { href: "/how-it-works#verification", label: "How verification works" },
  },
  {
    id: "skills",
    question: "What skills do I need?",
    answer: [
      "You need to be comfortable running ads on Meta or TikTok from a schedule, answering customer emails, and placing orders with a supplier. You don't need to design, code or source products.",
      "If you have never run ads, the 60-day support programme covers it: four weekly coaching calls, a 30-day creative schedule, and a private Slack channel. Most buyers spend six to twelve hours a week; each listing states the seller's actual figure.",
    ],
  },
  {
    id: "ongoing-costs",
    question: "What are the ongoing costs after I buy?",
    answer: [
      "Ad spend is the largest: each listing shows the seller's monthly ad spend history so you can see what the revenue required. Beyond that, expect a Shopify plan ($39 to $105 a month), apps ($30 to $120 a month depending on the store), and email software if the store uses Klaviyo (from $20 a month, scaling with list size).",
      "Product costs come out of each sale, as the supplier is paid per order. The profit figures on each listing are after product cost, ad spend, apps and fees.",
    ],
  },
  {
    id: "exit",
    question: "What if I want to sell the business later?",
    answer: [
      "You can list it with us. Businesses bought through EcomCla already have verified history on file, which shortens the listing process. Our seller commission is the same as for any other seller.",
      "There is no lock-in and no buy-back obligation. If you sell during the guarantee period, the guarantee no longer applies.",
    ],
  },
  {
    id: "escrow",
    question: "Where does my money go when I pay?",
    answer: [
      "Your payment is processed by {escrowProvider} and held. It is not paid out to the seller until every asset has transferred and you confirm receipt. You have {inspectionDays} days after transfer to check everything.",
      "If assets don't transfer as described within {transferWindowDays} days, buyer protection applies and you can cancel for a full refund.",
    ],
    link: { href: "/buyer-protection", label: "Buyer protection terms" },
  },
];
