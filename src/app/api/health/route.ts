// API route placeholder
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Brainigen API is running",
    version: "0.1.0",
  });
}
