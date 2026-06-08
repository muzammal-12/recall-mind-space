import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  Search, Bell, ChevronDown, Sun, Video, CheckSquare, BellRing, MessageSquare,
  TrendingUp, TrendingDown, Mic, Upload, Calendar, Clock, Users, AlarmClock,
  BrainCircuit, Send, X, Pause, StopCircle, Volume2, ArrowRight,
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Avatar } from "@/components/ui/RAvatar";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/RBadge";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Recalla" }, { name: "description", content: "Your meetings, tasks, reminders and memory." }] }),
  component: DashboardPage,
});

const stats = [
  { icon: Video, label: "Total Meetings", value: 24, trend: "+3 this week", up: true },
  { icon: CheckSquare, label: "Tasks Extracted", value: 87, trend: "+12 today", up: true },
  { icon: BellRing, label: "Active Reminders", value: 3, trend: "2 due today", up: false },
  { icon: MessageSquare, label: "Queries Asked", value: 42, trend: "+5 today", up: true },
];

const meetings = [
  { title: "Q2 Budget Review", date: "May 7, 2026", dur: "45 min", speakers: 4, tasks: 8, done: true },
  { title: "Product Roadmap Sprint 4", date: "May 5, 2026", dur: "62 min", speakers: 6, tasks: 12, done: true },
  { title: "Client Onboarding — Ali Khan", date: "May 3, 2026", dur: "28 min", speakers: 2, tasks: 5, done: true },
  { title: "Weekly Team Standup", date: "Apr 30, 2026", dur: "22 min", speakers: 8, tasks: 6, done: false },
  { title: "Investor Update Call", date: "Apr 28, 2026", dur: "55 min", speakers: 3, tasks: 9, done: true },
];

const reminders = [
  { urgency: "var(--error)", text: "Prepare finance report", src: "Budget Review", due: "Today 5PM" },
  { urgency: "var(--warning)", text: "Send proposal to Ali Khan", src: "Onboarding", due: "Tomorrow" },
  { urgency: "var(--success)", text: "Review sprint velocity", src: "Standup", due: "In 3 days" },
];

