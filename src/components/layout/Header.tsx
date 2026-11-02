"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-base/85 backdrop-blur-xl">
      <div className="mx-auto flex h-header max-w-site items-center justify-between gap-6 px-gutter">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(item.href) ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg md:block">
            Contact
          </Link>
          <ButtonLink href="/listings" size="md" icon={null} className="hidden sm:inline-flex">
            Browse listings
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-full border border-line text-fg transition hover:border-line-strong lg:hidden"
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} labelledBy="mobile-menu-title" variant="fullscreen" closeLabel="Close menu" className="bg-base">
        <div className="flex min-h-full flex-col px-gutter pt-5 pb-10">
          <h2 id="mobile-menu-title" className="sr-only">Menu</h2>
          <div className="flex h-11 items-center">
            <Logo />
          </div>
          <nav aria-label="Mobile" className="mt-12">
            <ul className="divide-y divide-line border-y border-line">
              {[...primaryNav, { href: "/contact", label: "Contact" }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-5 font-display text-title font-semibold text-fg"
                  >
                    {item.label}
                    <Icon name="arrow-right" size={20} className="text-fg-subtle" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-10">
            <ButtonLink href="/listings" size="lg" className="w-full" onClick={() => setOpen(false)}>
              Browse listings
            </ButtonLink>
          </div>
        </div>
      </Dialog>
    </header>
  );
}
