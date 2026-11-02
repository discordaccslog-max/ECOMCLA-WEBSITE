"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export type InquiryKind = "contact" | "due-diligence";

interface InquiryFormProps {
  kind: InquiryKind;
  listingSlug?: string;
  listingName?: string;
  topics?: { value: string; label: string }[];
  defaultTopic?: string;
  /** e.g. "1 hr 48 min", shown at the point of submission. */
  responseTime: string;
  supportHours: string;
}

type Status = { state: "idle" } | { state: "sending" } | { state: "sent"; expectation: string } | { state: "error"; message: string };

const field =
  "mt-2 block w-full rounded-xl border border-line-strong bg-base px-4 py-3 text-base text-fg placeholder:text-fg-subtle transition-colors hover:border-fg-subtle focus:border-accent aria-invalid:border-danger";

export function InquiryForm({ kind, listingSlug, listingName, topics, defaultTopic, responseTime, supportHours }: InquiryFormProps) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) next.email = "Enter an email address we can reply to.";
    if (kind === "contact" && (data.message ?? "").trim().length < 10) next.message = "Tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, kind, listingSlug }),
      });
      const body = (await res.json().catch(() => ({}))) as { expectation?: string; error?: string };
      if (!res.ok) throw new Error(body.error ?? "We couldn't send that. Please try again.");
      setStatus({ state: "sent", expectation: body.expectation ?? `We'll reply within ${responseTime} during support hours.` });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="rounded-card border border-accent/30 bg-accent/5 p-6">
        <Icon name="check" size={24} className="text-accent" />
        <p className="mt-3 font-display text-xl font-bold">Received. Here&rsquo;s what happens next.</p>
        <p className="mt-2 leading-relaxed text-fg-muted">{status.expectation}</p>
        <p className="mt-2 text-sm text-fg-subtle">Support hours: {supportHours}.</p>
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-1.5 text-sm text-danger">
        {errors[name]}
      </p>
    ) : null;
  const a11y = (name: string) => ({ "aria-invalid": Boolean(errors[name]) || undefined, "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="hidden">
        <label>
          Leave blank
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {kind === "due-diligence" && listingName ? (
        <p className="rounded-xl border border-line bg-base px-4 py-3 text-sm text-fg-muted">
          Requesting the due diligence pack for <strong className="text-fg">{listingName}</strong>
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-semibold text-fg">Full name</label>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" required className={field} {...a11y("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-semibold text-fg">Email</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className={field} {...a11y("email")} />
          {err("email")}
        </div>
      </div>

      {topics ? (
        <div>
          <label htmlFor={`${id}-topic`} className="text-sm font-semibold text-fg">What&rsquo;s it about?</label>
          <select id={`${id}-topic`} name="topic" defaultValue={defaultTopic ?? topics[0].value} className={cn(field, "appearance-none")}>
            {topics.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      ) : null}

      {kind === "due-diligence" ? (
        <div>
          <label htmlFor={`${id}-budget`} className="text-sm font-semibold text-fg">
            Have you bought an online business before? <span className="font-normal text-fg-subtle">(optional)</span>
          </label>
          <select id={`${id}-budget`} name="experience" defaultValue="" className={cn(field, "appearance-none")}>
            <option value="">Prefer not to say</option>
            <option value="first">This would be my first</option>
            <option value="some">Yes, one or two</option>
            <option value="many">Yes, several</option>
          </select>
        </div>
      ) : null}

      <div>
        <label htmlFor={`${id}-message`} className="text-sm font-semibold text-fg">
          {kind === "due-diligence" ? "Anything you'd like us to include?" : "Message"}
          {kind === "due-diligence" ? <span className="font-normal text-fg-subtle"> (optional)</span> : null}
        </label>
        <textarea id={`${id}-message`} name="message" rows={4} className={cn(field, "resize-y")} {...a11y("message")} />
        {err("message")}
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-sm text-fg-muted">
          <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-fg-subtle" />
          <span>
            Average first reply <strong className="text-fg">{responseTime}</strong> during support hours ({supportHours}).
            {kind === "due-diligence" ? " The pack follows within one business day." : null}
          </span>
        </p>
        <Button type="submit" variant="primary" disabled={status.state === "sending"} className="shrink-0">
          {status.state === "sending" ? "Sending…" : kind === "due-diligence" ? "Request the pack" : "Send message"}
        </Button>
      </div>

      {status.state === "error" ? (
        <p role="alert" className="flex items-start gap-2 rounded-xl border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-fg">
          <Icon name="alert" size={18} className="mt-0.5 shrink-0 text-danger" />
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
