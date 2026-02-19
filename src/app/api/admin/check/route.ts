import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const DEFAULT_SESSION_SECRET = 'flytravel-admin-session-secret-change-in-production';

export async function GET(request: NextRequest) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || DEFAULT_SESSION_SECRET;
  const cookie = request.cookies.get(COOKIE_NAME)?.value;

  if (sessionSecret && cookie === sessionSecret) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
