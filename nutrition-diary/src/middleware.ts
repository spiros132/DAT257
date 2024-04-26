"use server";
import { NextResponse, NextRequest } from 'next/server'
 
import { DashboardMiddleware } from '@/app/dashboard/DashboardMiddleware';
import { GetUserID } from './app/server/actions';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    function redirect() {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    
    if(request.nextUrl.pathname.startsWith("/dashboard")) {
        // Helper function for easier coding
        
        const token = request.cookies.get("token");

        // Check if client has a token
        if(token == undefined)
            return redirect();
        
        // Check if token is valid
        const id = GetUserID(token.value);
    }
    

    return NextResponse.next();
}