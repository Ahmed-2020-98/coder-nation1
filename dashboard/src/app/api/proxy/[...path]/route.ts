import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { API_URL, TOKEN_COOKIE } from "@/lib/session";

/** Forwards dashboard requests to the admin API, attaching the httpOnly token. */
async function proxy(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;
  if (!token) return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });

  const { path } = await params;
  const url = `${API_URL}/admin/${path.map(encodeURIComponent).join("/")}${request.nextUrl.search}`;
  const headers: HeadersInit = { Authorization: `Bearer ${token}`, Accept: "application/json" };
  const contentType = request.headers.get("content-type");
  if (contentType) headers["Content-Type"] = contentType;

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const res = await fetch(url, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: "no-store",
  });

  const response = new NextResponse(res.status === 204 ? null : await res.arrayBuffer(), {
    status: res.status,
    headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
  });
  if (res.status === 401) response.cookies.delete(TOKEN_COOKIE);
  return response;
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE };
