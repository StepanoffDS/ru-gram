import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith('/login') || pathname.startsWith('/register');

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!isAuthPage && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
