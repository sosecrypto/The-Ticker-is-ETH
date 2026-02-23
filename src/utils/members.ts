import type { Contribution, TeamMember } from '../types/team';

export function getAvatarFallbackUrl(name: string, size = 64): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3C4CA8&color=fff&size=${size}`;
}

export function getTotalContributions(contributions: Contribution[]): number {
    return contributions.reduce((acc, c) => acc + c.count, 0);
}

type SortOption = 'contributions' | 'seniority';

export function sortMembers<T extends Pick<TeamMember, 'contributions' | 'period'>>(
    members: T[],
    sortBy: SortOption,
): T[] {
    return [...members].sort((a, b) => {
        if (sortBy === 'contributions') {
            return getTotalContributions(b.contributions) - getTotalContributions(a.contributions);
        }
        const aDate = new Date(a.period.split(' - ')[0].replace(/\./g, '-')).getTime();
        const bDate = new Date(b.period.split(' - ')[0].replace(/\./g, '-')).getTime();
        return aDate - bDate;
    });
}
