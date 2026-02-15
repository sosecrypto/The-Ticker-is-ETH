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
    social: {
        twitter?: string;
        github?: string;
        telegram?: string;
    };
}
