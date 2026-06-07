import { Brain } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center text-white shadow-[var(--shadow-glow)] group-hover:scale-105 transition-transform">
        <Brain size={20} strokeWidth={2.5} />
      </span>
      <span className="font-display text-xl font-bold tracking-tight">
        Recalla
      </span>
    </Link>
  );
}
