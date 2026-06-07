import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — Recalla" }, { name: "description", content: "Simple, honest pricing. Start free, upgrade when you need more." }] }),
  component: PricingPage,
});

const plans = (annual: boolean) => [
  { name: "Free", price: 0, tagline: "For getting started",
    features: ["5 meetings per month", "30 min recording limit per meeting", "Basic transcription", "7-day memory retention", "Email support"],
    cta: "Get Started Free", popular: false },
  { name: "Pro", price: annual ? 8 : 12, tagline: "For power users",
    features: ["Unlimited meetings", "Unlimited recording length", "AI knowledge extraction (tasks, decisions)", "Unlimited memory retention", "Smart proactive reminders", "Priority support"],
    cta: "Start 7-Day Free Trial", popular: true },
  { name: "Team", price: annual ? 20 : 29, suffix: "/user", tagline: "For teams of 2–20",
    features: ["Everything in Pro", "Up to 20 team members", "Shared meeting library", "Admin dashboard", "SSO & advanced security", "Dedicated support"],
    cta: "Contact Sales", popular: false },
];

const faqs = [
  { q: "Is my meeting data private?", a: "Yes. Recalla processes everything locally on your device by default. We never store or transmit your audio without explicit permission." },
  { q: "Does it work without internet?", a: "Yes. Our offline transcription engine works fully on-device. Cloud sync and semantic search use the internet but degrade gracefully." },
  { q: "What languages are supported?", a: "Recalla supports 47 languages including English, Urdu, Spanish, French, German, Arabic, Mandarin, Japanese and Hindi." },
  { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no questions. Cancel from settings and you'll keep Pro features until the end of your billing period." },
  { q: "How does the free plan work?", a: "Free forever — 5 meetings/month, 30-minute cap each. Perfect for occasional users. Upgrade to Pro any time without losing your data." },
];

function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const list = plans(annual);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <section className="pt-16 pb-12 text-center px-5">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Simple, <span className="gradient-text">honest pricing</span>
        </motion.h1>
        <p className="mt-4 text-lg text-subtext">Start free. Upgrade when you need more.</p>

        <div className="mt-8 inline-flex items-center gap-2 p-1 rounded-full bg-surface border border-border">
          {(["Monthly", "Annual"] as const).map((opt) => {
            const active = (opt === "Annual") === annual;
            return (
              <button key={opt} onClick={() => setAnnual(opt === "Annual")}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${active ? "text-white" : "text-subtext hover:text-foreground"}`}>
                {active && <motion.span layoutId="pill" className="absolute inset-0 gradient-bg rounded-full" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                <span className="relative flex items-center gap-2">
                  {opt} {opt === "Annual" && <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full">SAVE 30%</span>}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
          {list.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all hover:-translate-y-1 ${p.popular
                ? "bg-surface shadow-[var(--shadow-glow)] border-2 border-transparent [background-clip:padding-box] before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:p-[2px] before:bg-[var(--gradient-primary)]"
                : "bg-surface border border-border hover:shadow-[var(--shadow-card)]"}`}>
              {p.popular && (
                <span className="absolute -top-3 right-6 px-3 py-1 rounded-full gradient-bg text-white text-xs font-semibold inline-flex items-center gap-1 shadow-[var(--shadow-glow)]">
                  <Sparkles size={12} /> Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="text-sm text-subtext mt-1">{p.tagline}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">${p.price}</span>
                <span className="text-subtext">{p.suffix ?? ""}/month</span>
              </div>
              {annual && p.price > 0 && <p className="text-xs text-emerald-500 mt-1">Billed annually</p>}
              <ul className="mt-7 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check size={18} className="text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                p.popular ? "btn-gradient" : "border border-border hover:bg-muted"
              }`}>
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-surface overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-muted/40 transition-colors">
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown size={20} className={`shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-primary" : "text-subtext"}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm text-subtext leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
