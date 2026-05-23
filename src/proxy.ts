import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession, SESSION_COOKIE } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow auth-related routes to pass through
  if (pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Get the session cookie
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;

  // If no cookie, redirect to login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify the JWT session
  const payload = await verifySession(sessionCookie);

  // If invalid or expired, redirect to login and optionally clear the cookie
  if (!payload) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  // All checks passed, allow the request
  return NextResponse.next();
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // Also exclude files with specific extensions commonly used for static assets.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
