import { cn } from "@/lib/cn";

export function Container({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-site px-gutter", className)} {...rest}>
      {children}
    </div>
  );
}
