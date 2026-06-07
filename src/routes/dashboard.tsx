import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Home, Mic, FileText, Brain, Bell, NotebookPen, Calendar, Settings,
  Search, BellDot, ChevronDown, Menu, X, ArrowUpRight, Send, Square,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Recalla" }, { name: "description", content: "Your meetings, tasks, and memory at a glance." }] }),
  component: DashboardPage,
});

const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Mic, label: "Record Meeting" },
  { icon: FileText, label: "My Meetings" },
  { icon: Brain, label: "Memory / Query" },
  { icon: Bell, label: "Reminders" },
  { icon: NotebookPen, label: "Notes" },
  { icon: Calendar, label: "Timeline" },
  { icon: Settings, label: "Settings" },
];

const stats = [
  { label: "Total Meetings", value: 24, trend: "+12%" },
  { label: "Tasks Extracted", value: 87, trend: "+34%" },
  { label: "Reminders Active", value: 3, trend: "−1" },
  { label: "Queries Asked", value: 42, trend: "+8%" },
];

const meetings = [
  { title: "Q2 Budget Review", date: "Today · 9:30 AM", duration: "42 min", tasks: 6 },
  { title: "Product Roadmap Sprint 4", date: "Yesterday · 2:00 PM", duration: "1h 12m", tasks: 11 },
  { title: "Client Onboarding — Ali Khan", date: "Jun 5 · 11:00 AM", duration: "38 min", tasks: 4 },
  { title: "Design Critique — Recalla v2", date: "Jun 4 · 4:30 PM", duration: "55 min", tasks: 7 },
  { title: "Engineering Standup", date: "Jun 3 · 10:00 AM", duration: "18 min", tasks: 3 },
];

const reminders = [
  { color: "bg-red-500", label: "Send Q2 report to Ali — today 5pm" },
  { color: "bg-amber-400", label: "Review roadmap deck — tomorrow" },
  { color: "bg-emerald-500", label: "Schedule follow-up with Sara — Friday" },
];

