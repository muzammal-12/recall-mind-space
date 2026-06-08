import type { HTMLAttributes, ReactNode } from "react";

export function GlassCard({
  children,
  hover = false,
  className = "",
  ...rest
}: { children: ReactNode; hover?: boolean } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border bg-[var(--bg-card)] border-[var(--border)] shadow-[var(--shadow-card)] transition-all duration-300 ${
        hover ? "hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-15px_rgba(79,110,247,0.35)] hover:border-[color-mix(in_oklab,var(--accent-blue)_40%,var(--border))]" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
