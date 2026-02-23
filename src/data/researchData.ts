import type { ResearchItem } from '../types/research';
import indexData from './research-index.json';

export type ResearchIndexItem = Omit<ResearchItem, 'content'>;

export const mockResearch = indexData as ResearchIndexItem[];

export async function loadResearchContent(id: string): Promise<string | undefined> {
    const { default: contentMap } = await import('./research-content.json');
    return (contentMap as Record<string, string>)[id];
}
