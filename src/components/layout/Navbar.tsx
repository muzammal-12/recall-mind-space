import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { RecallaLogo } from "@/components/icons/RecallaLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GradientButton } from "@/components/ui/GradientButton";

const links = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how" },
  { label: "Pricing", to: "/pricing" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[color-mix(in_oklab,var(--bg-surface)_80%,transparent)] border-b border-[var(--border)]"
          : "border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between">
        <Link to="/"><RecallaLogo /></Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => {
            const active = l.to && pathname === l.to;
            return l.to ? (
              <Link key={l.label} to={l.to} className={`text-sm font-medium story-link ${active ? "gradient-text" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="text-sm font-medium story-link text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                {l.label}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login" className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Login
          </Link>
          <Link to="/signup">
            <GradientButton size="sm">Get Started</GradientButton>
          </Link>
        </div>

        <button
          className="md:hidden h-11 w-11 flex items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-primary)]"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[var(--bg-surface)] z-50 p-6 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center mb-6">
                <RecallaLogo />
                <button onClick={() => setOpen(false)} className="h-11 w-11 flex items-center justify-center rounded-xl border border-[var(--border)]">
                  <X size={20} />
                </button>
              </div>
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {l.to ? (
                    <Link to={l.to} onClick={() => setOpen(false)} className="block py-3 text-base font-medium">{l.label}</Link>
                  ) : (
                    <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium">{l.label}</a>
                  )}
                </motion.div>
              ))}
              <div className="h-px bg-[var(--border)] my-3" />
              <Link to="/login" onClick={() => setOpen(false)} className="py-3 text-base font-medium">Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                <GradientButton fullWidth>Get Started Free</GradientButton>
              </Link>
              <div className="mt-auto"><ThemeToggle /></div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
