export function parseProductImages(imageJson) {
  try {
    const parsed = JSON.parse(imageJson || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getFirstProductImage(imageJson) {
  const images = parseProductImages(imageJson);
  return images[0] ?? "";
}
