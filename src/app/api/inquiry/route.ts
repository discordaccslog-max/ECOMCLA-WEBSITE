import { NextResponse } from "next/server";
import { getResponseTime, getSupportHoursLine } from "@/lib/company";
import { getListing } from "@/lib/listings";

interface InquiryBody {
  kind?: unknown;
  name?: unknown;
  email?: unknown;
  message?: unknown;
  topic?: unknown;
  experience?: unknown;
  listingSlug?: unknown;
  company_website?: unknown;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Receives contact and due-diligence requests. Validates and acknowledges;
 * delivery to your inbox or CRM is wired in deliverInquiry (see README, "Forms").
 */
export async function POST(request: Request) {
  let body: InquiryBody;
  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return NextResponse.json({ error: "We couldn't read that request. Please try again." }, { status: 400 });
  }

  const rt = getResponseTime();
  const expectationFor = (kind: string) =>
    kind === "due-diligence"
      ? `We'll reply within ${rt.value} on average during support hours (${getSupportHoursLine()}) to book your screen-share, and send the pack within one business day.`
      : `We'll reply within ${rt.value} on average during support hours (${getSupportHoursLine()}).`;

  // Honeypot: bots fill hidden fields. Acknowledge without processing.
  if (str(body.company_website, 200)) return NextResponse.json({ ok: true, expectation: expectationFor("contact") });

  const kind = body.kind === "due-diligence" ? "due-diligence" : "contact";
  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const message = str(body.message, 5000);
  const listing = typeof body.listingSlug === "string" ? getListing(body.listingSlug) : undefined;

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  if (kind === "contact" && message.length < 10) return NextResponse.json({ error: "Please add a little more detail to your message." }, { status: 422 });
  if (kind === "due-diligence" && !listing) return NextResponse.json({ error: "We couldn't find that listing." }, { status: 422 });

  await deliverInquiry({ kind, name, email, message, topic: str(body.topic, 60), experience: str(body.experience, 20), listing: listing?.slug });

  return NextResponse.json({ ok: true, expectation: expectationFor(kind) });
}

async function deliverInquiry(inquiry: { kind: string; name: string; email: string; message: string; topic: string; experience: string; listing?: string }) {
  // Replace with your email provider or CRM. Logged server-side only, never to the browser.
  console.info(`[inquiry] ${inquiry.kind}${inquiry.listing ? ` (${inquiry.listing})` : ""} from ${inquiry.email}`);
}
