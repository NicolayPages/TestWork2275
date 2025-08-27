import { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { routes } from './constants/routes';
import { storageKeys } from './constants/storageKeys';
import { getHrefArr } from './utils/getters/getHrefArr';

const publicRoutes: string[] = getHrefArr(routes, 'public');
const protectedRoutes: string[] = getHrefArr(routes, 'private');

export function middleware(req: NextRequest, _ev: NextFetchEvent) {
  const path = req.nextUrl.pathname;

  if (
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const cookie = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookie.split(';').map(c => {
      const [key, ...value] = c.trim().split('=');
      return [key, decodeURIComponent(value.join('='))];
    }),
  );
  const isAuthenticated = !!cookies[storageKeys.accessToken];

  const isPublicRoute = publicRoutes.some(route => path === route);
  const isProtectedRoute = protectedRoutes.some(route =>
    path.startsWith(route),
  );

  if (!isPublicRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  if (isAuthenticated && path === routes.public.login.href) {
    return NextResponse.redirect(new URL(routes.public.main.href, req.url));
  }

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL(routes.public.login.href, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
