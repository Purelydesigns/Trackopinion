import { NextResponse } from "next/server";
import { apiBaseUrl, clampInt, logAndDescribe, upstreamJson } from "@/lib/api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageNumber = clampInt(searchParams.get("pageNumber"), { min: 1, max: 10_000, fallback: 1 });
  const pageSize = clampInt(searchParams.get("pageSize"), { min: 1, max: 200, fallback: 10 });

  try {
    const data = await upstreamJson(`${apiBaseUrl()}/getCurrentOpeningList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageNumber, pageSize }),
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: logAndDescribe("careers", err) }, { status: 502 });
  }
}
