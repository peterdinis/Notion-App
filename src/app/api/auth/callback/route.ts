import { supabaseClient } from "@/lib/supabaseSetup";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestURL = new URL(request.url);
  const code = requestURL.searchParams.get("code");

  if (!code) {
    await supabaseClient.auth.exchangeCodeForSession(code!);
  }

  return NextResponse.redirect(`${requestURL.origin}/dashboard`);
}
