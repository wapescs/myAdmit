import { readFile } from "node:fs/promises";

const cache = new Map<string, unknown>();

// Phase-1-only helper: the backing JSON files are static, so a simple
// in-memory cache avoids re-reading disk on every request within a warm
// dev/serverless instance. Safe to delete once every repository that uses
// it has a MongoDB implementation instead.
export async function readJsonFile<T>(filePath: string): Promise<T> {
  if (cache.has(filePath)) {
    return cache.get(filePath) as T;
  }
  const raw = await readFile(filePath, "utf-8");
  const parsed = JSON.parse(raw) as T;
  cache.set(filePath, parsed);
  return parsed;
}
