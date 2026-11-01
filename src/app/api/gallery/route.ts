import { NextResponse } from "next/server";
import { getGallery } from "@/lib/gallery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getGallery();
  return NextResponse.json({ items });
}
