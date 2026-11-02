/**
 * What's included with every EcomCla business. Exact quantities for a given
 * business are on its listing; these are the standards every listing meets.
 */
export const included = {
  store: {
    id: "store",
    title: "The store build",
    figure: "1",
    figureLabel: "Shopify store, live and trading",
    summary: "A complete Shopify store with real sales history: theme configured, products live, checkout tested, policies written.",
    features: [
      { label: "Conversion-tested theme", detail: "Product pages, cart drawer and upsells set up and tested on mobile." },
      { label: "Products and pricing", detail: "Live catalogue with pricing set from real margin data." },
      { label: "Apps configured", detail: "Reviews, email capture, and shipping-protection apps connected." },
      { label: "Policies and legal pages", detail: "Shipping, returns, privacy and terms written for the store." },
      { label: "Domain", detail: "Custom domain transferred into your registrar account." },
    ],
    provided: ["Store ownership transfer to your Shopify account", "Custom domain and DNS", "Theme files and any custom code", "Product catalogue, descriptions and images", "Order and customer history"],
    notProvided: ["Your Shopify subscription (from $39/mo) and paid apps after handover", "A new theme or redesign", "Payment processor account: you connect your own Shopify Payments"],
  },
  creatives: {
    id: "creatives",
    title: "Ad creatives and video assets",
    figure: "18–40",
    figureLabel: "static creatives, plus 6–12 video ads",
    summary: "The ads that produced the revenue on the listing, in every format the platforms need, with a 30-day schedule for running them.",
    formats: [
      { ratio: "9:16", label: "Stories & Reels", aspect: "aspect-9/16" },
      { ratio: "4:5", label: "Feed", aspect: "aspect-4/5" },
      { ratio: "1:1", label: "Square", aspect: "aspect-square" },
      { ratio: "16:9", label: "YouTube & web", aspect: "aspect-video" },
    ],
    provided: ["Static creatives in 1:1, 4:5 and 9:16", "Video ads with 2–3 alternative hooks each", "Editable source files (Figma or Canva, and project files for video)", "A 30-day creative schedule: what to run, in which order, at what budget", "Performance notes for each creative from the seller's account"],
    notProvided: ["New creative production after handover", "Rights to use a creator's likeness beyond the licence term stated on the listing", "The seller's ad account itself (you launch from your own)"],
  },
  social: {
    id: "social",
    title: "Social media accounts",
    figure: "2–3",
    figureLabel: "brand accounts with real followers",
    summary: "The store's brand accounts transfer to you with their followers, content and history intact.",
    platforms: [
      { name: "Instagram", what: "Business account, full ownership", note: "Linked to your Meta Business Manager on handover" },
      { name: "TikTok", what: "Business account, full ownership", note: "Email and phone moved to yours" },
      { name: "Facebook page", what: "Admin rights, seller removed", note: "Required for Meta ads" },
      { name: "Pinterest", what: "Where the store has one", note: "Listed per business" },
    ],
    provided: ["Full ownership of each brand account listed", "All posts, highlights and saved content", "Follower counts as stated on the listing, checked at transfer"],
    notProvided: ["The seller's personal profiles", "Paid followers: we check for them and reject listings that have them", "Ongoing content creation"],
  },
  supplier: {
    id: "supplier",
    title: "Supplier and fulfilment setup",
    figure: "3–6",
    figureLabel: "day typical US delivery",
    summary: "A vetted supplier who already ships the store's orders, introduced to you directly, with pricing agreed in writing.",
    flow: [
      { node: "Customer orders", detail: "On your store" },
      { node: "Order sent to supplier", detail: "Automatically, or by you within 48 hours" },
      { node: "Supplier picks and ships", detail: "From a US warehouse in most listings" },
      { node: "Tracking to customer", detail: "Synced back to Shopify" },
    ],
    provided: ["Supplier introduction on a three-way call", "Agreed pricing sheet and lead times in writing", "Order-processing SOP", "Backup supplier for top products, where listed"],
    notProvided: ["Inventory purchase: most stores ship on demand. Where a 3PL holds stock, it is sold separately at landed cost", "Product liability insurance", "Exclusive supply agreements, unless stated on the listing"],
  },
  support: {
    id: "support",
    title: "Post-purchase support",
    figure: "60",
    figureLabel: "days of hands-on support",
    summary: "A named buyer success manager, a coaching call every week for your first month, and a private Slack channel for 60 days.",
    timeline: [
      { when: "Week 1", what: "Handover call and launch plan" },
      { when: "Week 2", what: "First results review" },
      { when: "Week 3", what: "Creative rotation and budget call" },
      { when: "Week 4", what: "Month-one review" },
      { when: "Days 1–60", what: "Private Slack channel, replies within support hours" },
    ],
    provided: ["Named buyer success manager", "Four weekly one-hour coaching calls", "Private Slack channel for 60 days", "Help with ad account reviews and appeals during the first 60 days"],
    notProvided: ["Running the store for you", "Ad management or spend on your behalf", "Support beyond 60 days"],
  },
} as const;
