import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const middleware = async (request) => {
  const path = request.nextUrl.pathname;
  const AuthToken = request.cookies.get("AuthToken")?.value || "";

  const isTokenVerified = async () => {
    try {
      await jwtVerify(
        AuthToken,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  const verified = await isTokenVerified();

  if (verified && path === "/account")
    return NextResponse.redirect(new URL("/dashboard", request.url));

  if (!AuthToken && path === "/dashboard")
    return NextResponse.redirect(new URL("/account", request.url));
};

export const config = {
  matcher: ["/account", "/dashboard"],
};
