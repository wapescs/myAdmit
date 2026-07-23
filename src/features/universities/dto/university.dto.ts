// Response contract: intentionally NOT a rigid, hand-picked shape. This API
// passes through whatever fields exist in the source records — nothing is
// renamed, normalized, or dropped — so the source JSON can grow new fields
// without any code change here ever being required again.
import type { CountrySpecificData, UniversityRecord } from "../types/university.types";

export type UniversityListItemDto = UniversityRecord;

export interface UniversityDetailDto extends UniversityRecord {
  country_specific_data: Record<string, CountrySpecificData>;
}
