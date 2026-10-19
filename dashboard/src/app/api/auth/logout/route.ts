import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL, TOKEN_COOKIE } from "@/lib/session";

export async function POST() {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;

  if (token) {
    await fetch(`${API_URL}/admin/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    }).catch(() => undefined);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete(TOKEN_COOKIE);
  return response;
}
