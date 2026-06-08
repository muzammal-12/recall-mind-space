import { Link } from "@tanstack/react-router";
import { Github, Twitter, Linkedin } from "lucide-react";
import { RecallaLogo } from "@/components/icons/RecallaLogo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-surface)] mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <RecallaLogo />
          <p className="mt-4 text-sm text-[var(--text-secondary)] max-w-xs">
            Your AI memory for every meeting, lecture, and conversation. Privately, forever.
          </p>
          <div className="flex gap-3 mt-5">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:border-[var(--accent-blue)] transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Product", links: [["Features", "/#features"], ["Pricing", "/pricing"], ["Dashboard", "/dashboard"]] },
          { title: "Company", links: [["About", "#"], ["Blog", "#"], ["Careers", "#"]] },
          { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Security", "#"]] },
        ].map(group => (
          <div key={group.title}>
            <h4 className="text-sm font-semibold mb-4">{group.title}</h4>
            <ul className="space-y-2.5">
              {group.links.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith("/") ? (
                    <Link to={href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">{label}</Link>
                  ) : (
                    <a href={href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">{label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 text-xs text-[var(--text-muted)] flex justify-between">
          <p>© 2026 Recalla. All rights reserved.</p>
          <p>Built with privacy first.</p>
        </div>
      </div>
    </footer>
  );
}
