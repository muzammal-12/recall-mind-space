import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2, Mic, CheckSquare, Bell } from "lucide-react";
import { RecallaLogo } from "@/components/icons/RecallaLogo";
import { RInput } from "@/components/ui/RInput";
import { GradientButton } from "@/components/ui/GradientButton";
import { Badge } from "@/components/ui/RBadge";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Recalla" }, { name: "description", content: "Sign in to your Recalla workspace." }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT */}
      <motion.div
        initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex relative overflow-hidden aurora-bg p-12 flex-col justify-between"
      >
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="relative z-10"><RecallaLogo white /></div>

        <div className="relative z-10 space-y-6">
          {[
            { icon: Mic, title: "Meeting Recorded", body: "Q2 Budget Review • 47 minutes", tag: "Transcribed", tagVariant: "soft" as const, offset: 0 },
            { icon: CheckSquare, title: "3 Tasks Extracted", body: "Send report • Confirm budget • Schedule sync", tag: null, offset: 40 },
            { icon: Bell, title: "Reminder", body: "Finance report due — Tomorrow 5PM", tag: "Urgent", tagVariant: "danger" as const, offset: 20 },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 0.3 + i * 0.2, duration: 0.5 },
                y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
              }}
              className="rounded-2xl p-5 max-w-sm backdrop-blur-xl bg-white/12 border border-white/25 text-white"
              style={{ marginLeft: c.offset }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center"><c.icon size={18} /></span>
                  <p className="font-semibold">{c.title}</p>
                </div>
                {c.tag && <Badge variant={c.tagVariant}>{c.tag}</Badge>}
              </div>
              <p className="mt-2.5 text-sm text-white/85">{c.body}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="relative z-10 font-display text-4xl font-bold text-white leading-tight">
          Your memory,<br />supercharged.
        </h2>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-center p-6 sm:p-12 bg-[var(--bg-surface)]"
      >
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Link to="/"><RecallaLogo /></Link></div>
          <div className="hidden lg:flex mb-8"><Link to="/"><RecallaLogo size={32} /></Link></div>

          <h1 className="text-3xl sm:text-[34px] font-extrabold">Welcome back</h1>
          <p className="mt-2 text-[var(--text-secondary)]">Sign in to your Recalla workspace.</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1400); }}
          >
            <RInput icon={<Mail size={16} />} type="email" placeholder="you@example.com" required />
            <RInput
              icon={<Lock size={16} />}
              type={show ? "text" : "password"}
              placeholder="Your password"
              required
              rightIcon={
                <button type="button" onClick={() => setShow(s => !s)} className="hover:text-[var(--text-primary)]">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded accent-[var(--accent-blue)]" />
                <span className="text-[var(--text-secondary)]">Remember me</span>
              </label>
              <a href="#" className="font-medium gradient-text">Forgot password?</a>
            </div>

            <GradientButton fullWidth size="lg" type="submit" disabled={loading}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : <><LogIn size={18} /> Sign In</>}
            </GradientButton>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <div className="h-px bg-[var(--border)] flex-1" /> or <div className="h-px bg-[var(--border)] flex-1" />
          </div>

          <GoogleButton />

          <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold gradient-text">Create one free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function GoogleButton() {
  return (
    <button className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center gap-3 font-medium hover:bg-[color-mix(in_oklab,var(--accent-blue)_5%,var(--bg-card))] transition-colors">
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      Continue with Google
    </button>
  );
}
