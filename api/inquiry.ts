// 매장 도입 문의 접수. Vercel Node Function.
// 폼이 POST로 보낸 JSON을 받아 Gmail(SMTP)로 메일을 보낸다. 외부 서비스 가입 없이 Gmail 앱 비밀번호만 있으면 된다.
//
// Vercel 프로젝트 환경변수:
//   GMAIL_USER           보내는 Gmail 주소 (예: gourmevel@gmail.com)
//   GMAIL_APP_PASSWORD   그 계정의 앱 비밀번호 (Google 계정 → 보안 → 2단계 인증 → 앱 비밀번호)
//   INQUIRY_TO           받을 주소 (기본 GMAIL_USER와 같음)
import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

interface Inquiry {
  name: string;
  type: string;
  email: string;
  phone: string;
  note: string;
  lang: string;
}

const MAX = { name: 100, type: 60, email: 200, phone: 30, note: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  // 제어 문자 제거 (줄바꿈은 note에서 쓰므로 남긴다)
  let out = "";
  for (const ch of v) out += ch === "\n" || ch.charCodeAt(0) >= 32 ? ch : " ";
  return out.trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method" });

  const body = (typeof req.body === "string" ? safeParse(req.body) : req.body ?? {}) as Partial<Inquiry>;
  const inq: Inquiry = {
    name: clean(body.name, MAX.name),
    type: clean(body.type, MAX.type),
    email: clean(body.email, MAX.email),
    phone: clean(body.phone, MAX.phone),
    note: clean(body.note, MAX.note),
    lang: clean(body.lang, 5) || "ko",
  };
  if (!inq.name || !inq.type || !inq.phone || !EMAIL_RE.test(inq.email)) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return res.status(500).json({ ok: false, error: "not_configured" });

  const rows: Array<[string, string]> = [
    ["매장명", inq.name],
    ["업종", inq.type],
    ["이메일", inq.email],
    ["연락처", inq.phone],
    ["언어", inq.lang],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", inq.note ? `문의 내용:\n${inq.note}` : ""].join("\n").trim();
  const html = `<div style="font:15px/1.6 -apple-system,system-ui,sans-serif;color:#1b1a17">
<h2 style="margin:0 0 16px">매장 도입 문의</h2>
<table style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#75716a">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`)
    .join("")}</table>
${inq.note ? `<p style="margin:16px 0 0;white-space:pre-wrap">${escapeHtml(inq.note)}</p>` : ""}
</div>`;

  try {
    const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transport.sendMail({
      from: `Drinkig <${user}>`,
      to: process.env.INQUIRY_TO || user,
      replyTo: inq.email,
      subject: `[매장 도입 문의] ${inq.name} · ${inq.type}`,
      text,
      html,
    });
  } catch {
    return res.status(502).json({ ok: false, error: "mail_failed" });
  }

  return res.status(200).json({ ok: true });
}

function safeParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
