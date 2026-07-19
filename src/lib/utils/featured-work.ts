interface WorkLike {
  data: {
    draft: boolean;
    featured: boolean;
    order?: number | undefined;
  };
}

export function selectFeaturedWork<T extends WorkLike>(entries: T[]): T[] {
  return entries
    .filter((entry) => !entry.data.draft && entry.data.featured)
    .sort(
      (a, b) =>
        (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER),
    )
    .slice(0, 3);
}
