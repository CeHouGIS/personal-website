export const YEAR_COLORS: Record<number, string> = {
  2017: "#6366f1",
  2021: "#8b5cf6",
  2022: "#06b6d4",
  2023: "#14b8a6",
  2024: "#f59e0b",
  2025: "#ef4444",
  2026: "#ec4899",
};

export const FALLBACK_COLOR = "#64748b";

export function colorForYear(year?: number | null): string {
  if (!year) return FALLBACK_COLOR;
  return YEAR_COLORS[year] ?? FALLBACK_COLOR;
}
