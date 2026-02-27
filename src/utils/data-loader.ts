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