function useCount(target: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return n;
}

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-surface/60 sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-border"><Logo /></div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((it) => (
            <button key={it.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                it.active ? "gradient-bg text-white shadow-[var(--shadow-glow)]" : "text-subtext hover:bg-muted hover:text-foreground"
              }`}>
              <it.icon size={18} />
              {it.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border flex items-center justify-between">
          <Link to="/" className="text-xs text-subtext hover:text-foreground">← Back to site</Link>
          <ThemeToggle />
        </div>
      </aside>

      {/* Sidebar drawer mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-foreground/30 z-40 lg:hidden" />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-surface z-50 flex flex-col lg:hidden">
              <div className="px-5 py-5 border-b border-border flex items-center justify-between">
                <Logo />
                <button onClick={() => setSidebarOpen(false)} className="h-9 w-9 flex items-center justify-center rounded-lg border border-border"><X size={18} /></button>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {navItems.map((it) => (
                  <button key={it.label}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      it.active ? "gradient-bg text-white" : "text-subtext hover:bg-muted hover:text-foreground"
                    }`}>
                    <it.icon size={18} />{it.label}
                  </button>
                ))}
              </nav>
              <div className="p-3 border-t border-border flex justify-end"><ThemeToggle /></div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border">
          <div className="h-16 px-4 sm:px-6 flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden h-10 w-10 flex items-center justify-center rounded-lg border border-border">
              <Menu size={18} />
            </button>
            <div className="flex-1 max-w-xl relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext" />
              <input placeholder="Search meetings, tasks, or notes…"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-surface text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all" />
            </div>
            <button className="relative h-10 w-10 flex items-center justify-center rounded-full border border-border hover:bg-muted">
              <BellDot size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <button className="flex items-center gap-2 h-10 px-2 pr-3 rounded-full border border-border hover:bg-muted">
              <span className="h-7 w-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">AR</span>
              <span className="hidden sm:inline text-sm font-medium">Ammad</span>
              <ChevronDown size={14} className="text-subtext" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-5 sm:p-8 pb-32 space-y-8">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-2xl sm:text-3xl font-bold">Good morning, Ammad <span aria-hidden>👋</span></h1>
              <p className="mt-1 text-subtext">Here's what's happening across your meetings today.</p>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => <StatCard key={s.label} s={s} delay={i * 0.05} />)}
            </div>

            {/* Recording panel */}
            <RecordingPanel recording={recording} setRecording={setRecording} />

            {/* Recent meetings */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-semibold">Recent Meetings</h2>
                <button className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1">
                  View all <ArrowUpRight size={14} />
                </button>
              </div>
              <div className="space-y-3">
                {meetings.map((m, i) => (
                  <motion.div key={m.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="group flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all">
                    <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center text-primary"><FileText size={18} /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{m.title}</p>
                      <p className="text-xs text-subtext mt-0.5">{m.date} · {m.duration} · {m.tasks} tasks</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-muted">View Summary</button>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Reminders */}
            <section>
              <h2 className="font-display text-xl font-semibold mb-4">Active Reminders</h2>
              <div className="flex flex-wrap gap-2.5">
                {reminders.map((r) => (
                  <div key={r.label} className="inline-flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full bg-surface border border-border text-sm">
                    <span className={`h-2 w-2 rounded-full ${r.color}`} />
                    {r.label}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Ask Recalla floating bar */}
        <div className="sticky bottom-0 z-30 px-4 sm:px-8 pb-5 pointer-events-none">
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="pointer-events-auto max-w-3xl mx-auto glass rounded-2xl p-2 pl-5 flex items-center gap-3 shadow-[var(--shadow-glow)]">
            <Brain size={18} className="text-primary shrink-0" />
            <input placeholder="Ask anything about your meetings…" className="flex-1 bg-transparent outline-none text-sm py-2" />
            <button className="h-10 w-10 flex items-center justify-center rounded-xl btn-gradient"><Send size={16} /></button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ s, delay }: { s: { label: string; value: number; trend: string }; delay: number }) {
  const n = useCount(s.value);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="p-5 rounded-2xl bg-surface border border-border hover:shadow-[var(--shadow-card)] transition-shadow">
      <p className="text-xs text-subtext uppercase tracking-wider">{s.label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <span className="font-display text-3xl font-bold">{n}</span>
        <span className={`text-xs font-semibold ${s.trend.startsWith("−") ? "text-amber-500" : "text-emerald-500"}`}>{s.trend}</span>
      </div>
    </motion.div>
  );
}

function RecordingPanel({ recording, setRecording }: { recording: boolean; setRecording: (b: boolean) => void }) {
  return (
    <section className="rounded-3xl p-6 sm:p-8 bg-surface border border-border">
      <div className="flex flex-wrap items-center gap-6">
        <div className="relative">
          {recording && <>
            <span className="absolute inset-0 rounded-full bg-red-500/40 animate-ripple" />
            <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ripple" style={{ animationDelay: "0.6s" }} />
          </>}
          <button onClick={() => setRecording(!recording)}
            className={`relative h-20 w-20 rounded-full flex items-center justify-center text-white font-bold transition-all ${
              recording ? "bg-red-500 scale-95" : "gradient-bg hover:scale-105"
            }`}>
            {recording ? <Square size={26} fill="white" /> : <Mic size={28} />}
          </button>
        </div>
        <div className="flex-1 min-w-[200px]">
          <p className="font-display text-lg font-semibold">{recording ? "Recording…" : "Ready to record"}</p>
          <p className="text-sm text-subtext mt-0.5">{recording ? "Live transcript + tasks appearing below." : "Tap the mic to capture your next meeting."}</p>
        </div>
        <div className="flex items-end gap-1 h-12">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`w-1 rounded-full bg-primary ${recording ? "animate-wave" : ""}`}
              style={{ height: recording ? 36 : 8, animationDelay: `${i * 0.06}s` }} />
          ))}
        </div>
        {recording && (
          <div className="ml-auto inline-flex items-center gap-2 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            02:34
          </div>
        )}
      </div>

      {recording && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="mt-6 pt-6 border-t border-border space-y-2.5 overflow-hidden">
          {[
            { s: "Sara", t: "Let's lock the launch date for Q3." },
            { s: "Ammad", t: "Engineering says August 14th is realistic." },
            { s: "Daniel", t: "Marketing needs two weeks lead time." },
          ].map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.5 }}
              className="flex gap-3 text-sm">
              <span className="text-primary font-semibold min-w-16">{l.s}</span>
              <span>{l.t}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
