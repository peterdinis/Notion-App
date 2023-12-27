import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

/* TODO: Fix later */
export async function middleware(req: NextRequest) {
  /* const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res }, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as unknown as string,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_AVON_KEY as unknown as string
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
  return res; */
}