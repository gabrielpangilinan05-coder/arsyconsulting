import { NextResponse } from "next/server";
import { Resend } from "resend";

const AUDIT_FROM =
  process.env.AUDIT_FROM?.trim() ||
  "Arsy Audit Form <noreply@arsyconsulting.com>";

function parseRecipients(value: string | undefined): string[] {
  const list = (value ?? "info@arsyconsulting.com,ricamaevillahermosa25@gmail.com")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  return list.length > 0
    ? list
    : ["info@arsyconsulting.com", "ricamaevillahermosa25@gmail.com"];
}

const AUDIT_RECIPIENTS = parseRecipients(process.env.AUDIT_RECIPIENT);

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured. Add RESEND_API_KEY to your environment.",
        },
        { status: 500 },
      );
    }

    const body = await req.json();
    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const company = String(body.company ?? "").trim();
    const location = String(body.location ?? "").trim();
    const challenge = String(body.challenge ?? "").trim();
    const consentNonMarketing = Boolean(body.consentNonMarketing);
    const consentMarketing = Boolean(body.consentMarketing);
    const agreedToTerms = Boolean(body.agreedToTerms);
    const discoveryCall = body.discoveryCall ?? null;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "Full name and business email are required." },
        { status: 400 },
      );
    }

    if (!agreedToTerms) {
      return NextResponse.json(
        {
          success: false,
          error: "Please agree to the Privacy Policy and Terms and Conditions.",
        },
        { status: 400 },
      );
    }

    const discoveryHtml =
      discoveryCall?.display && discoveryCall?.time
        ? `<p><strong>Discovery Call:</strong> ${escapeHtml(discoveryCall.display)} at ${escapeHtml(discoveryCall.time)}</p>`
        : "<p><strong>Discovery Call:</strong> Not scheduled</p>";

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: AUDIT_FROM,
      to: AUDIT_RECIPIENTS,
      replyTo: email,
      subject: "New Audit Request - Arsy Consulting",
      html: `
        <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.5;">
          <h2 style="margin: 0 0 16px; color: #059669;">New Audit Request Submission</h2>
          <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Business Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone Number:</strong> ${escapeHtml(phone || "—")}</p>
          <p><strong>Company Name:</strong> ${escapeHtml(company || "—")}</p>
          <p><strong>Plant / Facility Location:</strong> ${escapeHtml(location || "—")}</p>
          ${discoveryHtml}
          <p><strong>Main Operational Challenge:</strong></p>
          <blockquote style="background: #f1f5f9; padding: 12px 14px; border-left: 4px solid #059669; margin: 8px 0 0; white-space: pre-wrap;">
            ${escapeHtml(challenge || "—")}
          </blockquote>
          <p style="margin-top: 16px;"><strong>SMS Consent (Non-marketing):</strong> ${consentNonMarketing ? "Yes" : "No"}</p>
          <p><strong>SMS Consent (Marketing):</strong> ${consentMarketing ? "Yes" : "No"}</p>
          <p><strong>Privacy Policy &amp; Terms:</strong> ${agreedToTerms ? "Agreed" : "No"}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message || "Failed to send email." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
