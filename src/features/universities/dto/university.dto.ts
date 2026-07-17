// Normalized shapes returned to API clients — the "View" contract of this
// feature's MVC layering. Kept independent of the raw source schema and of
// the zod validation schemas, so the response contract can stay stable even
// if the source JSON (or a future Mongo collection) changes shape.

export interface UniversityListItemDto {
  id: string;
  name: string;
  country: string;
  websiteUrl: string;
  campusLocations: string | null;
}

export interface EnglishRequirementDto {
  ielts: { ug: string | null; pg: string | null };
  toefl: { ug: number | null; pg: number | null };
  pte: { ug: number | null; pg: number | null };
  ieltsWaiver: boolean;
  mediumOfInstructionAccepted: boolean;
  remarks: string | null;
}

export interface UniversityDetailDto extends UniversityListItemDto {
  academicRequirements: {
    ug: string;
    pg: string;
    acceptedBacklogs: string;
  };
  countrySpecificData: Record<
    string,
    {
      offerTurnaroundDays: { min: number | null; max: number | null };
      englishRequirements: EnglishRequirementDto;
      flywireAccepted: boolean;
      depositRequirement: string | null;
      visaProcessMode: string | null;
      remarks: string | null;
    }
  >;
}
