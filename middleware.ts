// middleware.ts
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';


const secret = process.env.NEXTAUTH_SECRET;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/checkout/:path*'],
};