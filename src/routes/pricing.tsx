import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check, Package, Zap, Users, Flame, ArrowRight, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Recalla" },
      { name: "description", content: "Simple, honest pricing. Free forever for solo users." },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Free", icon: Package, iconGrad: "linear-gradient(135deg,#64748B,#94A3B8)",
    price: { m: 0, y: 0 }, subtitle: "Perfect to get started",
    features: ["5 meetings per month", "30 min recording limit", "Basic transcription", "7-day memory retention", "Email support"],
    cta: "Get Started Free", variant: "outline" as const,
  },
  {
    name: "Pro", icon: Zap, iconGrad: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
    price: { m: 12, y: 8 }, subtitle: "For serious professionals",
    features: ["Unlimited meetings", "Unlimited recording length", "AI knowledge extraction", "Unlimited memory retention", "Proactive smart reminders", "Priority support", "Advanced search & filters"],
    cta: "Start 7-Day Free Trial", variant: "gradient" as const, popular: true,
  },
  {
    name: "Team", icon: Users, iconGrad: "linear-gradient(135deg,#7C3AED,#EC4899)",
    price: { m: 29, y: 23 }, subtitle: "For collaborative teams", unit: "/user/month",
    features: ["Everything in Pro", "Up to 20 team members", "Shared meeting library", "Admin dashboard", "SSO & security controls", "Dedicated support", "Custom integrations"],
    cta: "Contact Sales", variant: "outline" as const,
  },
];

const faqs = [
  { q: "Is my meeting data private and secure?", a: "Absolutely. Recalla processes and stores all data locally on your device. Nothing is sent to external servers. Your meetings are only accessible by you." },
  { q: "Can Recalla work without internet?", a: "Yes. Core features including recording, transcription, and memory retrieval work fully offline. An internet connection is only needed for the initial setup." },
  { q: "What languages does Recalla support?", a: "Currently English is fully supported with 98% accuracy. Urdu, Arabic, and other languages are on our roadmap for the next major release." },
  { q: "Can I cancel my subscription anytime?", a: "Yes, cancel anytime with no questions asked. You keep access until the end of your billing period and your data remains yours forever." },
  { q: "How does the free plan work long-term?", a: "The free plan is genuinely free forever — not a trial. You get 5 meetings per month with 7-day memory retention. Upgrade when you need more power." },
];

function PricingPage() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Simple, Honest <span className="gradient-text">Pricing</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">Start free. Upgrade only when you need more.</p>

          <div className="mt-8 inline-flex items-center gap-3">
            <div className="relative inline-flex rounded-full p-1 bg-[var(--bg-card)] border border-[var(--border)]">
              {(["Monthly", "Annual"] as const).map((label, i) => {
                const active = (label === "Annual") === annual;
                return (
                  <button
                    key={label}
                    onClick={() => setAnnual(i === 1)}
                    className="relative z-10 px-5 py-2 text-sm font-semibold rounded-full transition-colors"
                    style={{ color: active ? "#fff" : "var(--text-secondary)" }}
                  >
                    {active && (
                      <motion.span
                        layoutId="billing-pill"
                        className="absolute inset-0 rounded-full aurora-bg"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {annual && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="rounded-full px-3 py-1 text-xs font-bold bg-[color-mix(in_oklab,var(--success)_18%,transparent)] text-[var(--success)] border border-[color-mix(in_oklab,var(--success)_30%,transparent)]"
                >
                  Save 30%
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t, i) => {
            const isPro = t.popular;
            const price = annual ? t.price.y : t.price.m;
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={isPro ? "lg:scale-[1.04] z-10" : ""}
              >
                <GlassCard hover={!isPro} className={`relative p-7 h-full flex flex-col ${isPro ? "animate-border-pulse !border-transparent [background:linear-gradient(var(--bg-card),var(--bg-card))_padding-box,var(--gradient-primary)_border-box] border-2" : ""}`}>
                  {isPro && (
                    <span className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full aurora-bg text-white text-xs font-bold px-3 py-1 shadow-[0_4px_12px_rgba(124,58,237,0.4)]">
                      <Flame size={12} /> Most Popular
                    </span>
                  )}
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center text-white mb-4" style={{ background: t.iconGrad }}>
                    <t.icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold">{t.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{t.subtitle}</p>

                  <div className="mt-5 flex items-baseline gap-1">
                    {annual && t.price.m > t.price.y && (
                      <span className="text-lg text-[var(--text-muted)] line-through mr-1">${t.price.m}</span>
                    )}
                    <span className={`text-5xl font-extrabold font-display ${isPro ? "gradient-text" : ""}`}>${price}</span>
                    <span className="text-sm text-[var(--text-muted)]">{t.unit ?? "/month"}</span>
                  </div>

                  <div className="my-5 h-px bg-[var(--border)]" />

                  <ul className="space-y-2.5 flex-1">
                    {t.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                        <Check size={16} className="text-[var(--success)] mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <GradientButton fullWidth variant={t.variant}>
                      {t.cta}
                      {isPro && <ArrowRight size={16} />}
                    </GradientButton>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <AnimatedSection className="mt-28 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-24 text-center">
          <Link to="/signup"><GradientButton size="lg">Start Free — No Card Needed <ArrowRight size={18} /></GradientButton></Link>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <GlassCard className="overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-semibold">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={20} className="text-[var(--accent-blue)]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-5 pb-5 text-[15px] text-[var(--text-secondary)] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
