import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { toGalleryItem } from "@/lib/gallery";

export const runtime = "nodejs";

const PATH_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp|gif|avif|mp4)$/;
const POSTER_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp|gif|avif)$/;

function isMissingColumn(
  error: { message?: string; code?: string } | null,
) {
  if (!error) return false;
  const message = error.message ?? "";
  const code = error.code;
  return (
    (code === "42703" || code === "PGRST204" ||
      /does not exist|schema cache/i.test(message)) &&
    /author|poster_url/i.test(message)
  );
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
    title?: unknown;
    tags?: unknown;
    path?: unknown;
    author?: unknown;
    posterPath?: unknown;
  } | null;

  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const path = typeof body?.path === "string" ? body.path : "";
  const tagsRaw = typeof body?.tags === "string" ? body.tags : "";
  const author =
    typeof body?.author === "string" ? body.author.trim().slice(0, 80) : "";
  const posterPath =
    typeof body?.posterPath === "string" ? body.posterPath : "";

  if (!title) {
    return NextResponse.json({ error: "Judul wajib diisi." }, { status: 400 });
  }

  if (!PATH_PATTERN.test(path)) {
    return NextResponse.json({ error: "Path file tidak valid." }, { status: 400 });
  }

  if (posterPath && !POSTER_PATTERN.test(posterPath)) {
    return NextResponse.json(
      { error: "Path poster tidak valid." },
      { status: 400 },
    );
  }

  const { data: publicUrl } = supabase.storage
    .from("gallery")
    .getPublicUrl(path);
  const posterUrl = posterPath
    ? supabase.storage.from("gallery").getPublicUrl(posterPath).data.publicUrl
    : null;

  const tags = Array.from(
    new Set(
      tagsRaw
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ).slice(0, 8);

  const base = { title, image_url: publicUrl.publicUrl, tags };
  const extra: { author?: string; poster_url?: string } = {};
  if (author) extra.author = author;
  if (posterUrl) extra.poster_url = posterUrl;

  let inserted: unknown = null;
  let warning: string | undefined;

  const first = await supabase
    .from("gallery")
    .insert({ ...base, ...extra })
    .select("*")
    .single();

  if (first.error && Object.keys(extra).length > 0 && isMissingColumn(first.error)) {
    const retry = await supabase
      .from("gallery")
      .insert(base)
      .select("*")
      .single();

    if (!retry.error) {
      inserted = retry.data;
      warning =
        "Karya tersimpan tanpa kredit/poster karena kolom database belum ada. Jalankan migrasi SQL terbaru.";
      if (posterPath) {
        await supabase.storage.from("gallery").remove([posterPath]);
      }
    } else {
      await supabase.storage
        .from("gallery")
        .remove([path, ...(posterPath ? [posterPath] : [])]);
      return NextResponse.json(
        { error: `Gagal menyimpan karya: ${retry.error.message}` },
        { status: 500 },
      );
    }
  } else if (first.error) {
    await supabase.storage
      .from("gallery")
      .remove([path, ...(posterPath ? [posterPath] : [])]);
    return NextResponse.json(
      { error: `Gagal menyimpan karya: ${first.error.message}` },
      { status: 500 },
    );
  } else {
    inserted = first.data;
  }

  revalidatePath("/galeri");
  revalidatePath("/");

  return NextResponse.json(
    {
      item: toGalleryItem(inserted as Record<string, unknown>),
      warning,
    },
    { status: 201 },
  );
}
