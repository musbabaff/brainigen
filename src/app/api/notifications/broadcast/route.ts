import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await checkRateLimit(ip);
    if (!success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const authHeader = request.headers.get("authorization");
    const expectedKey = process.env.INTERNAL_API_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    const schema = z.object({
      title: z.string().min(1),
      message: z.string().min(1),
      targetAudience: z.string().min(1),
      actionUrl: z.string().optional(),
      icon: z.string().optional(),
      targetUserIds: z.array(z.string()).optional(),
      sentBy: z.string().optional(),
    });

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: parsed.error.issues },
        { status: 400 }
      );
    }
    const { title, message, actionUrl, icon, targetAudience, targetUserIds, sentBy } = parsed.data;

    const supabase = createAdminClient();

    // Get target user IDs based on audience
    let userIds: string[] = [];

    if (targetAudience === "specific" && targetUserIds?.length) {
      userIds = targetUserIds;
    } else {
      // Fetch users based on audience filter
      const query = supabase.from("profiles").select("id");
      // For plan-based targeting, you'd filter by subscription plan here
      const { data: profiles } = await query;
      userIds = profiles?.map((p: { id: string }) => p.id) || [];
    }

    if (userIds.length === 0) {
      return NextResponse.json({ error: "No target users found" }, { status: 400 });
    }

    // Create broadcast record
    const { data: broadcast, error: broadcastError } = await supabase
      .from("notification_broadcasts")
      .insert({
        title,
        message,
        action_url: actionUrl || null,
        icon: icon || "📢",
        target_audience: targetAudience,
        target_user_ids: targetUserIds || [],
        sent_by: sentBy || null,
        sent_at: new Date().toISOString(),
        status: "sent",
        recipients_count: userIds.length,
      })
      .select()
      .single();

    if (broadcastError) {
      console.error("Broadcast creation failed:", broadcastError);
      return NextResponse.json({ error: broadcastError.message }, { status: 500 });
    }

    // Create individual notifications for each user
    const notifications = userIds.map((uid: string) => ({
      user_id: uid,
      type: "feature_announcement" as const,
      title,
      message,
      action_url: actionUrl || null,
      icon: icon || "📢",
    }));

    // Batch insert (Supabase handles up to 1000 at a time)
    const batchSize = 500;
    for (let i = 0; i < notifications.length; i += batchSize) {
      const batch = notifications.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from("notifications")
        .insert(batch);

      if (insertError) {
        console.error("Batch insert error:", insertError);
      }
    }

    return NextResponse.json({
      success: true,
      broadcast,
      recipientCount: userIds.length,
    });
  } catch (err) {
    console.error("Broadcast error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
