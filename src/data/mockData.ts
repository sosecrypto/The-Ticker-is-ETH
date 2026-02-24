import type { TeamMember, Activity, Contribution } from '../types/team';
import { formatDate, isStillActive } from '../utils/telegram';
import rawEnrichment from './team-enrichment.json';

// --- Enrichment JSON 타입 ---

interface EnrichedContributor {
    name: string;
    messageCount: number;
    firstMessageDate: string;
    lastMessageDate: string;
    contributionMap: Record<string, number>;
    recentActivity: Activity[];
}

interface TeamEnrichment {
    channel: string;
    contributors: EnrichedContributor[];
}

const enrichmentData = rawEnrichment as unknown as TeamEnrichment;

// --- Sparse contributionMap → Contribution[] 변환 ---

function expandContributions(
    map: Record<string, number>,
    firstDate: Date,
): Contribution[] {
    const totalDays = Math.ceil(
        (Date.now() - firstDate.getTime()) / (24 * 60 * 60 * 1000),
    ) + 1;

    return Array.from({ length: totalDays }, (_, i) => {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().slice(0, 10);
        return { date: d.toISOString(), count: map[key] ?? 0 };
    });
}

// --- Enrichment 데이터 헬퍼 ---

function findEnrichedContributor(name: string): EnrichedContributor | undefined {
    const nameMap: Record<string, string> = {
        'Sose': 'sose',
    };
    const tgName = nameMap[name] ?? name;
    return enrichmentData.contributors.find(
        c => c.name.toLowerCase() === tgName.toLowerCase()
    );
}

// --- Core Team 멤버 정의 ---

const rawMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Sose',
        role: 'Core Team',
        period: '2024.11.01 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/sose.jpg',
        bio: 'AI Vibe Coder | Web3 Native | DigitalAsset Analyst Team Lead - DeSpread | Core Team - The Ticker is ETH. 기술의 발전을 통한 세상의 긍정적인 발전을 기대합니다. Public goods, AI에 관심이 많습니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com/sosecrypto_kr', github: 'https://github.com/sumsun-dev', linkedin: 'https://www.linkedin.com/in/%EC%83%81%ED%98%84-%EC%97%84-5a03b628a/', telegram: 'https://t.me/crypto_offroad' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '2',
        name: 'Jay',
        role: 'Core Team',
        period: '2024.11.20 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/jay.jpg',
        bio: 'Sunnyside Labs에서 프라이버시 솔루션 Privacy Boost를 빌딩하고 있습니다. 주 관심 분야는 프라이버시와 레이어 2의 생태계입니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com/jaymayday_eth', linkedin: 'https://www.linkedin.com/in/jaesuk-jang/' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '3',
        name: 'sm-stack',
        role: 'Core Team',
        period: '2024.11.04 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/sm-stack.jpg',
        bio: 'Sunnyside Labs에서 프라이버시 솔루션 Privacy Boost를 빌딩하고 있습니다. L2부터 AA, ZK, 프라이버시 등 이더리움의 기술 레이어에 관심을 두고 있습니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com/organ_mo', github: 'https://github.com/sm-stack', linkedin: 'https://www.linkedin.com/in/seungmin-jeon-4ab159171/' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '4',
        name: 'Rejamong',
        role: 'Core Team',
        period: '2024.12.13 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/rejamong.jpg',
        bio: '블록체인 개발자. 매일 이더리움 뉴스를 큐레이션하여 가격·프로토콜·EIP 동향을 한눈에 정리하며, 커뮤니티가 빠르게 정보를 얻을 수 있도록 돕습니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com/r2Jamong', telegram: 'https://t.me/rejamong' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '5',
        name: 'Kuma',
        role: 'Core Team',
        period: '2024.11.05 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/kuma.jpg',
        bio: 'Public goods 와 디지털 주권에 관심이 많은 기여자입니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com/kuma_hada', telegram: 'https://t.me/optimism_kr', linkedin: 'https://www.linkedin.com/in/hada-kang-b0b70295/' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '6',
        name: 'Jenna',
        role: 'Core Team',
        period: '2024.12.23 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/jenna.jpg',
        bio: '일반인 및 기업 대상으로, 개인지갑을 주 축으로 한 금융을 교육합니다. Ethcon Korea 2023 리드 오거나이저로 활동하였습니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com/Pepe_Jenna', linkedin: 'https://www.linkedin.com/in/%EC%9E%AC%EC%9B%90-%EB%B0%95-bb1982179/' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '7',
        name: 'Meenari',
        role: 'Core Team',
        period: '2024.11.12 - 2025.11.04',
        isCurrent: false,
        avatarUrl: '/assets/team/meenari.jpg',
        bio: '이더리움 생태계 이벤트와 보안 이슈를 다루며, Devcon·Devconnect 등 글로벌 행사 소식과 프로토콜 보안 분석을 공유합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com/dani_jee' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '8',
        name: '100y',
        role: 'Core Team',
        period: '2025.09.01 - 2026.02.03',
        isCurrent: false,
        avatarUrl: '/assets/team/100y.jpg',
        bio: 'Four Pillars에서 리서치리드 역할을 하고 있으며, 주 관심 분야는 전통금융 시스템과 온체인의 접점입니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com/100y_eth', telegram: 'https://t.me/hodl100y' },
        contributions: [],
        recentActivity: [],
    }
];

