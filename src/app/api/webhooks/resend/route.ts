import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

// Resend Webhook handler
export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await checkRateLimit(ip);
    if (!success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const payload = await req.text();
    const signature = req.headers.get("svix-signature");
    
    // In production, you would verify the svix signature here.
    // For now, we'll just parse the JSON payload directly.
    let data;
    try {
      data = JSON.parse(payload);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const schema = z.object({
      type: z.string(),
      data: z.object({
        email_id: z.string()
      }).passthrough()
    }).passthrough();

    const parsed = schema.safeParse(data);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const { type, data: eventData } = parsed.data;

    const resendId = eventData.email_id;
    
    if (!resendId) {
      return NextResponse.json({ error: "Missing email_id" }, { status: 400 });
    }

    // Map Resend events to our status enums
    let status = "";
    if (type === "email.sent") status = "sent";
    else if (type === "email.delivered") status = "delivered";
    else if (type === "email.opened") status = "opened";
    else if (type === "email.clicked") status = "clicked";
    else if (type === "email.bounced") status = "bounced";
    else if (type === "email.complained") status = "complained";
    
    if (!status) {
      // Ignored event
      return NextResponse.json({ received: true });
    }

    const supabase = createAdminClient();
    
    // Update the email_logs table
    await supabase
      .from("email_logs")
      .update({ status })
      .eq("resend_id", resendId);

    return NextResponse.json({ received: true, status });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
