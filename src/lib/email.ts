import { Resend } from "resend";
import { render } from "@react-email/render";
import { createAdminClient } from "@/lib/supabase/admin";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

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
  from = "Brainigen <hello@brainigen.com>",
  replyTo,
  userId,
}: EmailOptions) {
  try {
    const html = await render(template);
    
    // In development without an API key, just log
    if (!process.env.RESEND_API_KEY) {
      console.log(`[DEV EMAIL] To: ${to} | Subject: ${subject} | Template: ${templateName}`);
      return { id: "dev_" + Math.random().toString(36).substring(7) };
    }

    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo,
      tags: [
        { name: "template", value: templateName },
      ],
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    // Log to Supabase for tracking
    await logEmail({ 
      userId,
      to: Array.isArray(to) ? to.join(", ") : to, 
      subject, 
      template: templateName, 
      status: "sent",
      resendId: result.data?.id
    });

    return result.data;
  } catch (error: any) {
    console.error("Failed to send email:", error);
    await logEmail({ 
      userId,
      to: Array.isArray(to) ? to.join(", ") : to, 
      subject, 
      template: templateName, 
      status: "failed", 
      error: error.message 
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
