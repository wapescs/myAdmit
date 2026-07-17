import type { UniversityDetailRecord, UniversityRecord } from "../types/university.types";

// Consumers (the service layer) must depend only on this contract, never on
// a concrete implementation. See ./index.ts for the active-implementation
// swap point (JSON now, MongoDB later).
export interface IUniversityRepository {
  findAll(): Promise<UniversityRecord[]>;
  findById(id: string): Promise<UniversityRecord | null>;
  findDetailByUniversityId(universityId: string): Promise<UniversityDetailRecord | null>;
}