// Enrichment 데이터 매핑 (contributions/recentActivity만 반영, period/isCurrent는 원본 고정)
export const mockMembers: TeamMember[] = rawMembers.map(member => {
    const enriched = findEnrichedContributor(member.name);
    if (!enriched) return member;

    const contributions = expandContributions(enriched.contributionMap, new Date(enriched.firstMessageDate));

    return {
        ...member,
        contributions,
        recentActivity: enriched.recentActivity,
    };
});

const coreByName = new Map(rawMembers.map(m => [m.name.toLowerCase(), m]));

function telegramToContributors(): (TeamMember & { category: string })[] {
    return enrichmentData.contributors.map((contributor) => {
        const slug = contributor.name.toLowerCase().replace(/\s+/g, '-');
        const contributions = expandContributions(contributor.contributionMap, new Date(contributor.firstMessageDate));
        const active = isStillActive(contributor.lastMessageDate);
        const endDate = active ? 'Present' : formatDate(contributor.lastMessageDate);
        const period = `${formatDate(contributor.firstMessageDate)} - ${endDate}`;

        return {
            id: `tg-${slug}`,
            name: contributor.name,
            role: 'Content Creator',
            period,
            isCurrent: active,
            avatarUrl: `/assets/team/${contributor.name.toLowerCase()}.jpg`,
            contributions,
            recentActivity: contributor.recentActivity,
            bio: `${enrichmentData.channel} 채널에서 ${contributor.messageCount}개의 메시지를 작성한 기여자입니다.`,
            memberType: 'contributor' as const,
            category: 'Content',
            social: {
                telegram: `https://t.me/${enrichmentData.channel}`,
            },
        };
    });
}

// Core Team 멤버가 컨트리뷰터에도 포함될 때, bio/social/avatar만 동기화 (period/isCurrent는 텔레그램 활동 기준 유지)
const telegramContributors = telegramToContributors().map(tc => {
    const core = coreByName.get(tc.name.toLowerCase());
    if (!core) return tc;
    return {
        ...tc,
        bio: core.bio,
        social: core.social,
        avatarUrl: core.avatarUrl,
    };
});

export const mockContributors: (TeamMember & { category: string })[] = [
    {
        id: 'gen-1',
        name: 'Gen',
        role: 'Contributor',
        period: '2024.01.01 - Present',
        isCurrent: true,
        avatarUrl: '/assets/contributors/gen.jpg',
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: 0,
        })),
        recentActivity: [],
        bio: 'The Ticker is ETH 커뮤니티 기여자입니다.',
        memberType: 'contributor' as const,
        category: 'Content',
        social: { website: 'https://maily.so/asthedaysgoby' },
    },
    ...telegramContributors,
];
