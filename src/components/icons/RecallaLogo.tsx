export function RecallaLogo({ size = 36, withText = true, white = false }: { size?: number; withText?: boolean; white?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rcl-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F6EF7" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#rcl-grad)" />
        {/* neural nodes */}
        <circle cx="13" cy="13" r="2.4" fill="#fff" />
        <circle cx="27" cy="13" r="2.4" fill="#fff" />
        <circle cx="20" cy="20" r="3" fill="#fff" />
        <circle cx="13" cy="27" r="2.4" fill="#fff" />
        <circle cx="27" cy="27" r="2.4" fill="#fff" />
        {/* connections */}
        <g stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity="0.85">
          <line x1="13" y1="13" x2="20" y2="20" />
          <line x1="27" y1="13" x2="20" y2="20" />
          <line x1="13" y1="27" x2="20" y2="20" />
          <line x1="27" y1="27" x2="20" y2="20" />
          <line x1="13" y1="13" x2="27" y2="13" opacity="0.5" />
          <line x1="13" y1="27" x2="27" y2="27" opacity="0.5" />
        </g>
      </svg>
      {withText && (
        <span
          className="font-display text-xl font-bold tracking-tight"
          style={{ color: white ? "#fff" : "var(--text-primary)" }}
        >
          Recalla
        </span>
      )}
    </div>
  );
}
