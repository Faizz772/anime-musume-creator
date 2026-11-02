export type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  tags: string[];
  posted_at: string;
  author?: string | null;
  poster_url?: string | null;
};

export function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}
