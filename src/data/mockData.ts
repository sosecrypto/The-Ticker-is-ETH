import type { TeamMember, TelegramData, TelegramContributor } from '../types/team';
import type { ResearchItem } from '../types/research';
import telegramData from './telegram-contributors.json';

// --- Telegram 실데이터 헬퍼 함수 ---

function findTelegramContributor(name: string): TelegramContributor | undefined {
    const nameMap: Record<string, string> = {
        'Sose': 'sose',
    };
    const tgName = nameMap[name] ?? name;
    return (telegramData as TelegramData).contributors.find(
        c => c.name.toLowerCase() === tgName.toLowerCase()
    );
}

function extractFirstSentence(text: string): string {
    const cleaned = text.replace(/\n+/g, ' ').trim();
    const match = cleaned.match(/^.+?[.!?]\s/);
    const sentence = match ? match[0].trim() : cleaned;
    return sentence.length > 100 ? sentence.slice(0, 97) + '...' : sentence;
}

function buildTelegramActivity(contributor: TelegramContributor) {
    const dateCounts = new Map<string, number>();
    for (const msg of contributor.messages) {
        const dateKey = msg.date.slice(0, 10);
        dateCounts.set(dateKey, (dateCounts.get(dateKey) ?? 0) + 1);
    }

    const firstDate = new Date(contributor.firstMessageDate);
    const totalDays = Math.ceil((Date.now() - firstDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;

    const contributions = Array.from({ length: totalDays }, (_, i) => {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().slice(0, 10);
        return { date: d.toISOString(), count: dateCounts.get(key) ?? 0 };
    });

    const recentMessages = [...contributor.messages]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const recentActivity = recentMessages.map((msg, i) => {
        const urlMatch = msg.text.match(/https?:\/\/[^\s),]+/);
        return {
            id: `tg-${i}`,
            date: new Date(msg.date).toLocaleDateString('ko-KR', {
                year: 'numeric', month: '2-digit', day: '2-digit'
            }).replace(/\. /g, '.').replace(/\.$/, ''),
            type: 'telegram' as const,
            content: extractFirstSentence(msg.text),
            link: `https://t.me/thetickeriseth/${msg.id}`,
            views: msg.views,
            forwards: msg.forwards,
            sourceUrl: urlMatch?.[0],
        };
    });

    return { contributions, recentActivity };
}

// --- Core Team 멤버 정의 ---

const rawMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Sose',
        role: 'Core Team',
        period: '2021.01.01 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/sose.jpg',
        bio: '이더리움 생태계의 성장을 돕는 정원사(Gardener) 역할을 수행하며 비영리 단체의 비전과 방향성을 이끕니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com', github: 'https://github.com' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '2',
        name: 'Jay',
        role: 'Core Team',
        period: '2022.03.15 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/jay.jpg',
        bio: '기술적 장벽을 낮추기 위해 이더리움 코어 기술 및 로드맵을 한국어로 심층 연구하고 전파합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '3',
        name: 'sm-stack',
        role: 'Core Team',
        period: '2022.06.01 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/sm-stack.jpg',
        bio: '커뮤니티의 기술적 공공재인 웹 도구와 인프라를 개발하며, 오픈 소스 생태계 기여를 주도합니다.',
        memberType: 'core',
        social: { github: 'https://github.com/sm-stack' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '4',
        name: 'Rejamong',
        role: 'Core Team',
        period: '2022.09.20 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/rejamong.jpg',
        bio: '이더리움의 가치를 시각적으로 전달하며, 생태계 구성원들이 즐겁게 참여할 수 있는 브랜드 경험을 디자인합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '5',
        name: 'Kuma',
        role: 'Core Team',
        period: '2023.01.10 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/kuma.jpg',
        bio: '커뮤니티 멤버들의 활발한 소통을 돕고, 정원(Garden) 안에서 누구나 편안하게 활동할 수 있도록 지원합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '6',
        name: 'Jenna',
        role: 'Core Team',
        period: '2023.02.15 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/jenna.jpg',
        bio: '비영리 단체의 효율적인 운영과 프로젝트 관리를 담당하며, 지속 가능한 생태계를 위한 청지기 역할을 수행합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '7',
        name: 'Meenari',
        role: 'Core Team',
        period: '2021.05.01 - 2023.12.31',
        isCurrent: false,
        avatarUrl: '/assets/team/meenari.jpg',
        bio: '초기 이더리움 문서 번역 및 가이드 제작을 주도하며 한국 생태계의 기초를 닦았습니다.',
        memberType: 'core',
        social: { github: 'https://github.com' },
        contributions: [],
        recentActivity: [],
    },
    {
        id: '8',
        name: '100y',
        role: 'Core Team',
        period: '2021.10.15 - 2023.08.30',
        isCurrent: false,
        avatarUrl: '/assets/team/100y.jpg',
        bio: '심도 있는 가치 연구를 통해 생태계에 철학적인 영양분을 공급하며 기초를 다졌습니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: [],
        recentActivity: [],
    }
];

