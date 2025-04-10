import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
 
const protectedRoutes = ["/cart", "/checkout", "/success", "/orders", 
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
 
  const accessToken = request.cookies.get("rtoken")   

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
 
  if (isProtectedRoute && !accessToken) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
