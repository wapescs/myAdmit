import type { CountrySpecificData, UniversityDetailRecord, UniversityRecord } from "../types/university.types";
import type { EnglishRequirementDto, UniversityDetailDto, UniversityListItemDto } from "../dto/university.dto";

// Normalizes the inconsistent "Yes"/"No"/"NO"/"no"/null values found across
// the source JSON into a strict boolean, defaulting missing/null to false.
function toBoolean(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trim().toLowerCase() === "yes";
}

function toNumberOrNull(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

function mapEnglishRequirements(data: CountrySpecificData["English Language Requirements"]): EnglishRequirementDto {
  // The source key has a literal leading tab character — read it by exact
  // key rather than assuming a trimmed variant will be present.
  const toefl = data["\tTOEFL Requirement"] ?? { UG: null, PG: null };
  const ielts = data["IELTS Requirement"] ?? { UG: null, PG: null };
  const pte = data["PTE Requirement"] ?? { UG: null, PG: null };

  return {
    ielts: {
      ug: ielts.UG !== null && ielts.UG !== undefined ? String(ielts.UG) : null,
      pg: ielts.PG !== null && ielts.PG !== undefined ? String(ielts.PG) : null,
    },
    toefl: { ug: toNumberOrNull(toefl.UG), pg: toNumberOrNull(toefl.PG) },
    pte: { ug: toNumberOrNull(pte.UG), pg: toNumberOrNull(pte.PG) },
    ieltsWaiver: toBoolean(data["IELTS Waiver"]),
    mediumOfInstructionAccepted: toBoolean(data["Medium of Instruction Accepted"]),
    remarks: data.Remarks ?? null,
  };
}

export function toListItemDto(record: UniversityRecord): UniversityListItemDto {
  return {
    id: record._id,
    name: record.canonical_name,
    country: record.Country,
    websiteUrl: record["University Website URL"],
    campusLocations: record["Campus Location/s"],
  };
}

export function toDetailDto(base: UniversityRecord, detail: UniversityDetailRecord | null): UniversityDetailDto {
  const countrySpecificData: UniversityDetailDto["countrySpecificData"] = {};

  for (const [country, data] of Object.entries(detail?.country_specific_data ?? {})) {
    countrySpecificData[country] = {
      offerTurnaroundDays: {
        min: data["Turn Around Time for Offer Letter"]["Minimum working days for Offer"],
        max: data["Turn Around Time for Offer Letter"]["Maximum working days for Offer"],
      },
      englishRequirements: mapEnglishRequirements(data["English Language Requirements"]),
      flywireAccepted: toBoolean(data["Payment and Visa Details"]["Flywire Accepted (Yes/No)"]),
      depositRequirement: data["Payment and Visa Details"]["Deposit Requirement"],
      visaProcessMode: data["Payment and Visa Details"]["Mode of Visa Process"],
      remarks: data.Remarks,
    };
  }

  return {
    ...toListItemDto(base),
    academicRequirements: {
      ug: base["Common Academic Requirements"]["Academic Requirements for UG"],
      pg: base["Common Academic Requirements"]["Academic Requirements for PG"],
      acceptedBacklogs: base["Common Academic Requirements"]["Accepted Backlogs"],
    },
    countrySpecificData,
  };
}
