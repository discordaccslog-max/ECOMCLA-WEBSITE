import type { EscrowConfig, Step, TimedStep } from "@/lib/types";

/**
 * Escrow: the provider is named here so it can be swapped in one place.
 * CONFIRM BEFORE LAUNCH: the default describes funds collected through
 * Stripe and held until the buyer confirms receipt. If you use a licensed
 * escrow service (e.g. Escrow.com), change `provider` and the stage copy.
 */
export const escrow: EscrowConfig = {
  provider: {
    name: "Stripe",
    description: "Payments are processed by Stripe and held in EcomCla's client funds account, separate from operating funds, until release.",
    url: "https://stripe.com",
  },
  inspectionPeriodDays: 5,
  stages: [
    { id: "pay", title: "You pay", detail: "Pay the asking price through checkout. Nothing goes to the seller.", owner: "Buyer" },
    { id: "held", title: "Funds held", detail: "Your payment is held by the escrow provider while the transfer happens.", owner: "Escrow" },
    { id: "transfer", title: "Assets transfer", detail: "Store, domain, social accounts, creatives and supplier contacts move to you, item by item, on a tracked checklist.", owner: "Seller" },
    { id: "inspect", title: "You confirm receipt", detail: "You check every item against the listing. You have {inspectionDays} days.", owner: "Buyer" },
    { id: "release", title: "Funds released", detail: "Only after you confirm are funds released to the seller.", owner: "EcomCla" },
  ],
};

export const threeSteps: Step[] = [
  {
    title: "Choose a verified business",
    detail: "Every listing shows month-by-month revenue, profit and ad spend, verified on a live screen-share before it goes up. Request the due diligence pack and inspect it yourself.",
  },
  {
    title: "Pay into escrow",
    detail: "Your payment is held, not sent to the seller. Assets transfer to you on a tracked checklist, and funds are released only when you confirm everything arrived.",
  },
  {
    title: "Launch with support",
    detail: "Start the provided creative schedule within a week. Four coaching calls, a private Slack channel and the revenue guarantee cover your first month.",
  },
];

export const verificationSteps: Step[] = [
  { title: "Live screen-share of the store admin", detail: "The seller opens Shopify on a recorded call. We pull the Sales over time report for the full history and check it against the figures submitted." },
  { title: "Payouts matched to revenue", detail: "We reconcile reported revenue against Shopify Payments, Stripe or PayPal payout statements, so revenue can't be inflated with manual orders." },
  { title: "Ad account history exported", detail: "Ad spend comes from the ad platform's own export, not a spreadsheet. That's where the ad spend history on each listing comes from." },
  { title: "Figures published as recorded", detail: "We publish each month as it happened. No smoothing, no excluding bad months, and every figure states the period it covers." },
];

export const dueDiligenceItems: Step[] = [
  { title: "Analytics screen-share", detail: "A live call where the seller opens Shopify analytics and any report you ask for." },
  { title: "Ad account history", detail: "Full export of campaigns, spend, and results by month since launch." },
  { title: "Supplier contacts", detail: "Supplier names, agreed pricing, lead times, and an introduction call before you commit." },
  { title: "Revenue proof", detail: "Payment processor payout statements matched to the revenue on the listing." },
  { title: "Customer service history", detail: "A sample of support tickets, return rates, and chargeback history." },
  { title: "Asset inventory", detail: "The full list of what transfers, with account ages and follower counts as of today." },
];

export const firstFortyEightHours: TimedStep[] = [
  { when: "Hour 0", title: "Payment confirmed", detail: "You get an email receipt and your handover checklist. Funds are held, not paid to the seller." },
  { when: "Within 4 hours", title: "Handover call booked", detail: "Your buyer success manager contacts you to schedule the handover call at a time that suits you." },
  { when: "Within 24 hours", title: "Accounts start moving", detail: "Domain transfer and Shopify store ownership transfer are initiated. You receive the invites by email." },
  { when: "Within 48 hours", title: "Supplier introduction", detail: "A three-way call or email with the supplier, the seller and you. Creative files and the 30-day schedule are shared." },
];

export const handoverNextSteps: TimedStep[] = [
  { when: "Today", title: "Check your inbox", detail: "Your receipt and handover checklist are on their way to the email you paid with." },
  { when: "Within 4 hours", title: "We'll book your handover call", detail: "Your buyer success manager will contact you during support hours to schedule it." },
  { when: "Days 1–7", title: "Assets transfer to you", detail: "Domain, store, social accounts, creatives and supplier contacts move over on a tracked checklist." },
  { when: "After transfer", title: "Confirm receipt", detail: "Check everything against the listing. Funds are released to the seller only after you confirm." },
  { when: "Within 7 days of handover", title: "Launch your first campaign", detail: "Follow the creative schedule. Your guarantee period starts the day ads go live." },
];
