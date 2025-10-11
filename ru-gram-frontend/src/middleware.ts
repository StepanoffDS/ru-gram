import { type NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const isAuthPage =
    req.url.includes('/login') ||
    req.url.includes('/register') ||
    req.url.includes('/account');

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/account/:path*', '/login', '/register'],
};
