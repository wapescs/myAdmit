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
