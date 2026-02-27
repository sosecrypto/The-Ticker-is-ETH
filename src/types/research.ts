export interface ResearchItem {
    id: string;
    title: string;
    author: string;
    authorId: string;
    date: string;
    category: 'Short' | 'Forwarded' | 'Research';
    forwardedFrom?: string;
    summary: string;
    content: string;
    thumbnailUrl: string;
    readTime: string;
    authorAvatar: string;
}
