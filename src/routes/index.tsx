import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import {
  Sparkles, ArrowRight, Play, Shield, Zap, Lock,
  Mic, Users, BrainCircuit, Database, BellRing, ShieldCheck,
  FileText, Search, CheckCircle2, Star, Quote, TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientButton } from "@/components/ui/GradientButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/RBadge";
import { Avatar } from "@/components/ui/RAvatar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Recalla — Never Forget What Matters Most" },
      { name: "description", content: "AI-powered meeting memory. Transcribes, extracts tasks and decisions, and lets you query past sessions in plain English." },
      { property: "og:title", content: "Recalla — Your AI Memory for Every Meeting" },
      { property: "og:description", content: "Never lose a task, decision, or detail again." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[100vh] flex items-center pt-10 pb-20">
      {/* Aurora blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.18] blur-[80px] animate-blob"
          style={{ background: "var(--accent-blue)" }} />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.18] blur-[80px] animate-blob"
          style={{ background: "var(--accent-purple)", animationDelay: "-3s" }} />
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.14] blur-[80px] animate-blob"
          style={{ background: "var(--accent-teal)", animationDelay: "-6s" }} />
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold border"
            style={{
              background: "color-mix(in oklab, var(--accent-blue) 12%, transparent)",
              borderColor: "color-mix(in oklab, var(--accent-blue) 35%, transparent)",
              color: "var(--accent-blue)",
            }}
          >
            <Sparkles size={14} />
            AI-Powered Memory
          </motion.div>

          <h1 className="mt-6 font-display text-[40px] leading-[1.05] sm:text-6xl lg:text-[72px] font-extrabold tracking-tight">
            <StaggerWords text="Never Forget" />
            <br />
            <StaggerWords text="What" delay={0.4} />{" "}
            <span className="gradient-text"><StaggerWords text="Matters Most" delay={0.55} /></span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-6 text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed"
          >
            Recalla listens to your meetings, extracts every task and decision,
            and builds a memory you can search forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/signup">
              <GradientButton size="lg" className="group">
                Start Free — No Card Needed
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </GradientButton>
            </Link>
            <GradientButton size="lg" variant="outline">
              <span className="h-7 w-7 rounded-full aurora-bg text-white flex items-center justify-center">
                <Play size={12} fill="currentColor" />
              </span>
              Watch Demo
            </GradientButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]"
          >
            {[
              { icon: Shield, label: "Privacy First" },
              { icon: Zap, label: "Instant Setup" },
              { icon: Lock, label: "Works Offline" },
            ].map((b, i) => (
              <div key={b.label} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <b.icon size={16} className="text-[var(--accent-blue)]" />
                  <span className="font-medium">{b.label}</span>
                </div>
                {i < 2 && <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />}
              </div>
            ))}
          </motion.div>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}

function StaggerWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline">
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.08, duration: 0.45 }}
          className="inline-block mr-[0.25em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 80, damping: 20 });

  const transcriptLines = [
    { speaker: "Sarah", color: "#4F6EF7", text: "Let's lock the Q2 budget by Friday." },
    { speaker: "Bilal", color: "#7C3AED", text: "I'll send the revised numbers tonight." },
    { speaker: "Rania", color: "#0EA5E9", text: "Marketing spend cap stays at 18%." },
    { speaker: "Ali", color: "#10B981", text: "Approved. Let's move." },
  ];
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setVisible(v => (v >= transcriptLines.length ? 1 : v + 1)), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      style={{ perspective: 1000 }}
      className="relative"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl p-[1.5px] aurora-bg shadow-[0_30px_80px_-20px_rgba(79,110,247,0.5)]"
      >
        <div className="rounded-2xl bg-[var(--bg-surface)] p-5">
          <div className="flex items-center gap-1.5 mb-4">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full bg-[color-mix(in_oklab,var(--accent-purple)_15%,transparent)] text-[var(--accent-purple)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple)] animate-pulse" />
              AI Processing
            </span>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Live Transcript</p>
            <div className="space-y-2 min-h-[140px]">
              {transcriptLines.slice(0, visible).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2.5 items-start text-[13px]"
                >
                  <span className="h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-semibold text-white" style={{ background: l.color }}>{l.speaker[0]}</span>
                  <div>
                    <span className="font-semibold mr-1.5">{l.speaker}:</span>
                    <span className="text-[var(--text-secondary)]">{l.text}</span>
                    {i === visible - 1 && <span className="inline-block w-[2px] h-3.5 bg-[var(--accent-blue)] align-middle ml-0.5 animate-blink" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Tasks Detected</p>
            <div className="space-y-1.5">
              {[
                "Send revised Q2 numbers — Bilal — Tonight",
                "Cap marketing spend at 18% — Rania",
                "Finalize budget approval — All — Friday",
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.2 }}
                  className="flex items-center gap-2 text-[12.5px] text-[var(--text-secondary)]"
                >
                  <CheckCircle2 size={14} className="text-[var(--success)] shrink-0" />
                  {t}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── FEATURES ───────────────────────── */

const features = [
  { icon: Mic, title: "Real-Time Transcription", body: "Converts speech to structured text as your meeting happens, with 98% accuracy across accents and noise conditions.", grad: "linear-gradient(135deg,#4F6EF7,#7C3AED)" },
  { icon: Users, title: "Speaker Intelligence", body: "Automatically identifies and labels every speaker. Know exactly who said what and when throughout the session.", grad: "linear-gradient(135deg,#7C3AED,#EC4899)" },
  { icon: BrainCircuit, title: "Smart Extraction", body: "AI pulls out every action item, decision, and deadline without you lifting a finger. Structured and ready to act on.", grad: "linear-gradient(135deg,#0EA5E9,#4F6EF7)" },
  { icon: Database, title: "Semantic Memory", body: "Ask anything about any past meeting in plain English. Recalla finds the answer even if you forget the exact words.", grad: "linear-gradient(135deg,#10B981,#0EA5E9)" },
  { icon: BellRing, title: "Proactive Reminders", body: "Detects patterns in your task history and reminds you automatically — before you even think to set a reminder.", grad: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  { icon: ShieldCheck, title: "Complete Privacy", body: "Everything processes and stores locally on your device. Your conversations never touch an external server.", grad: "linear-gradient(135deg,#6366F1,#9F6FFF)" },
];

function Features() {
  return (
    <AnimatedSection id="features" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-5xl font-extrabold">Everything Built for <span className="gradient-text">Intelligence</span></h2>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">Not just transcription. A complete memory system.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <GlassCard hover className="p-6 h-full group cursor-pointer">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center text-white mb-5 transition-shadow group-hover:shadow-[0_10px_30px_-8px_rgba(79,110,247,0.5)]"
                style={{ background: f.grad }}
              >
                <f.icon size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">{f.body}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold gradient-text opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                Learn more <ArrowRight size={14} />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

/* ───────────────────────── HOW IT WORKS ───────────────────────── */

const steps = [
  { icon: Mic, title: "Record", body: "Open Recalla and tap record. It silently captures everything in the background." },
  { icon: FileText, title: "Transcribe", body: "Speech converts to structured text with speaker labels in real time." },
  { icon: Sparkles, title: "Extract", body: "AI identifies tasks, decisions, deadlines and key discussion points." },
  { icon: Search, title: "Recall", body: "Ask anything about any meeting. Get instant, accurate answers forever." },
];

function HowItWorks() {
  return (
    <AnimatedSection id="how" className="py-24 bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold">From Voice to <span className="gradient-text">Knowledge</span> in Seconds</h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">Four steps. Zero friction.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10">
          <svg className="hidden md:block absolute top-7 left-[12%] right-[12%] h-1 w-[76%]" viewBox="0 0 800 4" preserveAspectRatio="none">
            <motion.line
              x1="0" y1="2" x2="800" y2="2"
              stroke="url(#stepgrad)" strokeWidth="2" strokeDasharray="800"
              initial={{ strokeDashoffset: 800 }}
              whileInView={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="stepgrad" x1="0" x2="800" y1="0" y2="0">
                <stop offset="0" stopColor="#4F6EF7" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center flex flex-col items-center"
            >
              <div className="relative h-14 w-14 rounded-full p-[2px] aurora-bg">
                <div className="h-full w-full rounded-full bg-[var(--bg-surface)] flex items-center justify-center">
                  <span className="text-2xl font-bold gradient-text font-display">{i + 1}</span>
                </div>
              </div>
              <s.icon size={28} className="mt-4 text-[var(--accent-blue)]" />
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-[240px]">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ───────────────────────── STATS ───────────────────────── */

function Stats() {
  const items = [
    { value: 98, suffix: "%", label: "Transcription Accuracy", icon: TrendingUp },
    { value: 2, prefix: "< ", suffix: "s", label: "Avg Response Time", icon: Zap },
    { value: 0, label: "Data Sent to Servers", icon: Shield, customDisplay: "∞", swap: "0" },
    { value: 0, label: "External Servers Used", icon: Lock },
  ];
  return (
    <AnimatedSection className="py-20 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto rounded-3xl p-10 sm:p-14 aurora-bg relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <s.icon size={20} className="absolute right-0 top-0 text-white/60" />
              <div className="text-5xl sm:text-6xl font-extrabold text-white font-display tracking-tight">
                {s.customDisplay ?? <CountUp end={s.value} duration={2} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} enableScrollSpy scrollSpyOnce />}
              </div>
              <p className="mt-2 text-sm text-white/80 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ───────────────────────── TESTIMONIALS ───────────────────────── */

const testimonials = [
  { quote: "Recalla saved me hours every week. I used to spend 30 minutes after every meeting writing notes. Now I just ask it what was decided and get the answer instantly.", name: "Sarah K.", role: "Product Manager" },
  { quote: "As a student I record all my lectures. The way it extracts key concepts and lets me query them later is like having a photographic memory.", name: "Bilal A.", role: "Computer Science Student" },
  { quote: "The proactive reminders are what got me. It reminded me about a deliverable I completely forgot was assigned three meetings ago. Genuinely impressive.", name: "Rania M.", role: "Operations Lead" },
];

function Testimonials() {
  return (
    <AnimatedSection className="py-24 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-5xl font-extrabold">Trusted by <span className="gradient-text">Professionals & Students</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="p-6 relative h-full">
              <Quote size={48} className="absolute top-4 left-4 opacity-10" style={{ color: "var(--accent-blue)" }} />
              <div className="relative">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="italic text-[15px] text-[var(--text-secondary)] leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                  <Avatar name={t.name} />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

/* ───────────────────────── CTA ───────────────────────── */

function FinalCTA() {
  return (
    <AnimatedSection className="py-24 px-5 sm:px-8">
      <div className="relative max-w-6xl mx-auto rounded-3xl aurora-bg overflow-hidden p-12 sm:p-20 text-center">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Start Building Your AI Memory</h2>
          <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">Free forever. No credit card. Setup in 60 seconds.</p>
          <div className="mt-8 inline-block">
            <Link to="/signup">
              <GradientButton variant="white" size="lg">
                <span className="gradient-text">Create Free Account</span>
                <ArrowRight size={18} className="text-[var(--accent-purple)]" />
              </GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
