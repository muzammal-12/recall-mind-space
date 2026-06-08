import type { ReactNode } from "react";

export function Badge({
  children,
  variant = "gradient",
  className = "",
}: { children: ReactNode; variant?: "gradient" | "soft" | "success" | "warn" | "danger"; className?: string }) {
  const styles: Record<string, string> = {
    gradient: "aurora-bg text-white",
    soft: "bg-[color-mix(in_oklab,var(--accent-blue)_15%,transparent)] text-[var(--accent-blue)] border border-[color-mix(in_oklab,var(--accent-blue)_30%,transparent)]",
    success: "bg-[color-mix(in_oklab,var(--success)_18%,transparent)] text-[var(--success)] border border-[color-mix(in_oklab,var(--success)_30%,transparent)]",
    warn: "bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] text-[var(--warning)] border border-[color-mix(in_oklab,var(--warning)_30%,transparent)]",
    danger: "bg-[color-mix(in_oklab,var(--error)_18%,transparent)] text-[var(--error)] border border-[color-mix(in_oklab,var(--error)_30%,transparent)]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
