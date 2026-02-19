import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const DEFAULT_SESSION_SECRET = 'flytravel-admin-session-secret-change-in-production';

export function middleware(request: NextRequest) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || DEFAULT_SESSION_SECRET;
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  const isAuthenticated = !!(sessionSecret && cookie === sessionSecret);

  // Protect admin dashboard (except login page)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  // Protect API mutations - require admin auth for POST/DELETE
  if (request.nextUrl.pathname === '/api/travels' && (request.method === 'POST' || request.method === 'DELETE')) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/travels'],
};
