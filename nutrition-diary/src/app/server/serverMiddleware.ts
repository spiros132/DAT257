import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function serverMiddleware(request: NextRequest) {
  return NextResponse.redirect("/");
}