// Telegram 실데이터 매핑
export const mockMembers: TeamMember[] = rawMembers.map(member => {
    const tgContributor = findTelegramContributor(member.name);
    if (!tgContributor) return member;

    const { contributions, recentActivity } = buildTelegramActivity(tgContributor);
    return { ...member, contributions, recentActivity };
});

function telegramToContributors(data: TelegramData): (TeamMember & { category: string })[] {
    return data.contributors.map((contributor, index) => {
        const dateCounts = new Map<string, number>();
        for (const msg of contributor.messages) {
            const dateKey = msg.date.slice(0, 10);
            dateCounts.set(dateKey, (dateCounts.get(dateKey) ?? 0) + 1);
        }

        const firstDate = new Date(contributor.firstMessageDate);
        const totalDays = Math.ceil((Date.now() - firstDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;

        const contributions = Array.from({ length: totalDays }, (_, i) => {
            const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
            const key = d.toISOString().slice(0, 10);
            return { date: d.toISOString(), count: dateCounts.get(key) ?? 0 };
        });

        const recentMessages = contributor.messages
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const recentActivity = recentMessages.map((msg, i) => ({
            id: `t${index}-${i}`,
            date: new Date(msg.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
            type: 'telegram' as const,
            content: msg.text.slice(0, 200),
            link: `https://t.me/${data.channel}/${msg.id}`,
        }));

        const startDate = new Date(contributor.firstMessageDate);
        const period = `${startDate.getFullYear()}.${String(startDate.getMonth() + 1).padStart(2, '0')}.${String(startDate.getDate()).padStart(2, '0')} - Present`;

        return {
            id: `tg-${index}`,
            name: contributor.name,
            role: 'Content Creator',
            period,
            isCurrent: true,
            avatarUrl: `/assets/team/${contributor.name.toLowerCase()}.jpg`,
            contributions,
            recentActivity,
            bio: `${data.channel} 채널에서 ${contributor.messageCount}개의 메시지를 작성한 기여자입니다.`,
            memberType: 'contributor' as const,
            category: 'Content',
            social: {
                telegram: `https://t.me/${data.channel}`,
            },
        };
    });
}

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
        social: {},
    },
    ...telegramToContributors(telegramData as TelegramData),
];

export const mockResearch: ResearchItem[] = [
    {
        id: 'r1',
        title: '이더리움 덴쿤 업그레이드 분석: EIP-4844와 그 이후',
        author: 'Jay',
        authorId: '2',
        date: '2024.03.15',
        category: 'Technical',
        summary: '최근 진행된 덴쿤 업그레이드가 레이어 2 확장성에 미치는 영향과 기술적 의의에 대해 심층 분석합니다.',
        readTime: '8 min',
        thumbnailUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832',
        content: `
# 이더리움 덴쿤 업그레이드 분석

이더리움의 로드맵에서 중요한 이정표가 될 **덴쿤(Dencun)** 업그레이드가 성공적으로 완료되었습니다. 이번 분석에서는 가장 핵심이 되는 **EIP-4844(Proto-Danksharding)**를 중심으로 기술적 변화를 살펴봅니다.

## 1. EIP-4844: Blobs의 도입
기존 레이어 2(L2) 솔루션들은 데이터를 이더리움 메인넷의 'CallData'에 저장해야 했습니다. 이는 매우 높은 비용을 발생시켰으나, 덴쿤 이후에는 'Blob'이라는 새로운 데이터 저장 방식이 도입되었습니다.

- **비용 절감**: Blobs는 일정 기간 이후 삭제되므로 저장 비용이 획기적으로 낮아집니다.
- **처리량 향상**: 데이터 공간이 분리됨에 따라 L2의 트랜잭션 처리 속도가 크게 향상됩니다.

## 2. 향후 로드맵
이후 단계인 'The Purge'를 통해 이더리움은 더욱 가볍고 효율적인 네트워크로 거듭날 것입니다.
`
    },
    {
        id: 'r2',
        title: '무한한 정원(Infinite Garden)의 경제학: 공공재와 보조금',
        author: 'Sose',
        authorId: '1',
        date: '2024.03.10',
        category: 'Economic',
        summary: '이더리움 생태계 내에서 공공재가 가지는 가치와 이를 유지하기 위한 보조금(Grants) 시스템의 작동 원리를 설명합니다.',
        readTime: '6 min',
        thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
        content: `
# 무한한 정원의 경제학

이더리움은 단순한 블록체인이 아닌 거대한 생태계입니다. 이 생태계를 유지하는 가장 큰 힘 중 하나는 바로 **공공재(Public Goods)**에 대한 기여입니다.

## 공공재란 무엇인가?
블록체인 인프라, 번역된 가이드, 커뮤니티 도구 등은 누구나 사용할 수 있지만 수익을 직접 내기 어려운 경우가 많습니다.

- **Stewardship**: 우리는 이러한 소중한 가치들을 지키기 위해 노력합니다.
- **Subtraction**: 이익을 독점하기보다 생태계로 환원하는 뺄셈의 미학을 실천합니다.
`
    }
];
