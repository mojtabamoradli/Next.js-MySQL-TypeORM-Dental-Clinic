import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const path = request.nextUrl.pathname;
};

export const config = {
  matcher: ["/account", "/dashboard"],
};
