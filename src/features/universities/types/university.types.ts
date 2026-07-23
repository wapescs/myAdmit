// Raw shapes matching app/api/universities.json and
// app/api/university_details.json exactly, including their data-quality
// quirks (a literal tab character in one key, inconsistent Yes/No/NO
// casing, null used for missing values).

export interface UniversityRecord {
  _id: string;
  canonical_name: string;
  original_names: string[];
  Country: string;
  "University Website URL": string | null;
  "Campus Location/s": string | null;
  "Common Academic Requirements": {
    "Academic Requirements for UG": string;
    "Academic Requirements for PG": string;
    "Accepted Backlogs": string;
  };
}

/**
 * Genuinely NOT one fixed shape: different countries carry entirely
 * different sets of fields, not just some-fields-missing variants of the
 * same shape. Dubai entries have "Turn Around Time for Offer Letter" /
 * "English Language Requirements" / "Payment and Visa Details"; Australian
 * entries instead have "Available Intakes" / "Application Submission
 * Process" / "Required Additional Documents" / "GTE Approval" and more —
 * none of the Dubai keys at all. Modeling this as a fixed interface would
 * silently drop whichever country's fields didn't fit. Treat it as an
 * open bag of country-defined fields.
 */
export type CountrySpecificData = Record<string, unknown>;

export interface UniversityDetailRecord {
  _id: string;
  university_id: string;
  country_specific_data: Record<string, CountrySpecificData>;
}
