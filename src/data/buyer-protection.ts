import type { Clause, IsoDate, Step } from "@/lib/types";

/** Transfer protection terms rendered on /buyer-protection and summarised on every listing. */
export const buyerProtection = {
  transferWindowDays: 14,
  lastUpdated: "2026-10-14" as IsoDate,
  summary:
    "If any asset on the listing doesn't transfer to you as described, you don't pay for what you didn't receive. Funds stay in escrow until it's fixed, and you can cancel for a full refund if it can't be.",
  covered: [
    { id: "not-transferred", title: "An asset doesn't transfer", detail: "Any item on the listing's included list is not in your control within {transferWindowDays} days of payment." },
    { id: "not-as-described", title: "An asset isn't as described", detail: "Follower counts, subscriber counts, account ages or creative counts are more than 10% below what the listing states on the day of transfer." },
    { id: "access-revoked", title: "Access is taken back", detail: "The seller removes your access, reclaims an account, or changes a password on a transferred asset during the inspection period." },
    { id: "supplier-unavailable", title: "The supplier won't supply you", detail: "The listed supplier refuses to fulfil orders for you on the terms in the listing, and no equivalent replacement is agreed." },
  ] satisfies Clause[],
  notCovered: [
    { id: "future-performance", title: "Future revenue", detail: "Buyer protection covers the transfer of assets. First-month revenue is covered separately by the revenue guarantee." },
    { id: "excluded-items", title: "Items listed as not included", detail: "Anything on the listing's “What's not included” list." },
    { id: "after-confirmation", title: "Issues raised after you confirm receipt", detail: "Once you confirm receipt and funds are released, transfer claims close. Check everything during the inspection period." },
    { id: "platform-changes", title: "Platform-wide changes", detail: "Changes made by Shopify, Meta, TikTok or others that apply to all accounts, such as fee or policy changes." },
  ] satisfies Clause[],
  remedies: [
    { title: "We fix it", detail: "Your buyer success manager works with the seller to complete or correct the transfer. Funds stay in escrow throughout." },
    { title: "Partial refund", detail: "If an asset can't be delivered but you want to keep the business, we agree a partial refund for that asset with you before releasing funds." },
    { title: "Full cancellation", detail: "If a material asset (the store, domain or main supplier) can't be delivered within {transferWindowDays} days, you can cancel. Assets come back, and your payment is refunded in full within 5 business days." },
  ] satisfies Step[],
  howToRaise: [
    { title: "Tell us during inspection", detail: "Reply to your handover thread or use the contact form, and say which asset is affected." },
    { title: "Show us what you see", detail: "A screenshot or screen recording of the missing or incorrect asset." },
    { title: "Funds are frozen", detail: "Release to the seller is paused automatically until the issue is closed." },
  ] satisfies Step[],
};
