// Generic top-level field-selection helper. Deliberately shallow — it does
// not support dot-path selection into nested objects (e.g. into
// countrySpecificData.<country>.englishRequirements). That's an intentional
// scope limit for Phase 1, not an oversight: nested selection needs its own
// path-parsing/validation design and no current consumer needs it.
//
// `fields` is plain strings, not `keyof T` — the response has no rigid,
// fixed field set, so callers may ask for any key name. Ones that don't
// exist on the object are silently skipped rather than rejected.
export function pickFields<T extends object>(obj: T, fields: readonly string[] | undefined): Partial<T> {
  if (!fields || fields.length === 0) return obj;
  const result: Partial<T> = {};
  for (const field of fields) {
    if (field in obj) {
      result[field as keyof T] = obj[field as keyof T];
    }
  }
  return result;
}

export function pickFieldsFromList<T extends object>(
  list: readonly T[],
  fields: readonly string[] | undefined
): Partial<T>[] {
  if (!fields || fields.length === 0) return [...list];
  return list.map((item) => pickFields(item, fields));
}
