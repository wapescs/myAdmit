export interface UniversityCore {
  id: string;
  name: string;
  country: string;
  websiteUrl: string | null;
  campusLocations: string | null;
}

/**
 * Sub-fields are optional rather than guaranteed: the backend schema is
 * expected to keep evolving. Treat every nested value as "may not be there
 * yet," not as a fixed contract.
 */
export interface AcademicRequirements {
  ug?: string;
  pg?: string;
  acceptedBacklogs?: string;
}

/**
 * Genuinely NOT one fixed shape per country — Dubai universities carry
 * fields like "Turn Around Time for Offer Letter" / "English Language
 * Requirements" / "Payment and Visa Details"; Australian universities
 * instead carry "Available Intakes" / "Application Submission Process" /
 * "Required Additional Documents" / "GTE Approval" and more, with none of
 * Dubai's keys at all. Each country effectively has its own schema, so this
 * is left as an open bag of whatever fields that country's data has —
 * components render it generically (see UniversityCountryRequirements)
 * rather than assuming particular keys exist.
 */
export type CountrySpecificData = Record<string, unknown>;

export interface FAQItem {
  question: string;
  answer: string;
}

export interface UniversityDetailCore extends UniversityCore {
  academicRequirements?: AcademicRequirements;
  countrySpecificData?: Record<string, CountrySpecificData>;
  /** Not returned by the API yet — reserved for when the backend adds FAQ data. */
  faqs?: FAQItem[];
}

/**
 * Cosmetic fields the real API doesn't return. Populated only when a real
 * record's name matches one of the mock UNIVERSITIES entries; otherwise left
 * undefined so the UI can fall back gracefully.
 */
export interface UniversityCosmetic {
  shortName?: string;
  flag?: string;
  ranking?: number;
  image?: string;
  tuition?: string;
  acceptanceRate?: string;
  scholarships?: boolean;
  type?: string;
  programs?: string[];
  ieltsRequired?: string;
  description?: string;
}

export type University = UniversityCore & UniversityCosmetic;
export type UniversityDetail = UniversityDetailCore & UniversityCosmetic;

export interface PaginationMeta {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message: string;
  meta?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  data: null;
  message: string;
  error: {
    code?: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface UniversitiesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  country?: string;
  sortBy?: "name" | "country";
  sortOrder?: "asc" | "desc";
}

export interface UniversitiesListResult {
  items: University[];
  meta: PaginationMeta;
}
