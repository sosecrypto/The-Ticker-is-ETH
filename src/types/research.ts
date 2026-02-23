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
