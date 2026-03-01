/**
 * Lazy JSON loader with cache.
 * Wraps dynamic import() so each JSON module is fetched at most once.
 */
const cache = new Map<string, unknown>();

export async function lazyLoadJson<T>(
  loader: () => Promise<{ default: T }>,
  key: string,
): Promise<T> {
  if (cache.has(key)) return cache.get(key) as T;
  const { default: data } = await loader();
  cache.set(key, data);
  return data;
}

export function loadTeamEnrichment() {
  return lazyLoadJson<unknown>(
    () => import('../data/team-enrichment.json'),
    'team-enrichment',
  );
}

export function loadResearchContent() {
  return lazyLoadJson<Record<string, string>>(
    () => import('../data/research-content.json'),
    'research-content',
  );
}

/**
 * Load article content by ID.
 * 1. Try research-content.json first (existing telegram articles)
 * 2. Fall back to /api/research/content/{id} (newly published articles)
 */
export async function loadArticleContent(id: string): Promise<string | undefined> {
  const contentMap = await loadResearchContent();
  if (contentMap[id]) return contentMap[id];

  // Newly published articles are stored as individual markdown files
  if (!id.startsWith('research-')) return undefined;

  try {
    const res = await fetch(`/api/research/content/${encodeURIComponent(id)}`);
    if (!res.ok) return undefined;
    return await res.text();
  } catch {
    return undefined;
  }
}
