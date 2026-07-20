import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageNumber = Number(searchParams.get("pageNumber") ?? 1);
  const pageSize   = Number(searchParams.get("pageSize")   ?? 10);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Blog/blogList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageNumber, pageSize }),
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 502 });
  }
}
