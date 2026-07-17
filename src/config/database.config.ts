// Safe to import even though nothing calls getDb() yet — reads env vars
// lazily via process.env and never throws at import time.
export const databaseConfig = {
  mongoUri: process.env.MONGODB_URI ?? "",
  mongoDbName: process.env.MONGODB_DB_NAME ?? "myadmit",
};
