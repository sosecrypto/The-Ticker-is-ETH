import type { Activity, Contribution } from './team';

export interface ResearchItem {
    id: string;
    title: string;
    author: string;
    authorId: string;
    date: string;
    category: 'Technical' | 'Social' | 'Economic' | 'Governance' | 'Telegram';
    summary: string;
    content: string;
    thumbnailUrl: string;
    readTime: string;
    authorAvatar: string;
}

// Dummy use to satisfy lint if necessary, or just use export type
export type { Activity, Contribution };
