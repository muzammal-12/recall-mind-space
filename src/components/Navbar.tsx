import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-subtext hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold rounded-lg btn-gradient hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started Free
          </Link>
        </div>
        <button
          className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg border border-border"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-surface z-50 p-6 flex flex-col gap-4"
            >
              <div className="flex justify-between items-center mb-4">
                <Logo />
                <button onClick={() => setOpen(false)} className="h-10 w-10 flex items-center justify-center rounded-lg border border-border">
                  <X size={20} />
                </button>
              </div>
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-base font-medium">
                  {l.label}
                </a>
              ))}
              <div className="h-px bg-border my-2" />
              <Link to="/login" className="py-2 text-base font-medium">Login</Link>
              <Link to="/signup" className="px-4 py-3 text-center font-semibold rounded-lg btn-gradient">
                Get Started Free
              </Link>
              <div className="mt-auto"><ThemeToggle /></div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
