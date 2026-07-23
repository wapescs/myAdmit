import type { UniversityDetailRecord, UniversityRecord } from "../types/university.types";
import type { UniversityDetailDto, UniversityListItemDto } from "../dto/university.dto";

export function toListItemDto(record: UniversityRecord): UniversityListItemDto {
  return record;
}

export function toDetailDto(base: UniversityRecord, detail: UniversityDetailRecord | null): UniversityDetailDto {
  return {
    ...base,
    country_specific_data: detail?.country_specific_data ?? {},
  };
}
