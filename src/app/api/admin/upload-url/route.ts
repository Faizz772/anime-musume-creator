import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "video/mp4",
]);

function extensionFor(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  if (type === "image/avif") return "avif";
  if (type === "video/mp4") return "mp4";
  return "jpg";
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase belum dikonfigurasi." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    contentType?: unknown;
  } | null;

  const contentType =
    typeof body?.contentType === "string" ? body.contentType : "";

  if (!ALLOWED_TYPES.has(contentType)) {
    return NextResponse.json(
      { error: "Format harus JPG, PNG, WEBP, GIF, AVIF, atau MP4." },
      { status: 415 },
    );
  }

  const path = `${randomUUID()}.${extensionFor(contentType)}`;

  const { data, error } = await supabase.storage
    .from("gallery")
    .createSignedUploadUrl(path);

  if (error) {
    return NextResponse.json(
      { error: `Gagal menyiapkan upload: ${error.message}` },
      { status: 500 },
    );
  }

  const { data: publicUrl } = supabase.storage
    .from("gallery")
    .getPublicUrl(path);

  return NextResponse.json({
    path,
    token: data.token,
    signedUrl: data.signedUrl,
    publicUrl: publicUrl.publicUrl,
  });
}
