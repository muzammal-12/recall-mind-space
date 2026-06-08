import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Mic, FileText, BrainCircuit, BellRing, StickyNote,
  CalendarDays, Settings, ChevronLeft, ChevronRight, LogOut, Sun, Moon,
} from "lucide-react";
import { RecallaLogo } from "@/components/icons/RecallaLogo";
import { Avatar } from "@/components/ui/Avatar";
import { useTheme } from "@/contexts/ThemeContext";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Mic, label: "Record Meeting", id: "record" },
  { icon: FileText, label: "My Meetings", id: "meetings" },
  { icon: BrainCircuit, label: "Memory & Query", id: "memory" },
  { icon: BellRing, label: "Reminders", id: "reminders" },
  { icon: StickyNote, label: "Notes", id: "notes" },
  { icon: CalendarDays, label: "Timeline", id: "timeline" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export function Sidebar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggle } = useTheme();
  const w = collapsed ? 72 : 260;

  return (
    <aside
      style={{ width: w }}
      className="hidden lg:flex shrink-0 sticky top-0 h-screen border-r border-[var(--border)] bg-[var(--bg-surface)] flex-col transition-[width] duration-300"
    >
      <div className="h-[68px] flex items-center justify-between px-4 border-b border-[var(--border)]">
        {!collapsed ? <RecallaLogo /> : <RecallaLogo withText={false} size={32} />}
        <button onClick={() => setCollapsed(c => !c)} className="h-8 w-8 rounded-lg hover:bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-secondary)]">
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "text-white aurora-bg shadow-[0_4px_15px_rgba(79,110,247,0.35)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-[var(--border)] p-3 space-y-2">
        <button
          onClick={toggle}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card)] ${collapsed ? "justify-center" : ""}`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          {!collapsed && <span>{theme === "dark" ? "Light" : "Dark"} mode</span>}
        </button>
        <div className={`flex items-center gap-3 px-2 py-2 rounded-xl ${collapsed ? "justify-center" : ""}`}>
          <Avatar name="Ammad Ahmad" size={36} />
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Ammad Ahmad</p>
                <p className="text-xs text-[var(--text-muted)]">Free Plan</p>
              </div>
              <button className="h-8 w-8 rounded-lg hover:bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-muted)]">
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
