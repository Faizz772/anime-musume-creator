export type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  tags: string[];
  posted_at: string;
};

export function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}
