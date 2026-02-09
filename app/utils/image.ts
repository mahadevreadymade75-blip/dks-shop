export function resolvePrimaryImage(entity: {
  image?: string;
  images?: string[];
}) {
  return [entity.image, ...(entity.images || [])]
    .filter(Boolean)[0] || "/placeholder.jpg";
}
