import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('');
    
  // if (!token) {
  //   return NextResponse.redirect(`/auth/login?p=/admin`)
  // }
  

  

  return NextResponse.next();
}

export const config = {
    matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*']
};