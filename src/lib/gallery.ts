import { getSupabaseAdmin } from "./supabase";
import type { GalleryItem } from "./gallery-types";

export type { GalleryItem } from "./gallery-types";

export async function getGallery(limit?: number): Promise<GalleryItem[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  let query = supabase
    .from("gallery")
    .select("id,title,image_url,tags,posted_at")
    .order("posted_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error("Gagal memuat galeri:", error.message);
    return [];
  }

  return (data ?? []) as GalleryItem[];
}
