import { RDSDataClient, ExecuteStatementCommand } from "@aws-sdk/client-rds-data";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const rds = new RDSDataClient({});
const ses = new SESv2Client({});

// Aurora Serverless v2 can scale to 0 (auto-pause). The first call after idle
// throws DatabaseResumingException; retry until the cluster wakes.
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
  FROM_ADDRESS,
  NOTIFY_ADDRESS,
  SEND_CLIENT_CONFIRMATION = "true",
} = process.env;

const CORS = {
  "Access-Control-Allow-Origin": "https://risingwithrachel.com",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Content-Type": "application/json",
};

const json = (statusCode, body) => ({ statusCode, headers: CORS, body: JSON.stringify(body) });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const esc = (s) => String(s || "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

export const handler = async (event) => {
  const method = event?.requestContext?.http?.method;
  if (method === "OPTIONS") return json(200, { ok: true });

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }

  // Honeypot: bots fill hidden field; pretend success.
  if (clip(data.company, 200)) return json(200, { ok: true });

  const fields = {
    name: clip(data.name, 120),
    email: clip(data.email, 200),
    phone: clip(data.phone, 60),
    location: clip(data.location, 160),
    experience: clip(data.experience, 80),
    goals: clip(data.goals, 4000),
    preferred_contact: clip(data.preferredContact, 40),
    message: clip(data.message, 4000),
  };

  if (!fields.name || !fields.email) return json(400, { ok: false, error: "Name and email are required." });
  if (!EMAIL_RE.test(fields.email)) return json(400, { ok: false, error: "Please enter a valid email." });

  const ip = event?.requestContext?.http?.sourceIp || "";
  const ua = event?.headers?.["user-agent"] || "";

  const sql = `INSERT INTO submissions
    (name, email, phone, location, experience, goals, preferred_contact, message, ip, user_agent)
    VALUES (:name, :email, :phone, :location, :experience, :goals, :preferred_contact, :message, :ip, :user_agent)
    RETURNING id, created_at`;

  const p = (name, value) => ({ name, value: value ? { stringValue: value } : { isNull: true } });
  try {
    await execWithResume(new ExecuteStatementCommand({
      resourceArn: CLUSTER_ARN,
      secretArn: SECRET_ARN,
      database: DB_NAME,
      sql,
      parameters: [
        p("name", fields.name), p("email", fields.email), p("phone", fields.phone),
        p("location", fields.location), p("experience", fields.experience), p("goals", fields.goals),
        p("preferred_contact", fields.preferred_contact), p("message", fields.message),
        p("ip", ip), p("user_agent", ua),
      ],
    }));
  } catch (err) {
    console.error("DB insert failed:", err);
    return json(500, { ok: false, error: "Could not save your submission. Please try again." });
  }

  const row = (label, val) => val ? `<tr><td style="padding:6px 12px;font-weight:600;color:#444">${label}</td><td style="padding:6px 12px;color:#111">${esc(val)}</td></tr>` : "";
  const notifyHtml = `
    <div style="font-family:Arial,sans-serif;max-width:560px">
      <h2 style="color:#2563eb">New coaching inquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        ${row("Name", fields.name)}${row("Email", fields.email)}${row("Phone", fields.phone)}
        ${row("Location", fields.location)}${row("Experience", fields.experience)}
        ${row("Preferred contact", fields.preferred_contact)}${row("Goals", fields.goals)}${row("Message", fields.message)}
      </table>
    </div>`;

  try {
    await ses.send(new SendEmailCommand({
      FromEmailAddress: `Rising with Rachel <${FROM_ADDRESS}>`,
      Destination: { ToAddresses: [NOTIFY_ADDRESS] },
      ReplyToAddresses: [fields.email],
      Content: { Simple: {
        Subject: { Data: `New inquiry from ${fields.name}` },
        Body: { Html: { Data: notifyHtml } },
      }},
    }));
  } catch (err) {
    console.error("Notify email failed:", err);
  }

  if (SEND_CLIENT_CONFIRMATION === "true") {
    const confirmHtml = `
      <div style="font-family:Arial,sans-serif;max-width:560px;color:#111">
        <h2 style="color:#2563eb">Thanks for reaching out, ${esc(fields.name.split(" ")[0])}!</h2>
        <p>I've received your inquiry and will get back to you personally within a couple of days.</p>
        <p>In the meantime, keep doing what you do best&nbsp;&mdash;&nbsp;putting one foot in front of the other.</p>
        <p style="margin-top:24px">Rachel<br/><span style="color:#888">Rising with Rachel &middot; Run Coaching</span></p>
      </div>`;
    try {
      await ses.send(new SendEmailCommand({
        FromEmailAddress: `Rising with Rachel <${FROM_ADDRESS}>`,
        Destination: { ToAddresses: [fields.email] },
        ReplyToAddresses: [NOTIFY_ADDRESS],
        Content: { Simple: {
          Subject: { Data: "Thanks for reaching out to Rising with Rachel" },
          Body: { Html: { Data: confirmHtml } },
        }},
      }));
    } catch (err) {
      console.error("Confirmation email failed:", err);
    }
  }

  return json(200, { ok: true });
};
