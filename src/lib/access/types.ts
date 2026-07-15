// Core types for the tiered access control system.
// `AccessTier` is the public vocabulary used by FeatureGate and UI.
// It is derived from (not a replacement for) the existing `UserState`
// ("anonymous" | "logged-in" | "complete") from UserStateProvider —
// see AccessProvider.tsx for the mapping.
export type AccessTier = "anonymous" | "email" | "full";

const TIER_RANK: Record<AccessTier, number> = {
  anonymous: 0,
  email: 1,
  full: 2,
};

export function isEntitled(tier: AccessTier, requires: AccessTier): boolean {
  return TIER_RANK[tier] >= TIER_RANK[requires];
}

export type MarkScheme = "PERCENTAGE" | "CGPA_10" | "GPA_4" | "GRADE";

export interface AcademicRecord {
  board: string;
  yearOfPassing: number;
  score: number;
  markScheme: MarkScheme;
}

export interface GraduationRecord {
  degree: string;
  field: string;
  university: string;
  yearOrExpected: number;
  score: number;
  markScheme: MarkScheme;
}

export interface DiplomaRecord {
  field: string;
  institution: string;
  yearOfPassing: number;
  score: number;
  markScheme: MarkScheme;
}

export interface AptitudeExam {
  name: "SAT" | "ACT" | "GRE" | "GMAT";
  status: "TAKEN" | "PLANNED";
  score?: number;
  date?: string;
}

export interface EnglishExam {
  name: "IELTS" | "TOEFL" | "PTE" | "DUOLINGO";
  status: "TAKEN" | "PLANNED";
  score?: number;
  date?: string;
}

export interface QualificationDetails {
  tenth: AcademicRecord;
  twelfth: AcademicRecord & {
    stream: "SCIENCE" | "COMMERCE" | "ARTS" | "OTHER";
  };
  graduation?: GraduationRecord;
  diploma?: DiplomaRecord;
  exams?: {
    aptitude?: AptitudeExam[];
    english?: EnglishExam[];
  };
  targetDegreeLevel: "UNDERGRAD" | "POSTGRAD" | "PHD";
  targetCountries: Array<"US" | "UK" | "OTHER">;
}

export interface UserProfile {
  email: string | null;
  phone: string | null;
  phoneVerified: boolean;
  qualification: QualificationDetails | null;
}

export const EMPTY_PROFILE: UserProfile = {
  email: null,
  phone: null,
  phoneVerified: false,
  qualification: null,
};
