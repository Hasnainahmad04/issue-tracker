import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export default auth((req) => {
  if (!req.auth && !['/sign-in', '/'].includes(req.nextUrl.pathname)) {
    const newUrl = new URL('/sign-in', req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/(.*)'],
};
