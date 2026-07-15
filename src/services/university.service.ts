import { UNIVERSITIES } from "@/constants/universities";
import type { University } from "@/types/university.types";

export async function getUniversities(): Promise<University[]> {
  return UNIVERSITIES;
}

export async function getUniversityById(id: number): Promise<University | undefined> {
  return UNIVERSITIES.find(u => u.id === id);
}

/** Synchronous accessor for components that need data on first paint (no loading state exists today). */
export function getUniversitiesSync(): University[] {
  return UNIVERSITIES;
}

export function getUniversityByIdSync(id: number): University | undefined {
  return UNIVERSITIES.find(u => u.id === id);
}
