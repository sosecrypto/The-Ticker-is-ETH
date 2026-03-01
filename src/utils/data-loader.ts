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

/**
 * Load article content by ID via API.
 * Supports both tg-* (telegram) and research-* (published) article IDs.
 */
export async function loadArticleContent(id: string): Promise<string | undefined> {
  try {
    const res = await fetch(`/api/research/content?id=${encodeURIComponent(id)}`);
    if (!res.ok) return undefined;
    const contentType = res.headers.get('content-type') ?? '';
    if (contentType.includes('text/html')) return undefined;
    return await res.text();
  } catch {
    return undefined;
  }
}
