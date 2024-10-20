import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is not signed in and trying to access a protected route, redirect to login
  if (!user && (req.nextUrl.pathname === '/home' || req.nextUrl.pathname === '/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // If user is signed in and trying to access login or signup, redirect to home
  if (user && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup' || req.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/home', '/dashboard', '/login', '/signup'],
}
