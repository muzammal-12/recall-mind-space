import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Recalla" }, { name: "description", content: "Sign in to your Recalla account." }] }),
  component: LoginPage,
});

const floatCards = [
  { title: "Meeting Summary", body: "Q2 Budget Review · 4 decisions captured" },
  { title: "3 Action Items", body: "Assigned to Sara, Ammad, Daniel" },
  { title: "Reminder", body: "Report due Friday 5pm" },
];

function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
      <div className="hidden lg:flex relative overflow-hidden gradient-bg p-12 text-white flex-col justify-between">
        <Logo />
        <div className="relative h-full flex items-center">
          <div className="space-y-5 w-full">
            {floatCards.map((c, i) => (
              <motion.div key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{ delay: i * 0.3, y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6 } }}
                className="glass rounded-2xl p-5 max-w-sm backdrop-blur-xl bg-white/10 border border-white/20"
                style={{ marginLeft: i * 30 }}>
                <p className="text-xs uppercase tracking-wider opacity-80">{c.title}</p>
                <p className="mt-1 font-medium">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">Your memory,<br />supercharged.</h2>
          <p className="mt-3 opacity-80 max-w-md">Capture every meeting. Recall every decision. Never forget another commitment.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-subtext">Sign in to continue to Recalla.</p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Field label="Email">
              <input type="email" placeholder="you@company.com" className="input" />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input type={showPw ? "text" : "password"} placeholder="••••••••" className="input pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-subtext">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded accent-primary" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline font-medium">Forgot password?</a>
            </div>
            <button className="w-full py-3 rounded-xl btn-gradient font-semibold hover:scale-[1.01] active:scale-[0.99]">Login</button>
          </form>

          <Divider />
          <GoogleButton />
          <p className="mt-6 text-center text-sm text-subtext">
            Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>

      <style>{`.input{width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:var(--surface);color:var(--foreground);outline:none;transition:all 200ms}.input:focus{border-color:var(--primary);box-shadow:0 0 0 4px color-mix(in oklab, var(--primary) 18%, transparent)}`}</style>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs text-subtext">or continue with</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export function GoogleButton() {
  return (
    <button className="w-full py-3 rounded-xl border border-border bg-surface hover:bg-muted font-medium inline-flex items-center justify-center gap-3 transition-colors">
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 35.5 44 30.2 44 24c0-1.3-.1-2.4-.4-3.5z"/>
      </svg>
      Google
    </button>
  );
}
