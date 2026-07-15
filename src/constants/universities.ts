import type { University } from "@/types/university.types";

export const UNIVERSITIES: University[] = [
  {
    id: 1, name: "Massachusetts Institute of Technology", shortName: "MIT",
    country: "USA", flag: "🇺🇸", ranking: 1,
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&h=400&fit=crop&auto=format",
    tuition: "$57,986/yr", acceptanceRate: "4%", scholarships: true, type: "Private",
    programs: ["Engineering", "CS", "Physics", "Management"], ieltsRequired: "7.0",
    description: "World-leading research university with cutting-edge STEM and management programs.",
  },
  {
    id: 2, name: "University of Oxford", shortName: "Oxford",
    country: "UK", flag: "🇬🇧", ranking: 2,
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&h=400&fit=crop&auto=format",
    tuition: "£28,950/yr", acceptanceRate: "17%", scholarships: true, type: "Public",
    programs: ["Law", "Medicine", "Philosophy", "Economics"], ieltsRequired: "7.5",
    description: "One of the oldest and most prestigious universities in the world.",
  },
  {
    id: 3, name: "University of Toronto", shortName: "UofT",
    country: "Canada", flag: "🇨🇦", ranking: 18,
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop&auto=format",
    tuition: "CAD $58,160/yr", acceptanceRate: "43%", scholarships: true, type: "Public",
    programs: ["Business", "Engineering", "Life Sciences", "Arts"], ieltsRequired: "6.5",
    description: "Canada's top research university with a diverse and vibrant campus life.",
  },
  {
    id: 4, name: "TU Munich", shortName: "TUM",
    country: "Germany", flag: "🇩🇪", ranking: 37,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop&auto=format",
    tuition: "€0–3,000/yr", acceptanceRate: "22%", scholarships: true, type: "Public",
    programs: ["Engineering", "Sciences", "Business", "Informatics"], ieltsRequired: "6.5",
    description: "Germany's leading technical university offering world-class education at minimal cost.",
  },
  {
    id: 5, name: "University of Melbourne", shortName: "UniMelb",
    country: "Australia", flag: "🇦🇺", ranking: 33,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&auto=format",
    tuition: "AUD $42,000/yr", acceptanceRate: "70%", scholarships: true, type: "Public",
    programs: ["Medicine", "Law", "Business", "Science"], ieltsRequired: "6.5",
    description: "Australia's #1 university and one of the world's top 50 institutions.",
  },
  {
    id: 6, name: "Trinity College Dublin", shortName: "TCD",
    country: "Ireland", flag: "🇮🇪", ranking: 98,
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&h=400&fit=crop&auto=format",
    tuition: "€20,000/yr", acceptanceRate: "36%", scholarships: true, type: "Public",
    programs: ["Business", "Medicine", "Engineering", "Arts"], ieltsRequired: "6.5",
    description: "Ireland's oldest university with excellent post-study work opportunities.",
  },
];
