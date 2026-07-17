import { JsonUniversityRepository } from "./university.json-repository";
import type { IUniversityRepository } from "./university.repository.interface";

// THE MongoDB swap point. To move this feature to MongoDB in Phase 2: add
// ./university.mongo-repository.ts implementing IUniversityRepository, then
// change the assignment below to use it instead. No other file in this
// feature (service, controller, routes) needs to change.
export const universityRepository: IUniversityRepository = new JsonUniversityRepository();

export type { IUniversityRepository } from "./university.repository.interface";
