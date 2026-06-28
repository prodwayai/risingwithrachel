import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const s3 = new S3Client({});
const ses = new SESv2Client({});

const { MAIL_BUCKET, MAIL_PREFIX = "inbound/", FORWARD_TO, FROM_ADDRESS } = process.env;

const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

// Strip headers that would break re-sending under a new From identity.
const STRIP = /^(from|return-path|sender|reply-to|dkim-signature|message-id):/i;

export const handler = async (event) => {
  for (const record of event.Records || []) {
    const messageId = record?.ses?.mail?.messageId;
    if (!messageId) continue;

    const key = `${MAIL_PREFIX}${messageId}`;
    let raw;
    try {
      const obj = await s3.send(new GetObjectCommand({ Bucket: MAIL_BUCKET, Key: key }));
      raw = (await streamToBuffer(obj.Body)).toString("utf8");
    } catch (err) {
      console.error(`Could not read ${key}:`, err);
      continue;
    }

    const splitAt = raw.indexOf("\r\n\r\n") >= 0 ? raw.indexOf("\r\n\r\n") : raw.indexOf("\n\n");
    const headerBlock = splitAt >= 0 ? raw.slice(0, splitAt) : raw;
    const body = splitAt >= 0 ? raw.slice(splitAt) : "";

    const headerLines = headerBlock.split(/\r?\n/);
    let originalFrom = "";
    const kept = [];
    for (const line of headerLines) {
      if (/^from:/i.test(line)) originalFrom = line.replace(/^from:\s*/i, "").trim();
      if (!STRIP.test(line)) kept.push(line);
    }

    const newHeaders = [
      `From: Rising with Rachel <${FROM_ADDRESS}>`,
      `Reply-To: ${originalFrom || FROM_ADDRESS}`,
      `To: ${FORWARD_TO}`,
      ...kept.filter((l) => !/^to:/i.test(l) && !/^cc:/i.test(l)),
    ].join("\r\n");

    const rawMessage = `${newHeaders}${body}`;

    try {
      await ses.send(new SendEmailCommand({
        FromEmailAddress: FROM_ADDRESS,
        Destination: { ToAddresses: [FORWARD_TO] },
        Content: { Raw: { Data: Buffer.from(rawMessage, "utf8") } },
      }));
      console.log(`Forwarded ${messageId} -> ${FORWARD_TO}`);
    } catch (err) {
      console.error("Forward failed:", err);
    }
  }
  return { ok: true };
};
