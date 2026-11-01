import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const PATH_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp|gif|avif|mp4)$/;

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
    title?: unknown;
    tags?: unknown;
    path?: unknown;
  } | null;

  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const path = typeof body?.path === "string" ? body.path : "";
  const tagsRaw = typeof body?.tags === "string" ? body.tags : "";

  if (!title) {
    return NextResponse.json({ error: "Judul wajib diisi." }, { status: 400 });
  }

  if (!PATH_PATTERN.test(path)) {
    return NextResponse.json({ error: "Path file tidak valid." }, { status: 400 });
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
