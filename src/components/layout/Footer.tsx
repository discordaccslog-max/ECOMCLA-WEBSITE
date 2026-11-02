import Link from "next/link";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { ResponseTime } from "@/components/ui/ResponseTime";
import { getAddressLines, getCompany, getSupportHoursLine } from "@/lib/company";
import { footerNav, legalNav } from "@/lib/site";
import { Logo } from "./Logo";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const company = getCompany();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-site px-gutter pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">
              A marketplace for pre-built and established e-commerce businesses. Every listing is verified before it goes live, and every purchase runs through escrow.
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <ResponseTime showHours />
              <p className="text-fg-muted">
                <a href={`mailto:${company.email}`} className="underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg">
                  {company.email}
                </a>
                <span className="text-fg-subtle"> · </span>
                <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`} className="hover:text-fg">
                  {company.phone}
                </a>
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h2 className="font-sans text-label font-semibold text-fg-subtle uppercase">{col.heading}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <PaymentMarks />
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-fg-muted underline-offset-4 hover:text-fg hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid gap-4 text-xs leading-relaxed text-fg-subtle sm:grid-cols-2">
          <address className="not-italic">
            <span className="text-fg-muted">{company.legalName}</span> · Registered in {company.jurisdiction} · {company.registrationNumber}
            <br />
            Registered office: {getAddressLines().join(", ")}
          </address>
          <p className="sm:text-right">
            © <CopyrightYear /> {company.legalName}. Support hours {getSupportHoursLine()}.
            <br />
            Past performance of a business does not predict its future results. See our{" "}
            <Link href="/earnings-disclaimer" className="underline underline-offset-2 hover:text-fg-muted">earnings disclaimer</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
