// Raw shapes matching app/api/universities.json and
// app/api/university_details.json exactly, including their data-quality
// quirks (a literal tab character in one key, inconsistent Yes/No/NO
// casing, null used for missing values). Normalization happens in the
// mapper, not here — these types describe the source of truth as-is.

export interface UniversityRecord {
  _id: string;
  canonical_name: string;
  original_names: string[];
  Country: string;
  "University Website URL": string;
  "Campus Location/s": string | null;
  "Common Academic Requirements": {
    "Academic Requirements for UG": string;
    "Academic Requirements for PG": string;
    "Accepted Backlogs": string;
  };
}

export interface EnglishRequirementRange {
  UG: string | number | null;
  PG: string | number | null;
}

export interface CountrySpecificData {
  "Turn Around Time for Offer Letter": {
    "Minimum working days for Offer": number | null;
    "Maximum working days for Offer": number | null;
  };
  "English Language Requirements": {
    "IELTS Requirement": EnglishRequirementRange;
    // Source data has a literal leading tab character in this key.
    "\tTOEFL Requirement": EnglishRequirementRange;
    "PTE Requirement": EnglishRequirementRange;
    "IELTS Waiver": string | null;
    "IELTS Waiver Percentage (%)": number | string | null;
    "Medium of Instruction Accepted": string | null;
    Remarks: string | null;
  };
  "Payment and Visa Details": {
    "Flywire Accepted (Yes/No)": string | null;
    "Deposit Requirement": string | null;
    "Mode of Visa Process": string | null;
  };
  Remarks: string | null;
}

export interface UniversityDetailRecord {
  _id: string;
  university_id: string;
  country_specific_data: Record<string, CountrySpecificData>;
}
