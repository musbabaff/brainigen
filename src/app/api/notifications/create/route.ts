import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    // Verify internal API key for security
    const authHeader = request.headers.get("authorization");
    const expectedKey = process.env.INTERNAL_API_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, type, title, message, actionUrl, icon } = body;

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: "Missing required fields: userId, type, title, message" },
        { status: 400 }
      );
    }

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
