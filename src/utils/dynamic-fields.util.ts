/**
 * Shared helpers for rendering arbitrarily-shaped data (like
 * countrySpecificData, where different countries carry entirely different
 * field sets — see the CountrySpecificData doc comment in
 * src/types/university.ts) generically, without assuming a fixed schema.
 * Used by both the classic and modern university detail pages so the
 * "what counts as renderable" logic stays in exactly one place.
 */

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function formatPrimitive(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return value.trim() || null;
  if (Array.isArray(value)) {
    const items = value.map(formatPrimitive).filter((v): v is string => v !== null);
    return items.length > 0 ? items.join(", ") : null;
  }
  return null;
}

export function cleanLabel(key: string): string {
  return key.replace(/^\t+/, "").trim();
}

export function hasRenderableContent(value: unknown): boolean {
  if (isPlainObject(value)) return Object.values(value).some(hasRenderableContent);
  return formatPrimitive(value) !== null;
}
