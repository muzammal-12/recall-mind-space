import { Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const cols = [
  { title: "Product", items: ["Features", "Pricing", "Changelog", "Roadmap"] },
  { title: "Company", items: ["About", "Blog", "Careers", "Press"] },
  { title: "Legal", items: ["Privacy", "Terms", "Security", "DPA"] },
  { title: "Connect", items: ["Twitter", "GitHub", "LinkedIn", "Discord"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-subtext max-w-xs">
            Your AI memory for every meeting. Built for teams who care about details.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-display text-sm font-semibold mb-3">{c.title}</h4>
            <ul className="space-y-2">
              {c.items.map((i) => (
                <li key={i}><a href="#" className="text-sm text-subtext hover:text-foreground transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-subtext">© 2026 Recalla. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full border border-border hover:bg-muted"><Twitter size={16} /></a>
            <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full border border-border hover:bg-muted"><Github size={16} /></a>
            <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full border border-border hover:bg-muted"><Linkedin size={16} /></a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
