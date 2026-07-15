import type { Scholarship } from "@/types/scholarship.types";

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 1, name: "Chevening Scholarship", country: "UK", flag: "🇬🇧",
    amount: "Full Funding", deadline: "Nov 7, 2025", category: "Government",
    eligibility: "Bachelor's degree, 2yr work experience",
    coverage: ["Tuition", "Living Allowance", "Return Flights"], saved: false,
  },
  {
    id: 2, name: "Vanier Canada Graduate", country: "Canada", flag: "🇨🇦",
    amount: "CAD $50,000/yr", deadline: "Nov 1, 2025", category: "Government",
    eligibility: "PhD students with high academic standing",
    coverage: ["Living Expenses", "Research Support"], saved: true,
  },
  {
    id: 3, name: "Australia Awards", country: "Australia", flag: "🇦🇺",
    amount: "Full Funding", deadline: "Apr 30, 2025", category: "Government",
    eligibility: "Developing country citizens",
    coverage: ["Tuition", "Living Allowance", "Health Cover"], saved: false,
  },
  {
    id: 4, name: "DAAD Scholarship", country: "Germany", flag: "🇩🇪",
    amount: "€750–1,200/month", deadline: "Oct 15, 2025", category: "Academic",
    eligibility: "Graduates with strong academic record",
    coverage: ["Monthly Stipend", "Travel Allowance"], saved: false,
  },
  {
    id: 5, name: "Gates Cambridge Scholarship", country: "UK", flag: "🇬🇧",
    amount: "Full Funding", deadline: "Dec 4, 2024", category: "University",
    eligibility: "Non-UK citizens applying to Cambridge",
    coverage: ["Full Tuition", "Maintenance", "Visa"], saved: true,
  },
  {
    id: 6, name: "NZ Excellence Award", country: "New Zealand", flag: "🇳🇿",
    amount: "NZD $10,000", deadline: "Jul 1, 2025", category: "University",
    eligibility: "High achieving international students",
    coverage: ["Partial Tuition"], saved: false,
  },
];

export const SCHOLARSHIP_COUNTRY_FILTERS = ["All", "UK", "Canada", "Australia", "Germany", "New Zealand"];
export const SCHOLARSHIP_CATEGORY_FILTERS = ["All", "Government", "Academic", "University"];
