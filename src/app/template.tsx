import { ViewTransition } from "react";

/**
 * Templates remount on every route change, so enter/exit fire on navigation
 * only — not on search-param updates (listing filters) or Suspense reveals.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
