const FALLBACK_IMAGES: Record<string, string> = {
  '/images/destinations/phu-quoc.jpg': '/images/destinations/da-nang.jpg',
  '/images/destinations/nha-trang.jpg': '/images/destinations/da-nang.jpg',
  '/images/destinations/thailand.jpg': '/images/destinations/da-nang.jpg',
  '/images/destinations/hero-japan.jpg': '/images/destinations/da-nang.jpg',
  '/images/destinations/japan.jpg': '/images/destinations/da-nang.jpg',
  '/images/destinations/hotels-generic.jpg': '/images/destinations/da-lat.jpg',
};

export function getImagePath(path: string): string {
  return FALLBACK_IMAGES[path] ?? path;
}
