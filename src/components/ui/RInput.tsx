import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
};

export const RInput = forwardRef<HTMLInputElement, Props>(function RInput(
  { icon, rightIcon, error, className = "", ...rest }, ref,
) {
  return (
    <div className="w-full">
      <div className={`relative flex items-center rounded-[10px] border transition-all duration-200 bg-[var(--bg-card)] ${error ? "border-[var(--error)] animate-shake" : "border-[var(--border)] focus-within:border-[var(--accent-blue)] focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent-blue)_15%,transparent)]"}`}>
        {icon && <span className="pl-3.5 text-[var(--text-muted)] flex items-center">{icon}</span>}
        <input
          ref={ref}
          className={`flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-[15px] py-3 ${icon ? "pl-2.5" : "pl-3.5"} ${rightIcon ? "pr-2" : "pr-3.5"} ${className}`}
          {...rest}
        />
        {rightIcon && <span className="pr-3 text-[var(--text-muted)] flex items-center">{rightIcon}</span>}
      </div>
      {error && <p className="mt-1.5 text-xs text-[var(--error)]">{error}</p>}
    </div>
  );
});
