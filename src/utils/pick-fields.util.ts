// Generic top-level field-selection helper. Deliberately shallow — it does
// not support dot-path selection into nested objects (e.g. into
// countrySpecificData.<country>.englishRequirements). That's an intentional
// scope limit for Phase 1, not an oversight: nested selection needs its own
// path-parsing/validation design and no current consumer needs it.
export function pickFields<T extends object>(obj: T, fields: readonly (keyof T)[] | undefined): Partial<T> {
  if (!fields || fields.length === 0) return obj;
  const result: Partial<T> = {};
  for (const field of fields) {
    if (field in obj) {
      result[field] = obj[field];
    }
  }
  return result;
}

export function pickFieldsFromList<T extends object>(
  list: readonly T[],
  fields: readonly (keyof T)[] | undefined
): Partial<T>[] {
  if (!fields || fields.length === 0) return [...list];
  return list.map((item) => pickFields(item, fields));
}
