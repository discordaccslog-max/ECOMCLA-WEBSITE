import type { TeamMember } from "@/lib/types";

/**
 * SAMPLE PEOPLE — placeholders for layout only.
 * Replace names, photos, bios and LinkedIn URLs with your real team before
 * launch. The LinkedIn URLs below are deliberately non-resolving placeholders.
 */
export const team: TeamMember[] = [
  {
    name: "Daniel Okafor",
    role: "Co-founder & CEO",
    photo: { src: "/people/daniel-okafor.svg", width: 480, height: 600 },
    bio: "Daniel has bought, run and sold six Shopify stores since 2018. He started EcomCla after his own first acquisition arrived with screenshots instead of access, and a supplier who had never heard of him.",
    background: ["Previously Head of Growth at a DTC home-goods brand ($14M revenue)", "Operated six Shopify stores, sold four", "BSc Economics, University of Manchester"],
    linkedinUrl: "https://www.linkedin.com/in/replace-with-real-profile-1",
    sample: true,
  },
  {
    name: "Mara Lindqvist",
    role: "Co-founder & Head of Operations",
    photo: { src: "/people/mara-lindqvist.svg", width: 480, height: 600 },
    bio: "Mara runs verification and handover. Every figure on a listing has been through her checklist, and every transfer follows her playbook: domain, store, accounts, supplier, then funds.",
    background: ["Seven years in M&A due diligence for small online businesses", "Built the handover process used on every EcomCla sale", "MSc Accounting & Finance, Stockholm School of Economics"],
    linkedinUrl: "https://www.linkedin.com/in/replace-with-real-profile-2",
    sample: true,
  },
  {
    name: "Priya Raman",
    role: "Head of Buyer Success",
    photo: { src: "/people/priya-raman.svg", width: 480, height: 600 },
    bio: "Priya leads the post-purchase programme: the coaching calls, the creative schedule and the Slack channel. She was a media buyer for four years before joining, and still reviews every launch plan.",
    background: ["Former senior media buyer, managing $3M+ in annual Meta spend", "Runs onboarding for every buyer in their first 60 days", "BA Communications, University of Toronto"],
    linkedinUrl: "https://www.linkedin.com/in/replace-with-real-profile-3",
    sample: true,
  },
];
