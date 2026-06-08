import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type Props = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  variant?: "gradient" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export const GradientButton = forwardRef<HTMLButtonElement, Props>(function GradientButton(
  { children, variant = "gradient", size = "md", fullWidth, className = "", ...rest },
  ref,
) {
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-[52px] px-7 text-base",
  };
  const base = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-[0.3px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-blue)] focus-visible:ring-offset-[var(--bg-primary)] disabled:opacity-60 disabled:cursor-not-allowed ${sizes[size]} ${fullWidth ? "w-full" : ""}`;

  const styles: Record<string, string> = {
    gradient: "text-white aurora-bg shadow-[0_4px_15px_rgba(79,110,247,0.4)] hover:shadow-[0_8px_30px_rgba(79,110,247,0.55)] hover:brightness-110",
    outline: "border border-transparent bg-clip-padding [background:linear-gradient(var(--bg-card),var(--bg-card))_padding-box,var(--gradient-primary)_border-box] border-2 text-[var(--text-primary)] hover:[background:linear-gradient(color-mix(in_oklab,var(--accent-blue)_8%,var(--bg-card)),color-mix(in_oklab,var(--accent-purple)_8%,var(--bg-card)))_padding-box,var(--gradient-primary)_border-box]",
    ghost: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]",
    white: "bg-white text-[var(--accent-blue)] shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${base} ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
});
