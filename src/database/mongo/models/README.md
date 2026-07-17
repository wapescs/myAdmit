# Mongo Models

This project uses the native `mongodb` driver, not an ODM (no Mongoose), so
there's no "model" class to instantiate here. Instead, a "model" in this
folder means a typed collection accessor: a small function that returns a
`Collection<T>` typed against the document shape, e.g. (not created yet):

```ts
import type { Db, Collection } from "mongodb";

export interface UniversityMongoDoc {
  _id: string;
  canonical_name: string;
  country: string;
  // ...
}

export const universitiesCollection = (db: Db): Collection<UniversityMongoDoc> =>
  db.collection<UniversityMongoDoc>("universities");
```

A future `university.mongo-repository.ts` (see
`src/features/universities/repository/`) would import `getDb()` from
`src/database/mongo/connection.ts` and a collection accessor from here to
implement `IUniversityRepository` against MongoDB.

## Recommended indexes (universities feature)

Based on the fields the current JSON dataset and repository interface
actually use — see `IUniversityRepository.findAll()` in
`src/features/universities/repository/university.repository.interface.ts`:

- `universities._id` — unique (default `_id` index covers this).
- `universities.Country` — single-field index; backs the `?country=`
  equality filter.
- `universities.canonical_name` — single-field index for the `sortBy=name`
  sort; consider a text index (`db.universities.createIndex({ canonical_name: "text" })`)
  or a collation-aware index if `?search=` needs to move from an in-memory
  substring scan to a database-side search.
- `university_details.university_id` — unique index; this is the join key
  back to `universities._id`, used by `findDetailByUniversityId`.

Explicitly NOT indexed (because these fields don't exist in this dataset):
`state`, `city`, `ranking`, `status`, `createdAt`. A generic API-standards
checklist may mention these, but the source JSON schema (see
`src/features/universities/types/university.types.ts`) only has `Country`,
`canonical_name`, `_id`/`university_id`, and a few descriptive fields —
adding indexes for fields that don't exist would be speculative dead
configuration.
