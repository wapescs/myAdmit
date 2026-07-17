import { MongoClient, type Db } from "mongodb";
import { databaseConfig } from "@/config/database.config";

let client: MongoClient | null = null;
let db: Db | null = null;

// Lazy singleton — not invoked anywhere in Phase 1. A future
// university.mongo-repository.ts (Phase 2) will call this instead of
// reading JSON files, once MONGODB_URI is configured.
export async function getDb(): Promise<Db> {
  if (db) return db;
  if (!databaseConfig.mongoUri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local before using a MongoDB-backed repository.");
  }
  client = new MongoClient(databaseConfig.mongoUri);
  await client.connect();
  db = client.db(databaseConfig.mongoDbName);
  return db;
}
