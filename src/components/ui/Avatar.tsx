const palette = [
  "linear-gradient(135deg,#4F6EF7,#7C3AED)",
  "linear-gradient(135deg,#0EA5E9,#4F6EF7)",
  "linear-gradient(135deg,#10B981,#0EA5E9)",
  "linear-gradient(135deg,#F59E0B,#EF4444)",
  "linear-gradient(135deg,#7C3AED,#EC4899)",
  "linear-gradient(135deg,#06B6D4,#10B981)",
];

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase();
  const idx = name.charCodeAt(0) % palette.length;
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-white font-semibold shrink-0"
      style={{ width: size, height: size, background: palette[idx], fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}
