import { NextResponse } from "next/server";
import { apiBaseUrl, logAndDescribe, upstreamJson } from "@/lib/api";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Only ever a numeric post id. Rejecting anything else stops a crafted
  // segment from injecting extra query parameters into the upstream URL.
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid blog id." }, { status: 400 });
  }

  try {
    const data = await upstreamJson(
      `${apiBaseUrl()}/api/Blog/blogDetails?id=${encodeURIComponent(id)}`,
      { headers: { accept: "*/*" } }
    );
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: logAndDescribe("blogs/[id]", err) }, { status: 502 });
  }
}
