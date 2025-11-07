import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserDetails } from "./lib";

const protectedRoutes = ["/cart", "/checkout", "/success", "/orders", "/loyalty-points"];

const roleBasedRoutes: Record<string, string[]> = {
  PlatformUser: ["/cart", "/checkout", "/success", "/orders", "/loyalty-points"],
  WareHouse: [
    "/dashboard/products",
    "/dashboard/products/add",
    "/dashboard/products/view",
  ],
  OfficeEmpolyee: [
    "/dashboard/products",
    "/dashboard/products/add",
    "/dashboard/products/view",
  ],
  Cashier: [
    "/dashboard/products",
    "/dashboard/products/add",
    "/dashboard/products/view",
  ],
  Admin: [
    "/dashboard",
    "/dashboard/users",
    "/dashboard/users/add",
    "/dashboard/users",
    "/dashboard/size",
    "/dashboard/size/add",
    "/dashboard/size",
    "/dashboard/category",
    "/dashboard/category/add",
    "/dashboard/category",
    "/dashboard/products",
    "/dashboard/products/add",
    "/dashboard/products/view",
    "/dashboard/order",
    "/dashboard/order/view",
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only check auth for protected routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next(); // allow everything else
  }

  const token = request.cookies.get("token")?.value;

  // If no token and trying to access protected route
  if (!token) {
    console.log('Middleware: No token found, redirecting to login');
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    console.log('Middleware: Checking token:', token?.substring(0, 20) + '...');
    const userResult = await getUserDetails(token);
    console.log('Middleware: User result:', userResult);
    const role = userResult?.userData?.role;

    // If we can't get user details, redirect to login
    if (!userResult || !role) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const allowedRoutes = roleBasedRoutes[role] || [];
    const isAuthorized = allowedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!isAuthorized) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // If there's an error, redirect to login
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
