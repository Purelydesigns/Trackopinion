import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const params = new URLSearchParams({
      FullName:     `${body.firstName ?? ""} ${body.lastName ?? ""}`.trim(),
      MobileNumber: body.mobile       ?? "",
      EmailAddress: body.email        ?? "",
      Subject:      body.company      ?? "",
      Description:  body.message      ?? "",
      IsActive:     "true",
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/saveContactUs?${params.toString()}`,
      { method: "POST", headers: { accept: "*/*" }, body: "" }
    );

    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 502 });
  }
}
