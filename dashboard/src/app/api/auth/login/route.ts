import { NextResponse } from "next/server";
import { API_URL, TOKEN_COOKIE } from "@/lib/session";

export async function POST(request: Request) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: await request.text(),
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) return NextResponse.json(data, { status: res.status });

  const response = NextResponse.json({ user: data.user });
  response.cookies.set(TOKEN_COOKIE, data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
