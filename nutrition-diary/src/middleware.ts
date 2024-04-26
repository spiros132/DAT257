"use server";
import { NextResponse, NextRequest } from 'next/server'
import { DashboardMiddleware } from './app/dashboard/DashboardMiddleware';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    if(request.nextUrl.pathname.startsWith("/dashboard")) {
        return DashboardMiddleware(request);
    }

    return NextResponse.next();
}