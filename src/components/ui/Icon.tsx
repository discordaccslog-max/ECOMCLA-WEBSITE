import type { SVGProps } from "react";

export type IconName =
  | "arrow-right" | "arrow-up-right" | "check" | "x" | "menu" | "close" | "plus" | "minus"
  | "shield" | "lock" | "clock" | "seal" | "chevron-down" | "filter" | "expand" | "chevron-left" | "chevron-right"
  | "doc" | "linkedin" | "mail" | "phone" | "chat" | "verified" | "alert";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  shield: <path d="M12 3 5 6v5.5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  seal: <><circle cx="12" cy="10" r="6" /><path d="M8.5 15 7 21l5-2.5 5 2.5-1.5-6" /></>,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-left": <path d="m15 6-6 6 6 6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  doc: <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></>,
  linkedin: <><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" /><path d="M8 10.5V16M8 7.8v.2M11.5 16v-3.2c0-1.5 1-2.3 2.1-2.3s1.9.8 1.9 2.3V16M11.5 10.5V16" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  phone: <path d="M6.5 4h3l1.5 4-2 1.5a10 10 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2Z" />,
  chat: <path d="M5 5h14v10H10l-5 4z" />,
  verified: <><path d="M12 2.8 14.2 5l3-.4.6 3 2.6 1.6-1.3 2.8 1.3 2.8-2.6 1.6-.6 3-3-.4L12 21.2 9.8 19l-3 .4-.6-3-2.6-1.6L4.9 12 3.6 9.2l2.6-1.6.6-3 3 .4Z" /><path d="m8.8 12 2.2 2.2 4.2-4.4" /></>,
  alert: <><path d="M12 4 3 20h18L12 4Z" /><path d="M12 10v4.5M12 17.2v.3" /></>,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

/** Decorative by default; pass aria-label (and role="img") when the icon carries meaning on its own. */
export function Icon({ name, size = 20, ...rest }: IconProps) {
  const labelled = Boolean(rest["aria-label"]);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={labelled ? undefined : true}
      role={labelled ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
