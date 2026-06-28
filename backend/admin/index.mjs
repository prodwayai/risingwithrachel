import { RDSDataClient, ExecuteStatementCommand } from "@aws-sdk/client-rds-data";
import crypto from "node:crypto";

const rds = new RDSDataClient({});

async function execWithResume(command, attempts = 10, delayMs = 4000) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await rds.send(command);
    } catch (e) {
      if (e?.name === "DatabaseResumingException" && i < attempts - 1) {
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
      throw e;
    }
  }
}

const {
  CLUSTER_ARN,
  SECRET_ARN,
  DB_NAME = "rwr",
  ADMIN_PASSWORD,
  JWT_SECRET,
  TOKEN_TTL_SECONDS = "43200", // 12h
} = process.env;

const CORS = {
  "Access-Control-Allow-Origin": "https://risingwithrachel.com",
  "Access-Control-Allow-Headers": "content-type,authorization",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Content-Type": "application/json",
};
const json = (statusCode, body) => ({ statusCode, headers: CORS, body: JSON.stringify(body) });

const b64url = (buf) => Buffer.from(buf).toString("base64url");
const sign = (data) => crypto.createHmac("sha256", JWT_SECRET).update(data).digest("base64url");

function issueToken() {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const exp = Math.floor(Date.now() / 1000) + parseInt(TOKEN_TTL_SECONDS, 10);
  const payload = b64url(JSON.stringify({ sub: "admin", exp }));
  const sig = sign(`${header}.${payload}`);
  return `${header}.${payload}.${sig}`;
}

function verifyToken(token) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [header, payload, sig] = parts;
  const expected = sign(`${header}.${payload}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return exp && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

const timingSafeStr = (a = "", b = "") => {
  const ab = Buffer.from(a), bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
};

export const handler = async (event) => {
  const method = event?.requestContext?.http?.method;
  const path = event?.requestContext?.http?.path || event?.rawPath || "";
  if (method === "OPTIONS") return json(200, { ok: true });

  if (method === "POST" && path.endsWith("/login")) {
    let body;
    try { body = JSON.parse(event.body || "{}"); } catch { return json(400, { ok: false }); }
    if (!ADMIN_PASSWORD || !timingSafeStr(body.password || "", ADMIN_PASSWORD)) {
      return json(401, { ok: false, error: "Incorrect password." });
    }
    return json(200, { ok: true, token: issueToken() });
  }

  if (method === "GET" && path.endsWith("/submissions")) {
    const auth = event?.headers?.authorization || event?.headers?.Authorization || "";
    const token = auth.replace(/^Bearer\s+/i, "");
    if (!verifyToken(token)) return json(401, { ok: false, error: "Unauthorized" });

    try {
      const res = await execWithResume(new ExecuteStatementCommand({
        resourceArn: CLUSTER_ARN,
        secretArn: SECRET_ARN,
        database: DB_NAME,
        sql: `SELECT id, created_at, name, email, phone, location, experience,
                     preferred_contact, goals, message
              FROM submissions ORDER BY created_at DESC LIMIT 500`,
        formatRecordsAs: "JSON",
      }));
      const rows = res.formattedRecords ? JSON.parse(res.formattedRecords) : [];
      return json(200, { ok: true, submissions: rows });
    } catch (err) {
      console.error("Query failed:", err);
      return json(500, { ok: false, error: "Query failed" });
    }
  }

  return json(404, { ok: false, error: "Not found" });
};
