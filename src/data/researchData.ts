import type { ResearchItem } from '../types/research';
import { loadArticleContent } from '../utils/data-loader';

export type ResearchIndexItem = Omit<ResearchItem, 'content'>;

let indexCache: ResearchIndexItem[] | null = null;
let loadingPromise: Promise<ResearchIndexItem[]> | null = null;

export async function loadResearchIndex(): Promise<ResearchIndexItem[]> {
    if (indexCache) return indexCache;
    if (loadingPromise) return loadingPromise;

    loadingPromise = import('./research-index.json').then(({ default: data }) => {
        indexCache = data as ResearchIndexItem[];
        loadingPromise = null;
        return indexCache;
    });

    return loadingPromise;
}

export async function loadResearchContent(id: string): Promise<string | undefined> {
    return loadArticleContent(id);
}
