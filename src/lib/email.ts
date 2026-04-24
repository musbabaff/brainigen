import { Resend } from "resend";
import { render } from "@react-email/render";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSetting } from "@/lib/settings";
import React from "react";

export interface EmailOptions {
  to: string | string[];
  subject: string;
  templateName: string;
  template: React.ReactElement;
  from?: string;
  replyTo?: string;
  userId?: string;
}

export async function sendEmail({
  to,
  subject,
  templateName,
  template,
  from,
  replyTo,
  userId,
}: EmailOptions) {
  try {
    // getSetting falls back to process.env.RESEND_API_KEY if not in DB
    const apiKey = await getSetting('resend_api_key', process.env.RESEND_API_KEY);
    const fromEmail = from ?? await getSetting('email_from', 'hello@brainigen.com') ?? 'hello@brainigen.com';
    const fromName = await getSetting('email_from_name', 'Brainigen') ?? 'Brainigen';
    const fromAddress = `${fromName} <${fromEmail}>`;
    const resolvedReplyTo = replyTo ?? await getSetting('email_reply_to') ?? undefined;

    const html = await render(template);

    if (!apiKey) {
      console.log(`[DEV EMAIL] To: ${to} | Subject: ${subject} | Template: ${templateName}`);
      return { id: "dev_" + Math.random().toString(36).substring(7) };
    }

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      html,
      replyTo: resolvedReplyTo,
      tags: [
        { name: "template", value: templateName },
      ],
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    await logEmail({
      userId,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      template: templateName,
      status: "sent",
      resendId: result.data?.id
    });

    return result.data;
  } catch (error: unknown) {
    console.error("Failed to send email:", error);
    await logEmail({
      userId,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      template: templateName,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error"
    });
    throw error;
  }
}

async function logEmail({
  userId,
  to,
  subject,
  template,
  status,
  resendId,
  error,
}: {
  userId?: string;
  to: string;
  subject: string;
  template: string;
  status: string;
  resendId?: string;
  error?: string;
}) {
  try {
    const supabase = createAdminClient();
    await supabase.from("email_logs").insert({
      user_id: userId || null,
      to_email: to,
      subject,
      template,
      status,
      resend_id: resendId || null,
      error: error || null,
    });
  } catch (err) {
    console.error("Failed to log email to database:", err);
  }
}
