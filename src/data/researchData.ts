import type { ResearchItem } from '../types/research';
import indexData from './research-index.json';
import { loadResearchContent as loadContentJson } from '../utils/data-loader';

export type ResearchIndexItem = Omit<ResearchItem, 'content'>;

export const mockResearch = indexData as ResearchIndexItem[];

export async function loadResearchContent(id: string): Promise<string | undefined> {
    const contentMap = await loadContentJson();
    return contentMap[id];
}
