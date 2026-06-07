import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Mic, Users, CheckSquare, Brain, Bell, Lock, Play, ArrowRight, Star,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Recalla — Your AI Memory for Every Meeting" },
      { name: "description", content: "Real-time transcription, task extraction, and semantic memory for meetings and lectures." },
      { property: "og:title", content: "Recalla — Your AI Memory for Every Meeting" },
      { property: "og:description", content: "Real-time transcription, task extraction, and semantic memory for meetings and lectures." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Mic, title: "Real-Time Transcription", desc: "Converts speech to text live as your meeting happens." },
  { icon: Users, title: "Speaker Detection", desc: "Knows who said what with automatic speaker labels." },
  { icon: CheckSquare, title: "Task Extraction", desc: "AI pulls out action items, decisions and deadlines automatically." },
  { icon: Brain, title: "Semantic Memory", desc: "Ask anything about past meetings in plain English." },
  { icon: Bell, title: "Smart Reminders", desc: "Get notified about tasks without ever setting a reminder manually." },
  { icon: Lock, title: "100% Private", desc: "Everything runs locally. Your meetings never leave your device." },
];

const steps = [
  { n: "01", title: "Record", desc: "Start recording your meeting with one tap." },
  { n: "02", title: "Transcribe", desc: "Recalla converts speech to text in real time." },
  { n: "03", title: "Extract", desc: "AI pulls out tasks, decisions, and key topics." },
  { n: "04", title: "Recall", desc: "Ask anything about past meetings anytime." },
];

const testimonials = [
  { name: "Ammad Rauf", role: "Product Manager, Lyra", initials: "AR", quote: "Recalla replaced three different tools. The semantic search alone is worth it — I can find any decision from any meeting in seconds." },
  { name: "Sara Iqbal", role: "PhD Student, MIT", initials: "SI", quote: "I record every lecture and just ask Recalla questions later. It's like having a perfect study partner that never forgets." },
  { name: "Daniel Chen", role: "Founder, Northwind", initials: "DC", quote: "Our standups are 40% shorter now. Recalla extracts everything and reminds us about commitments before they slip." },
];

const transcript = [
  { speaker: "Sara", text: "Let's lock the launch date for Q3." },
  { speaker: "Ammad", text: "Engineering says August 14th is realistic." },
  { speaker: "Daniel", text: "Marketing needs two weeks lead time." },
  { speaker: "Recalla", text: "✦ Task created: confirm launch — Ammad, by Friday." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 -left-20 h-96 w-96 rounded-full bg-[#4F6EF7] opacity-20 blur-3xl animate-blob" />
        <div className="absolute top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-[#7C3AED] opacity-20 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#9F6FFF] opacity-15 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-border bg-surface/60 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now in private beta
          </span>
          <h1 className="mt-5 font-display text-[36px] leading-[1.05] sm:text-5xl lg:text-[64px] font-bold tracking-tight">
            Your AI Memory for <span className="gradient-text">Every Meeting</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-subtext max-w-xl">
            Recalla listens, transcribes, and remembers — so you never lose an important detail, task, or decision again.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="px-6 py-3.5 rounded-xl btn-gradient text-base font-semibold hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2">
              Start Free <ArrowRight size={18} />
            </Link>
            <button className="px-6 py-3.5 rounded-xl border border-border bg-surface/60 backdrop-blur text-base font-semibold hover:bg-muted inline-flex items-center gap-2">
              <Play size={16} /> Watch Demo
            </button>
          </div>
          <p className="mt-5 text-sm text-subtext">
            ✦ No credit card required &nbsp; ✦ Free forever plan &nbsp; ✦ Works offline
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <div className="relative">
            <div className="glass rounded-3xl p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3"><span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-70" /><span className="rounded-full bg-red-500 h-3 w-3" /></span>
                  <span className="text-sm font-medium">Q2 Budget Review · 02:34</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="w-1 bg-primary rounded-full animate-wave" style={{ height: 16, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {transcript.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.5, duration: 0.4 }}
                    className={`flex gap-3 items-start ${t.speaker === "Recalla" ? "pl-4 border-l-2 border-accent" : ""}`}>
                    <span className="text-xs font-semibold text-primary min-w-16">{t.speaker}</span>
                    <span className="text-sm text-foreground/90">{t.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}
              className="absolute -bottom-6 -right-4 sm:-right-10 glass rounded-2xl p-4 max-w-xs shadow-[var(--shadow-card)]">
              <p className="text-xs text-subtext mb-1">Smart Reminder</p>
              <p className="text-sm font-medium">Send Q2 report to Ali by Friday 5pm</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything you need, <span className="gradient-text">nothing you don't</span>
          </h2>
          <p className="mt-4 text-lg text-subtext">Powerful, focused tools that disappear into the background of your work.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group glass rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center text-white shadow-[var(--shadow-glow)]">
                <f.icon size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold mt-5">{f.title}</h3>
              <p className="mt-2 text-sm text-subtext leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="py-20 md:py-28 bg-surface/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16">
          How <span className="gradient-text">Recalla</span> Works
        </motion.h2>

        <div className="relative grid md:grid-cols-4 gap-8">
          <motion.div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px origin-left"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
            style={{ background: "linear-gradient(90deg, #4F6EF7, #7C3AED)" }} />
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="relative text-center">
              <div className="mx-auto h-14 w-14 rounded-full gradient-bg flex items-center justify-center text-white font-display font-bold shadow-[var(--shadow-glow)] relative z-10">
                {s.n}
              </div>
              <h3 className="font-display text-lg font-semibold mt-5">{s.title}</h3>
              <p className="mt-2 text-sm text-subtext max-w-xs mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-14">
          Loved by students and professionals
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="snap-start min-w-[280px] glass rounded-2xl p-6">
              <div className="flex gap-0.5 text-amber-400 mb-4">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-semibold">{t.initials}</div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-subtext">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="py-16 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto rounded-3xl gradient-bg px-8 py-16 md:py-20 text-center text-white shadow-[var(--shadow-glow)]">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Start remembering everything. Free.
        </h2>
        <Link to="/signup" className="inline-flex mt-8 px-7 py-3.5 rounded-xl bg-white text-primary font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform">
          Create Free Account
        </Link>
      </div>
    </section>
  );
}
