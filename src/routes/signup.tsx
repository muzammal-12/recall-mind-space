import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Logo } from "@/components/Logo";
import { Field, Divider, GoogleButton } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Recalla" }, { name: "description", content: "Create your free Recalla account." }] }),
  component: SignupPage,
});

const floatCards = [
  { title: "8,400+ users", body: "Building smarter workflows" },
  { title: "Tasks Extracted", body: "1.2M and counting" },
  { title: "Meetings remembered", body: "Forever, privately" },
];

function passwordScore(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

function SignupPage() {
  const [pw, setPw] = useState("");
  const score = useMemo(() => passwordScore(pw), [pw]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
      <div className="hidden lg:flex relative overflow-hidden gradient-bg p-12 text-white flex-col justify-between">
        <Logo />
        <div className="space-y-5">
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
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">Join thousands building<br />smarter workflows.</h2>
          <p className="mt-3 opacity-80 max-w-md">Free forever for solo users. No credit card required.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="font-display text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-subtext">Start remembering everything in under a minute.</p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Field label="Full Name"><input className="input" placeholder="Ammad Rauf" /></Field>
            <Field label="Email"><input type="email" className="input" placeholder="you@company.com" /></Field>
            <Field label="Password">
              <input type="password" className="input" placeholder="At least 8 characters" value={pw} onChange={(e) => setPw(e.target.value)} />
              <div className="mt-2 flex gap-1.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div key={i}
                    initial={false}
                    animate={{ opacity: i < score ? 1 : 0.2 }}
                    transition={{ duration: 0.25 }}
                    className={`h-1.5 flex-1 rounded-full ${i < score ? strengthColors[Math.max(0, score - 1)] : "bg-border"}`} />
                ))}
              </div>
              {pw && <p className="mt-1 text-xs text-subtext">Strength: <span className="font-medium text-foreground">{strengthLabels[Math.max(0, score - 1)] ?? "Weak"}</span></p>}
            </Field>
            <Field label="Confirm Password"><input type="password" className="input" placeholder="Repeat password" /></Field>
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="h-4 w-4 mt-0.5 rounded accent-primary" />
              <span className="text-subtext">I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a></span>
            </label>
            <button className="w-full py-3 rounded-xl btn-gradient font-semibold hover:scale-[1.01] active:scale-[0.99]">Create Account</button>
          </form>

          <Divider />
          <GoogleButton />
          <p className="mt-6 text-center text-sm text-subtext">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>

      <style>{`.input{width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:var(--surface);color:var(--foreground);outline:none;transition:all 200ms}.input:focus{border-color:var(--primary);box-shadow:0 0 0 4px color-mix(in oklab, var(--primary) 18%, transparent)}`}</style>
    </div>
  );
}
