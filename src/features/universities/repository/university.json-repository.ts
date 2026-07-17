import path from "node:path";
import { readJsonFile } from "@/utils/json-file-reader.util";
import type { IUniversityRepository } from "./university.repository.interface";
import type { UniversityDetailRecord, UniversityRecord } from "../types/university.types";

const UNIVERSITIES_PATH = path.join(process.cwd(), "app/api/universities.json");
const UNIVERSITY_DETAILS_PATH = path.join(process.cwd(), "app/api/university_details.json");

// Phase-1 active implementation: reads the two source JSON files directly.
// Implements IUniversityRepository so the service layer above it never
// needs to know the data isn't coming from MongoDB yet.
export class JsonUniversityRepository implements IUniversityRepository {
  async findAll(): Promise<UniversityRecord[]> {
    return readJsonFile<UniversityRecord[]>(UNIVERSITIES_PATH);
  }

  async findById(id: string): Promise<UniversityRecord | null> {
    const all = await this.findAll();
    return all.find((u) => u._id === id) ?? null;
  }

  async findDetailByUniversityId(universityId: string): Promise<UniversityDetailRecord | null> {
    const all = await readJsonFile<UniversityDetailRecord[]>(UNIVERSITY_DETAILS_PATH);
    return all.find((d) => d.university_id === universityId) ?? null;
  }
}
