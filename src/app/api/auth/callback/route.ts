import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    const requestURL = new URL(request.url);
    const code = requestURL.searchParams.get("code");

    if(!code) {
        const supabase = createRouteHandlerClient({cookies});
        await supabase.auth.exchangeCodeForSession(code!);
    }

    return NextResponse.redirect(`${requestURL.origin}/dashboard`)
}