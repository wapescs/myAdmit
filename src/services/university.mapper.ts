import type { UniversityRecord } from "@/features/universities/types/university.types";
import type { UniversityCore, UniversityDetailCore } from "@/types/university";

/**
 * The real API returns raw, unnormalized source records with no fixed
 * schema (see src/features/universities/mapper/university.mapper.ts) — that
 * was a deliberate choice so the API never has to change as the source data
 * grows. This file adapts the core identity fields (id/name/country/...)
 * into the stable shape the UI already renders. country_specific_data is
 * passed through untouched rather than reshaped — different countries
 * genuinely use different field sets (see the CountrySpecificData doc
 * comment in src/types/university.ts), so components that render it do so
 * generically instead of assuming a normalized shape exists.
 */

export function mapToUniversityCore(record: UniversityRecord): UniversityCore {
  return {
    id: record._id,
    name: record.canonical_name,
    country: record.Country,
    websiteUrl: record["University Website URL"] ?? null,
    campusLocations: record["Campus Location/s"] ?? null,
  };
}

export function mapToUniversityDetailCore(
  record: UniversityRecord & { country_specific_data?: Record<string, Record<string, unknown>> }
): UniversityDetailCore {
  const academic = record["Common Academic Requirements"];
  return {
    ...mapToUniversityCore(record),
    academicRequirements: academic
      ? {
          ug: academic["Academic Requirements for UG"],
          pg: academic["Academic Requirements for PG"],
          acceptedBacklogs: academic["Accepted Backlogs"],
        }
      : undefined,
    countrySpecificData: record.country_specific_data,
  };
}
