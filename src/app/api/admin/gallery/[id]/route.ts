import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

function storagePathFromUrl(url: string) {
  const marker = "/storage/v1/object/public/gallery/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
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

  const { id } = await context.params;

  const { data: item, error: fetchError } = await supabase
    .from("gallery")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json(
      { error: `Gagal membaca karya: ${fetchError.message}` },
      { status: 500 },
    );
  }

  if (!item) {
    return NextResponse.json({ error: "Karya tidak ditemukan." }, { status: 404 });
  }

  const { error: deleteError } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json(
      { error: `Gagal menghapus karya: ${deleteError.message}` },
      { status: 500 },
    );
  }

  const paths = [
    storagePathFromUrl(item.image_url),
    typeof item.poster_url === "string"
      ? storagePathFromUrl(item.poster_url)
      : null,
  ].filter((value): value is string => Boolean(value));

  if (paths.length > 0) {
    await supabase.storage.from("gallery").remove(paths);
  }

  revalidatePath("/galeri");
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
