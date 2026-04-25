import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { z } from "zod/v4";

const createNotificationSchema = z.object({
  userId: z.string().uuid("userId must be a valid UUID"),
  type: z.enum(["info", "success", "warning", "error", "system"]),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  actionUrl: z.string().url().optional().nullable(),
  icon: z.string().max(100).optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const expectedKey = process.env.INTERNAL_API_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createNotificationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { userId, type, title, message, actionUrl, icon } = parsed.data;

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        type,
        title,
        message,
        action_url: actionUrl || null,
        icon: icon || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create notification:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, notification: data });
  } catch (err) {
    console.error("Notification creation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
