"use server";
import { NextResponse, NextRequest } from 'next/server'
import { verifySession } from '../lib/session';
 
// This function can be marked `async` if using `await` inside
export async function DashboardMiddleware(request: NextRequest) {
    const session = await verifySession();

    // If no session is detected or the client isn't authorized redirect to the login page
    if(request.nextUrl.pathname.startsWith("/dashboard") && !session.isAuth) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}