function DashboardPage() {
  const [section, setSection] = useState("dashboard");
  const [recording, setRecording] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      <Sidebar active={section} onSelect={(id) => { setSection(id); if (id === "record") setRecording(true); }} />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-[var(--border)] bg-[var(--bg-surface)] flex items-center gap-4 px-5 sm:px-7 sticky top-0 z-30">
          <h2 className="text-base font-semibold capitalize">{section.replace("-", " ")}</h2>
          <div className="hidden md:flex flex-1 max-w-lg mx-auto">
            <div className="w-full relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                placeholder="Search meetings, tasks, memories..."
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent-blue)_15%,transparent)] transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative h-10 w-10 rounded-xl border border-[var(--border)] flex items-center justify-center hover:bg-[var(--bg-card)]">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full text-[9px] font-bold bg-[var(--error)] text-white flex items-center justify-center">3</span>
            </button>
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[var(--bg-card)]">
              <Avatar name="Ammad Ahmad" size={32} />
              <ChevronDown size={14} className="text-[var(--text-muted)]" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8 space-y-8">
          {/* Greeting */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2.5">
              Good morning, Ammad <Sun size={26} className="text-[var(--warning)]" />
            </h1>
            <p className="mt-1.5 text-[var(--text-secondary)]">Here's what's happening with your meetings today.</p>
            <p className="mt-0.5 text-xs text-[var(--text-muted)] font-mono">Monday, June 8, 2026</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <GlassCard className="relative overflow-hidden p-5">
                  <div className="absolute inset-x-0 top-0 h-[3px] aurora-bg" />
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{s.label}</p>
                    <s.icon size={18} className="text-[var(--accent-blue)]" />
                  </div>
                  <div className="mt-2 text-4xl font-extrabold font-display gradient-text">
                    <CountUp end={s.value} duration={1.6} />
                  </div>
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                    {s.up ? <TrendingUp size={12} className="text-[var(--success)]" /> : <TrendingDown size={12} className="text-[var(--warning)]" />}
                    {s.trend}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3">
            <GradientButton onClick={() => setRecording(true)}><Mic size={16} /> Record Meeting</GradientButton>
            <GradientButton variant="outline"><Upload size={16} /> Upload Audio</GradientButton>
            <GradientButton variant="outline"><MessageSquare size={16} /> Ask Recalla</GradientButton>
          </div>

          {/* Meetings + Reminders grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Recent Meetings</h3>
                <a href="#" className="text-sm font-semibold gradient-text inline-flex items-center gap-1">View all <ArrowRight size={14} /></a>
              </div>
              {meetings.map((m, i) => (
                <motion.div key={m.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <GlassCard hover className="p-4 flex items-center gap-4">
                    <div className="relative h-11 w-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#4F6EF7,#7C3AED)" }}>
                      <Video size={18} className="text-white" />
                      <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-card)]" style={{ background: m.done ? "var(--success)" : "var(--warning)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{m.title}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                        <span className="inline-flex items-center gap-1"><Calendar size={12} />{m.date}</span>
                        <span className="inline-flex items-center gap-1"><Clock size={12} />{m.dur}</span>
                        <span className="inline-flex items-center gap-1"><Users size={12} />{m.speakers}</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                      <Badge variant="gradient">{m.tasks} tasks</Badge>
                      <GradientButton size="sm" variant="outline">View Summary</GradientButton>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Active Reminders</h3>
                <BellRing size={18} className="text-[var(--accent-purple)]" />
              </div>
              {reminders.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i }}>
                  <GlassCard className="p-4 flex items-start gap-3">
                    <span className="relative shrink-0 mt-0.5">
                      <span className="absolute inset-0 rounded-full opacity-50 animate-pulse" style={{ background: r.urgency }} />
                      <span className="relative h-2.5 w-2.5 rounded-full block" style={{ background: r.urgency }} />
                    </span>
                    <AlarmClock size={16} className="text-[var(--text-muted)] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{r.text}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">from {r.src}</p>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)] shrink-0">{r.due}</span>
                  </GlassCard>
                </motion.div>
              ))}

              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BrainCircuit size={18} className="text-[var(--accent-blue)]" />
                  <h4 className="font-bold text-sm">Ask Recalla</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {["What tasks are assigned to me?", "Summary of last sprint?"].map(q => (
                    <button key={q} className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-colors">
                      {q}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    placeholder="What was decided about the marketing budget?"
                    className="flex-1 h-10 px-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent-blue)]"
                  />
                  <button className="h-10 w-10 rounded-xl aurora-bg text-white flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform">
                    <Send size={14} />
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>{recording && <RecordingModal onClose={() => setRecording(false)} />}</AnimatePresence>
    </div>
  );
}

function RecordingModal({ onClose }: { onClose: () => void }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const transcript = [
    { name: "Sarah", color: "#4F6EF7", text: "We need to finalize the launch timeline before Friday." },
    { name: "Bilal", color: "#7C3AED", text: "Engineering will need at least two extra days." },
    { name: "Rania", color: "#0EA5E9", text: "Let's split design review and ship the rest." },
  ];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-[560px] rounded-3xl bg-[var(--bg-surface)] border border-[var(--border)] shadow-[0_30px_80px_rgba(0,0,0,0.4)] p-7">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Recording Session</h3>
            <button onClick={onClose} className="h-9 w-9 rounded-lg hover:bg-[var(--bg-card)] flex items-center justify-center">
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <div className="relative h-32 w-32 flex items-center justify-center">
              {[0, 0.6, 1.2].map(d => (
                <span
                  key={d}
                  className="absolute inset-0 rounded-full border-2 animate-ripple"
                  style={{ borderColor: "var(--accent-blue)", animationDelay: `${d}s` }}
                />
              ))}
              <span className="relative h-28 w-28 rounded-full aurora-bg flex items-center justify-center shadow-[0_10px_40px_rgba(124,58,237,0.5)]">
                <Mic size={38} className="text-white" />
              </span>
            </div>

            <div className="mt-6 text-5xl font-display font-extrabold gradient-text font-mono tracking-tight">
              {mm}:{ss}
            </div>

            <div className="mt-6 w-full flex items-end justify-center gap-1 h-16">
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-full origin-bottom animate-wave"
                  style={{
                    background: `linear-gradient(180deg, var(--accent-blue), var(--accent-purple))`,
                    animationDuration: `${0.4 + (i % 5) * 0.1}s`,
                    animationDelay: `${(i % 7) * 0.08}s`,
                    height: "100%",
                  }}
                />
              ))}
            </div>

            <div className="mt-6 w-full space-y-2 max-h-32 overflow-hidden">
              {transcript.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className="flex items-start gap-2.5 text-[13px]"
                >
                  <span className="h-5 w-5 rounded-full shrink-0 mt-0.5" style={{ background: l.color }} />
                  <span><b className="font-semibold">{l.name}:</b> <span className="text-[var(--text-secondary)]">{l.text}</span></span>
                </motion.div>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-4">
              <button className="h-12 w-12 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                <Volume2 size={18} />
              </button>
              <button className="h-12 w-12 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                <Pause size={18} />
              </button>
              <button onClick={onClose} className="h-14 w-14 rounded-full bg-[var(--error)] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(239,68,68,0.5)] hover:scale-105 active:scale-95 transition-transform">
                <StopCircle size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
