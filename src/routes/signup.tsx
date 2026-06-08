import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { User, Mail, Lock, UserPlus, Loader2, Brain, TrendingUp, BadgeCheck } from "lucide-react";
import { RecallaLogo } from "@/components/icons/RecallaLogo";
import { RInput } from "@/components/ui/Input";
import { GradientButton } from "@/components/ui/GradientButton";
import { GoogleButton } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Recalla" }, { name: "description", content: "Start your free Recalla account." }] }),
  component: SignupPage,
});

const strengthColors = ["#EF4444", "#F59E0B", "#3B82F6", "#10B981"];
const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

function score(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

function SignupPage() {
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const s = useMemo(() => score(pw), [pw]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <motion.div
        initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex relative overflow-hidden aurora-bg p-12 flex-col justify-between"
      >
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="relative z-10"><RecallaLogo white /></div>

        <div className="relative z-10 space-y-6">
          {[
            { icon: Brain, title: "Memory Created", body: "Lecture archive ready to query", offset: 0 },
            { icon: BadgeCheck, title: "24 meetings • 87 tasks", body: "Last 30 days tracked", offset: 40 },
            { icon: TrendingUp, title: "Pattern Detected", body: "Weekly standup follow-ups identified", offset: 20 },
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
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center"><c.icon size={18} /></span>
                <p className="font-semibold">{c.title}</p>
              </div>
              <p className="mt-2.5 text-sm text-white/85">{c.body}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="relative z-10 font-display text-4xl font-bold text-white leading-tight">
          Join thousands building<br />smarter workflows.
        </h2>
      </motion.div>

      <motion.div
        initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center p-6 sm:p-12 bg-[var(--bg-surface)]"
      >
        <div className="w-full max-w-md">
          <div className="mb-8"><Link to="/"><RecallaLogo /></Link></div>
          <h1 className="text-3xl sm:text-[34px] font-extrabold">Create your account</h1>
          <p className="mt-2 text-[var(--text-secondary)] inline-flex items-center gap-1.5">
            <BadgeCheck size={16} className="text-[var(--success)]" />
            Start for free, no credit card required
          </p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1400); }}
          >
            <RInput icon={<User size={16} />} placeholder="Ammad Ahmad" required />
            <RInput icon={<Mail size={16} />} type="email" placeholder="you@company.com" required />
            <div>
              <RInput
                icon={<Lock size={16} />}
                type="password"
                placeholder="At least 8 characters"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
              />
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex-1 flex gap-1.5">
                  {[0, 1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={{
                        backgroundColor: i < s ? strengthColors[Math.max(0, s - 1)] : "var(--border)",
                      }}
                      transition={{ duration: 0.25 }}
                      className="h-1.5 flex-1 rounded-full"
                    />
                  ))}
                </div>
                {pw && (
                  <span className="text-xs font-semibold" style={{ color: strengthColors[Math.max(0, s - 1)] }}>
                    {strengthLabels[Math.max(0, s - 1)]}
                  </span>
                )}
              </div>
            </div>
            <RInput icon={<Lock size={16} />} type="password" placeholder="Confirm password" required />

            <label className="flex items-start gap-2.5 text-sm cursor-pointer pt-1">
              <input type="checkbox" className="h-4 w-4 mt-0.5 rounded accent-[var(--accent-blue)]" required />
              <span className="text-[var(--text-secondary)]">
                I agree to the <a className="gradient-text font-medium" href="#">Terms of Service</a> and{" "}
                <a className="gradient-text font-medium" href="#">Privacy Policy</a>
              </span>
            </label>

            <GradientButton fullWidth size="lg" type="submit" disabled={loading}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : <><UserPlus size={18} /> Create Account</>}
            </GradientButton>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <div className="h-px bg-[var(--border)] flex-1" /> or <div className="h-px bg-[var(--border)] flex-1" />
          </div>

          <GoogleButton />

          <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold gradient-text">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
