import path from "node:path";
import { readJsonFile } from "@/utils/json-file-reader.util";
import type { FindAllOptions, FindAllResult, IUniversityRepository } from "./university.repository.interface";
import type { UniversityDetailRecord, UniversityRecord } from "../types/university.types";

const UNIVERSITIES_PATH = path.join(process.cwd(), "app/api/universities.json");
const UNIVERSITY_DETAILS_PATH = path.join(process.cwd(), "app/api/university_details.json");

// Phase-1 active implementation: reads the two source JSON files directly.
// Implements IUniversityRepository so the service layer above it never
// needs to know the data isn't coming from MongoDB yet.
export class JsonUniversityRepository implements IUniversityRepository {
  async findAll(options: FindAllOptions): Promise<FindAllResult<UniversityRecord>> {
    const all = await readJsonFile<UniversityRecord[]>(UNIVERSITIES_PATH);

    // --- Filtering: O(n) full-array scan ---
    // A JSON-file repository has no query engine. A MongoDB implementation
    // of this same method would instead build a find() filter document,
    // e.g. { Country: options.country, canonical_name: { $regex, $options: "i" } }
    // (or $text: { $search: options.search } once a text index exists — see
    // src/database/mongo/models/README.md for the recommended indexes on
    // Country and canonical_name), letting the database use its indexes
    // instead of Node scanning every record on every request.
    const filtered = all.filter((u) => {
      const matchesCountry = options.country ? u.Country.toLowerCase() === options.country.toLowerCase() : true;
      const matchesSearch = options.search
        ? u.canonical_name.toLowerCase().includes(options.search.toLowerCase())
        : true;
      return matchesCountry && matchesSearch;
    });

    // --- Sorting: O(n log n) in Node ---
    // A MongoDB implementation would push this to
    // .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 }), which can be
    // satisfied by an index scan instead of loading+sorting every matching
    // document in application memory.
    const sortField: keyof Pick<UniversityRecord, "canonical_name" | "Country"> =
      options.sortBy === "country" ? "Country" : "canonical_name";
    const sorted = [...filtered].sort((a, b) => {
      const comparison = a[sortField].localeCompare(b[sortField]);
      return options.sortOrder === "desc" ? -comparison : comparison;
    });

    // --- Pagination: Array.slice() after full materialization ---
    // A MongoDB implementation would use .skip()/.limit() (or, for very
    // large collections, a keyset/cursor strategy to avoid skip()'s linear
    // scan cost) so only one page of documents is ever materialized.
    const start = (options.page - 1) * options.limit;
    const items = sorted.slice(start, start + options.limit);

    return { items, total: filtered.length };
  }

  async findById(id: string): Promise<UniversityRecord | null> {
    const all = await readJsonFile<UniversityRecord[]>(UNIVERSITIES_PATH);
    return all.find((u) => u._id === id) ?? null;
  }

  async findDetailByUniversityId(universityId: string): Promise<UniversityDetailRecord | null> {
    const all = await readJsonFile<UniversityDetailRecord[]>(UNIVERSITY_DETAILS_PATH);
    return all.find((d) => d.university_id === universityId) ?? null;
  }
}
