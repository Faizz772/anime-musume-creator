import { getSupabaseAdmin } from "./supabase";
import type { GalleryItem } from "./gallery-types";

export type { GalleryItem } from "./gallery-types";

export function toGalleryItem(row: Record<string, unknown>): GalleryItem {
  const tags = Array.isArray(row.tags)
    ? (row.tags.filter((tag) => typeof tag === "string") as string[])
    : [];

  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? ""),
    image_url: String(row.image_url ?? ""),
    tags,
    posted_at: typeof row.posted_at === "string" ? row.posted_at : "",
    author:
      typeof row.author === "string" && row.author.trim()
        ? row.author.trim()
        : null,
    poster_url:
      typeof row.poster_url === "string" && row.poster_url
        ? row.poster_url
        : null,
  };
}

export async function getGallery(limit?: number): Promise<GalleryItem[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  let query = supabase
    .from("gallery")
    .select("*")
    .order("posted_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error("Gagal memuat galeri:", error.message);
    return [];
  }

  return (data ?? []).map((row) =>
    toGalleryItem(row as Record<string, unknown>),
  );
}

export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;

  return toGalleryItem(data as Record<string, unknown>);
}
