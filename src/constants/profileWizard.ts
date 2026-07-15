import type { WizardFieldConfig } from "@/types/profileWizard.types";

export const WIZARD_STEP_LABELS = ["Personal Info", "Education", "Budget & Country", "English Scores", "Career Goals", "Review"];

export const PERSONAL_INFO_FIELDS: WizardFieldConfig[] = [
  ["First Name", "Arjun"], ["Last Name", "Mehta"], ["Email", "arjun@email.com"],
  ["Phone", "+91 98765 43210"], ["Date of Birth", "15/08/2000"], ["Nationality", "Indian"],
];

export const EDUCATION_FIELDS: WizardFieldConfig[] = [
  ["10th Grade Score", "92%"], ["12th Grade Score / GPA", "88%"], ["Bachelor's Degree", "B.Tech Computer Science"],
  ["University / College", "IIT Delhi"], ["Bachelor's GPA / Percentage", "8.5 / 10"], ["Graduation Year", "2024"],
];

export const BUDGET_OPTIONS = ["Under $30K", "$30K–$50K", "$50K–$80K", "$80K+", "Any Budget", "Free Only"];

export const ENGLISH_TEST_TYPES = ["IELTS", "TOEFL", "PTE", "Duolingo English Test", "Not Yet Taken"];

export const ENGLISH_SCORE_FIELDS: WizardFieldConfig[] = [
  ["Overall Score", "7.5"], ["Reading", "8.0"], ["Writing", "7.0"], ["Listening", "7.5"], ["Speaking", "7.5"],
];

export const TARGET_INTAKE_OPTIONS = ["Fall 2025", "Spring 2026", "Fall 2026"];

export const CAREER_OBJECTIVE_DEFAULT = "I want to pursue a career in AI/ML research and eventually work at a leading tech company or start my own AI startup.";
export const WORK_EXPERIENCE_DEFAULT = "2 years at Infosys as Software Engineer";
