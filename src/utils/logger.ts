type LogLevel = "info" | "warn" | "error";

interface RequestLogFields {
  requestId: string;
  method: string;
  route: string;
  status: number;
  durationMs: number;
  error?: string;
}

function write(level: LogLevel, fields: object): void {
  // One-line JSON per request, so any downstream log aggregator (even just
  // `vercel logs` or `docker logs`) can grep/parse without a custom pipeline.
  const line = JSON.stringify({ level, timestamp: new Date().toISOString(), ...fields });
  if (level === "error") {
    console.error(line);
  } else {
    console.log(line);
  }
}

// Called exactly once per handled request by withApiHandler. `error`, when
// present, is a short message only (never `err.stack`, never request
// body/query values that could contain PII) — deliberate, per the "no
// sensitive data in logs" requirement.
export function logRequest(fields: RequestLogFields): void {
  const level: LogLevel = fields.status >= 500 ? "error" : fields.status >= 400 ? "warn" : "info";
  write(level, fields);
}
