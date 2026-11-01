import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_BYTES = 8 * 1024 * 1024;

function extensionFor(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  if (type === "image/avif") return "avif";
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

  const form = await request.formData();
  const title = String(form.get("title") ?? "").trim();
  const tagsRaw = String(form.get("tags") ?? "");
  const image = form.get("image");

  if (!title) {
    return NextResponse.json({ error: "Judul wajib diisi." }, { status: 400 });
  }

  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json({ error: "Gambar wajib diunggah." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(image.type)) {
    return NextResponse.json(
      { error: "Format gambar harus JPG, PNG, WEBP, GIF, atau AVIF." },
      { status: 415 },
    );
  }

  if (image.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Ukuran gambar maksimal 8 MB." },
      { status: 413 },
    );
  }

  const path = `${randomUUID()}.${extensionFor(image.type)}`;
  const bytes = Buffer.from(await image.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(path, bytes, { contentType: image.type, upsert: false });

  if (uploadError) {
    return NextResponse.json(
      { error: `Gagal mengunggah gambar: ${uploadError.message}` },
      { status: 500 },
    );
  }

  const { data: publicUrl } = supabase.storage
    .from("gallery")
    .getPublicUrl(path);

  const tags = Array.from(
    new Set(
      tagsRaw
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ).slice(0, 8);

  const { data, error } = await supabase
    .from("gallery")
    .insert({ title, image_url: publicUrl.publicUrl, tags })
    .select("id,title,image_url,tags,posted_at")
    .single();

  if (error) {
    await supabase.storage.from("gallery").remove([path]);
    return NextResponse.json(
      { error: `Gagal menyimpan karya: ${error.message}` },
      { status: 500 },
    );
  }

  revalidatePath("/galeri");
  revalidatePath("/");

  return NextResponse.json({ item: data }, { status: 201 });
}
