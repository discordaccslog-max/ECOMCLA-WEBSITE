"use client";

import { useEffect, useRef } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** id of the element that names the dialog */
  labelledBy: string;
  describedBy?: string;
  variant?: "center" | "sheet" | "fullscreen";
  className?: string;
  closeLabel?: string;
  children: React.ReactNode;
}

/**
 * Native <dialog> shown modally (background is inert), plus an explicit focus
 * trap, Escape and backdrop-click to close, scroll lock, and focus return.
 */
export function Dialog({ open, onClose, labelledBy, describedBy, variant = "center", className, closeLabel = "Close", children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // Declared before the focus trap so the dialog is shown before the trap looks for focusable elements.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  useFocusTrap(ref, open);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn(
        "m-0 max-h-none max-w-none bg-transparent p-0 text-fg backdrop:animate-fade-in open:flex",
        variant === "center" && "h-dvh w-full items-end justify-center sm:items-center sm:p-6",
        variant === "sheet" && "h-dvh w-full items-end",
        variant === "fullscreen" && "h-dvh w-full",
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-y-auto bg-surface shadow-lift",
          variant === "center" && "max-h-dvh animate-sheet-up rounded-t-card border border-line sm:max-h-dialog sm:max-w-2xl sm:animate-fade-in sm:rounded-card",
          variant === "sheet" && "max-h-sheet animate-sheet-up rounded-t-card border-t border-line",
          variant === "fullscreen" && "h-full animate-fade-in",
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full border border-line text-fg-muted transition hover:border-line-strong hover:text-fg"
        >
          <Icon name="close" size={20} />
        </button>
        {children}
      </div>
    </dialog>
  );
}
