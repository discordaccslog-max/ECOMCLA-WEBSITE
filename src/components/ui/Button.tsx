import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "ink";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-semibold whitespace-nowrap transition duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-strong",
  secondary: "border border-line-strong text-fg hover:border-fg-subtle hover:bg-surface-2",
  ghost: "text-fg hover:text-accent",
  ink: "bg-paper-ink text-paper hover:bg-steel-2",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps extends Omit<React.ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  icon?: IconName | null;
  className?: string;
}

export function ButtonLink({ variant, size, icon = "arrow-right", className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {icon ? <Icon name={icon} size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" /> : null}
    </Link>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: IconName | null;
}

export function Button({ variant, size, icon = null, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {icon ? <Icon name={icon} size={18} /> : null}
    </button>
  );
}

export function TextLink({ className, children, ...rest }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn("inline-flex items-center gap-1.5 font-semibold underline decoration-1 underline-offset-4 transition-colors hover:decoration-2", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
