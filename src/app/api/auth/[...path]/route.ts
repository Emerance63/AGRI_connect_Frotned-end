/**
 * Proxy route — forwards /api/auth/* requests to the real backend.
 */

import { type NextRequest, NextResponse } from "next/server";

const BASE = "https://agriconnectbackend-production-c9b1.up.railway.app";

async function proxy(req: NextRequest, params: { path: string[] }) {
  const path = params.path.join("/");
  const url = `${BASE}/api/auth/${path}${req.nextUrl.search}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const auth = req.headers.get("authorization");
  if (auth) headers["Authorization"] = auth;

  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await req.text()
      : undefined;

  const res = await fetch(url, { method: req.method, headers, body });
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(req, params);
}
export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(req, params);
}
