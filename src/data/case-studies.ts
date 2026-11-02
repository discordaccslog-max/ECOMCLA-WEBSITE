import type { CaseStudy } from "@/lib/types";

/**
 * SAMPLE CASE STUDIES — placeholders for layout only.
 * Replace with real buyers' accounts, with their written permission and their
 * real figures, before launch.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "fernway-plant-co",
    buyerName: "Hannah Okoro",
    buyerPhoto: { src: "/people/hannah-okoro.svg", width: 160, height: 160 },
    buyerBackground: "Operations manager at a logistics firm; no previous e-commerce experience.",
    businessName: "Fernway Plant Co.",
    niche: "Home & living",
    purchasedMonth: "2026-02",
    purchasePrice: 13500,
    headline: "An ad account restriction in week two, and how it was resolved",
    summary:
      "Hannah bought a pre-built indoor-plant accessories store in February. Nine days after launch, Meta restricted her ad account. This is what happened, what it cost, and what changed afterwards.",
    months: [
      { month: "2026-02", revenue: 2310, profit: 260, adSpend: 1320 },
      { month: "2026-03", revenue: 3870, profit: 740, adSpend: 1540 },
      { month: "2026-04", revenue: 4420, profit: 910, adSpend: 1650 },
      { month: "2026-05", revenue: 4690, profit: 1010, adSpend: 1720 },
    ],
    sections: [
      {
        heading: "Why she bought",
        body: [
          "Hannah wanted a business she could run around a full-time job. She looked at building from scratch and estimated four to six months before she would know whether the products sold. Fernway had five months of sales behind it, and she could see every order in the Shopify admin during due diligence.",
        ],
      },
      {
        heading: "The handover",
        body: [
          "Escrow funded on 3 February. The domain, store, Instagram and TikTok transferred over six days, and supplier introductions happened on a three-way call. She confirmed receipt on 10 February and campaigns went live on 12 February.",
        ],
      },
      {
        heading: "Where it is now",
        body: [
          "By May the store was turning over $4,690 a month at a 21.5% margin, slightly ahead of where it was at sale. Hannah now spends about six hours a week on it, mostly on customer service and the weekly creative refresh.",
        ],
      },
    ],
    setback: {
      title: "Meta restricted the ad account on day nine",
      whatHappened:
        "An automated review flagged a before-and-after creative from the provided set as a policy breach. All Meta delivery stopped. Meta was carrying about 70% of the store's traffic at the time.",
      resolution:
        "Her buyer success manager filed the appeal with her the same afternoon, removed the creative from the set, and moved budget to TikTok and Pinterest using two pre-approved creatives. The appeal was granted after six days. We then reviewed every remaining creative in all live listings against the same policy and replaced four of them.",
      cost: "Six days without Meta delivery. February revenue was $2,310, the lowest month of the four.",
    },
    hardParts: [
      "The restriction itself. Six days of watching revenue stall in the first month is hard, even with help.",
      "Customer service volume. About 35 emails a week, mostly delivery questions, which she had not budgeted time for.",
      "Learning Ads Manager. The creative schedule told her what to run, but reading the results took about a month.",
    ],
    quote:
      "My ad account was flagged in week two, which was stressful. The team helped me file the appeal the same afternoon and swapped in compliant creatives while it was reviewed.",
    sample: true,
  },
  {
    slug: "brewcraft-supply",
    buyerName: "Aisha Khan",
    buyerPhoto: { src: "/people/aisha-khan.svg", width: 160, height: 160 },
    buyerBackground: "Product designer; had run a small Etsy shop for two years.",
    businessName: "Brewcraft Supply",
    niche: "Coffee & kitchen",
    listingSlug: "brewcraft-supply",
    purchasedMonth: "2026-07",
    purchasePrice: 41500,
    headline: "Buying an established store, and the courier change nobody planned for",
    summary:
      "Aisha bought a 15-month-old coffee-gear store with a loyal email list. Revenue grew modestly in her first four months, but a supplier's courier switch in September tested it.",
    months: [
      { month: "2026-07", revenue: 7640, profit: 1980, adSpend: 2520 },
      { month: "2026-08", revenue: 8310, profit: 2240, adSpend: 2710 },
      { month: "2026-09", revenue: 8020, profit: 2050, adSpend: 2780 },
      { month: "2026-10", revenue: 8890, profit: 2400, adSpend: 2930 },
    ],
    sections: [
      {
        heading: "Why she bought",
        body: [
          "Aisha wanted something with a track record rather than a new build. Brewcraft had 15 months of history, 24% of revenue from email, and a dip in January 2026 she asked about directly. The seller showed the supplier emails explaining the stock delay that caused it.",
        ],
      },
      {
        heading: "The handover",
        body: [
          "The transfer took nine days, including moving the Klaviyo account with 9,400 subscribers. The seller stayed on Slack for 30 days, which Aisha used mostly in the first two weeks to understand the reorder rhythm with the three suppliers.",
        ],
      },
      {
        heading: "Where it is now",
        body: [
          "October was the best month in the store's history at $8,890. Aisha cut the email cadence from three sends a week to two, which reduced unsubscribes without lowering email revenue.",
        ],
      },
    ],
    hardParts: [
      "In September the main supplier switched couriers. Delivery went from four days to seven, and refund requests doubled for three weeks until she negotiated the previous courier back for US orders.",
      "The email list was over-mailed. Unsubscribes ran at 1.1% per send when she took over.",
      "Keeping her day job. The first month took closer to fifteen hours a week than the nine in the listing.",
    ],
    quote:
      "I asked about the January dip before I paid and got a straight answer: a supplier delay, with the emails to prove it. That told me more than the good months did.",
    sample: true,
  },
  {
    slug: "ember-kitchen",
    buyerName: "Daniel Reyes",
    buyerPhoto: { src: "/people/daniel-reyes.svg", width: 160, height: 160 },
    buyerBackground: "High-school teacher; first business.",
    businessName: "Ember Kitchen",
    niche: "Coffee & kitchen",
    listingSlug: "ember-kitchen",
    purchasedMonth: "2026-04",
    purchasePrice: 9800,
    headline: "A first-time owner, a failed expansion, and what he kept",
    summary:
      "Daniel bought a five-month-old pre-built kitchen store as his first business. Month three went backwards when he added products too early. Month four recovered once he went back to what was working.",
    months: [
      { month: "2026-04", revenue: 3420, profit: 610, adSpend: 1540 },
      { month: "2026-05", revenue: 4180, profit: 790, adSpend: 1760 },
      { month: "2026-06", revenue: 3610, profit: 520, adSpend: 1690 },
      { month: "2026-07", revenue: 4960, profit: 1040, adSpend: 1980 },
    ],
    sections: [
      {
        heading: "Why he bought",
        body: [
          "Daniel wanted to learn e-commerce without spending months on product research. A pre-built store at under $10,000 with real sales history was a smaller first step than building one, and the 60-day support programme covered the parts he did not know.",
        ],
      },
      {
        heading: "The handover",
        body: [
          "Handover took seven days. Ads went live on 14 April, following the 30-day creative schedule. He joined all four weekly coaching calls.",
        ],
      },
      {
        heading: "Where it is now",
        body: [
          "July revenue was $4,960, above the pre-sale average. He has since added one product, a cast-iron care kit, after testing it on a $150 budget first.",
        ],
      },
    ],
    hardParts: [
      "In June he added four new products at once. None sold, and about $600 of test spend went with them, while the core products got less budget.",
      "Reading Ads Manager. He relied on the coaching calls for the first six weeks.",
      "Returns. Two damaged-in-transit claims in May took a week each to resolve with the supplier.",
    ],
    quote:
      "First business I have owned. The creative schedule meant I was not guessing what to run each week, and the Slack channel answered things I would have been embarrassed to ask anywhere else.",
    sample: true,
  },
];
