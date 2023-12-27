import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { supabaseClient } from "./lib/supabaseSetup";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});

    const {data: {session}} = await supabaseClient.auth.getSession();

    if(req.nextUrl.pathname.startsWith("/dashboard")) {
        if(!session) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
        if (session) {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
      }
      return res;
}