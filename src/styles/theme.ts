/**
 * Named palette reference. Documentation / single source of truth only —
 * NOT used to replace Tailwind arbitrary-value classes (e.g. `bg-[#8B2626]`),
 * since Tailwind's JIT compiler can't resolve interpolated class strings.
 * Only used where a color is consumed as a genuine JS value (e.g. an SVG
 * `stroke` attribute), not inside a className string.
 */
export const COLORS = {
  crimson: "#8B2626",
  crimsonDark: "#6E1E1E",
  gold: "#CFA56A",
  green: "#2E7D32",
  bgLight: "#FAF6EE",
  bgDark: "#1A0E0A",
  border: "#E8DDD0",
} as const;
