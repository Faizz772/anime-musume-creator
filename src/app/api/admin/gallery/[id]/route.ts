import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { toGalleryItem } from "@/lib/gallery";
import { isVideoUrl } from "@/lib/gallery-types";

export const runtime = "nodejs";

const PATH_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp|gif|avif|mp4)$/;
const POSTER_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp|gif|avif)$/;

function storagePathFromUrl(url: string) {
  const marker = "/storage/v1/object/public/gallery/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

function isMissingColumn(
  error: { message?: string; code?: string } | null,
) {
  if (!error) return false;
  const message = error.message ?? "";
  return (
    (error.code === "42703" ||
      error.code === "PGRST204" ||
      /does not exist|schema cache/i.test(message)) &&
    /author|poster_url/i.test(message)
  );
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

export async function PATCH(
  request: Request,
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

  const body = (await request.json().catch(() => null)) as {
    title?: unknown;
    tags?: unknown;
    author?: unknown;
    mediaPath?: unknown;
    posterPath?: unknown;
    removePoster?: unknown;
  } | null;

  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const tagsRaw = typeof body?.tags === "string" ? body.tags : "";
  const authorProvided =
    body !== null && Object.prototype.hasOwnProperty.call(body, "author");
  const author =
    typeof body?.author === "string" ? body.author.trim().slice(0, 80) : "";
  const mediaPath =
    typeof body?.mediaPath === "string" ? body.mediaPath : "";
  const posterPath =
    typeof body?.posterPath === "string" ? body.posterPath : "";
  const removePoster = body?.removePoster === true;

  if (!title) {
    return NextResponse.json({ error: "Judul wajib diisi." }, { status: 400 });
  }

  if (mediaPath && !PATH_PATTERN.test(mediaPath)) {
    return NextResponse.json(
      { error: "Path media tidak valid." },
      { status: 400 },
    );
  }

  if (posterPath && !POSTER_PATTERN.test(posterPath)) {
    return NextResponse.json(
      { error: "Path poster tidak valid." },
      { status: 400 },
    );
  }

  const { data: existing, error: fetchError } = await supabase
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

  if (!existing) {
    return NextResponse.json({ error: "Karya tidak ditemukan." }, { status: 404 });
  }

  const oldImageUrl = String(existing.image_url);
  const oldPosterUrl =
    typeof existing.poster_url === "string" ? existing.poster_url : null;

  const tags = Array.from(
    new Set(
      tagsRaw
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ).slice(0, 8);

  const update: Record<string, unknown> = { title, tags };
  if (authorProvided) update.author = author || null;

  let mediaIsVideo = isVideoUrl(oldImageUrl);
  if (mediaPath) {
    update.image_url = supabase.storage
      .from("gallery")
      .getPublicUrl(mediaPath).data.publicUrl;
    mediaIsVideo = /\.mp4$/i.test(mediaPath);
  }

  const newPosterUrl =
    posterPath && mediaIsVideo
      ? supabase.storage.from("gallery").getPublicUrl(posterPath).data.publicUrl
      : null;

  const clearPoster =
    removePoster ||
    (Boolean(mediaPath) && !mediaIsVideo) ||
    (Boolean(mediaPath) && mediaIsVideo && !posterPath);

  if (newPosterUrl) {
    update.poster_url = newPosterUrl;
  } else if (clearPoster) {
    update.poster_url = null;
  }

  let inserted: unknown = existing;
  let warning: string | undefined;

  const first = await supabase
    .from("gallery")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (first.error && isMissingColumn(first.error)) {
    const fallback: Record<string, unknown> = { title, tags };
    if (mediaPath) fallback.image_url = update.image_url;

    const retry = await supabase
      .from("gallery")
      .update(fallback)
      .eq("id", id)
      .select("*")
      .single();

    if (!retry.error) {
      inserted = retry.data;
      warning =
        "Karya diperbarui tanpa kredit/poster karena kolom database belum ada. Jalankan migrasi SQL terbaru.";
      if (posterPath) {
        await supabase.storage.from("gallery").remove([posterPath]);
      }
    } else {
      const cleanup = [mediaPath, posterPath].filter(Boolean);
      if (cleanup.length > 0) {
        await supabase.storage.from("gallery").remove(cleanup);
      }
      return NextResponse.json(
        { error: `Gagal memperbarui karya: ${retry.error.message}` },
        { status: 500 },
      );
    }
  } else if (first.error) {
    const cleanup = [mediaPath, posterPath].filter(Boolean);
    if (cleanup.length > 0) {
      await supabase.storage.from("gallery").remove(cleanup);
    }
    return NextResponse.json(
      { error: `Gagal memperbarui karya: ${first.error.message}` },
      { status: 500 },
    );
  } else {
    inserted = first.data;
  }

  const oldImagePath = storagePathFromUrl(oldImageUrl);
  if (mediaPath && oldImagePath && oldImagePath !== mediaPath) {
    await supabase.storage.from("gallery").remove([oldImagePath]);
  }

  const oldPosterPath = oldPosterUrl ? storagePathFromUrl(oldPosterUrl) : null;
  const posterChanged = Boolean(
    removePoster || posterPath || (mediaPath && !newPosterUrl),
  );

  if (
    oldPosterPath &&
    posterChanged &&
    oldPosterPath !== posterPath
  ) {
    await supabase.storage.from("gallery").remove([oldPosterPath]);
  }

  if (posterPath && !newPosterUrl) {
    await supabase.storage.from("gallery").remove([posterPath]);
  }

  revalidatePath("/galeri");
  revalidatePath("/");

  return NextResponse.json({
    item: toGalleryItem(inserted as Record<string, unknown>),
    warning,
  });
}
