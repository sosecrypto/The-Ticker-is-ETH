export interface Contribution {
    date: string;
    count: number;
}

export interface Activity {
    id: string;
    date: string;
    type: 'telegram' | 'github' | 'blog';
    content: string;
    link?: string;
    views?: number;
    forwards?: number;
    sourceUrl?: string;
}

export interface TelegramRawMessage {
    id: number;
    date: string;
    text: string;
    postAuthor: string;
    views: number;
    forwards: number;
}

export interface TelegramContributor {
    name: string;
    messageCount: number;
    firstMessageDate: string;
    lastMessageDate: string;
    messages: TelegramRawMessage[];
}

export interface TelegramData {
    channel: string;
    fetchedAt: string;
    totalMessages: number;
    contributors: TelegramContributor[];
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    period: string; // e.g., "2023 - Present"
    isCurrent: boolean;
    avatarUrl: string;
    contributions: Contribution[]; // Mock data for heatmap
    recentActivity: Activity[];
    bio: string;
    memberType: 'core' | 'contributor';
    social: {
        twitter?: string;
        github?: string;
        telegram?: string;
    };
}
