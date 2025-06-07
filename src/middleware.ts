import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from 'better-auth/cookies';

const protectedRoutes = ['/profile', '/post/create', '/post/edit']

export async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname

    const session  = getSessionCookie(request);

    const isProtectedRoute = protectedRoutes.some(route => pathName.startsWith(route));

    if(isProtectedRoute && !session){
        // redirect to the auth page because user us not logged in
        return NextResponse.redirect(new URL ('/auth', request.url))
    }

    // if the user is already logged in and user is accessing /auth route they will automatically redirect to home page
    if(pathName === '/auth' && session){
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();

}   

export const config = {
    matcher: ['/profile/:path*', '/post/create', '/post/edit/:path*', '/auth' ],
}