import type { TeamMember, TelegramData, TelegramContributor } from '../types/team';
import type { ResearchItem } from '../types/research';
import telegramData from './telegram-contributors.json';
import forwardedMessages from './forwarded-messages.json';

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
        period: '2024.11.01 - Present',
        isCurrent: true,
        avatarUrl: '/assets/team/sose.jpg',
        bio: 'DeSpread Growth Lead. 이더리움 프로토콜 뉴스와 재단 정책을 전하며, AI 에이전트 생태계부터 양자 컴퓨팅 대응까지 이더리움의 미래를 조망합니다.',
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
        bio: 'Lightscale (Wemade) Business Strategist. 채널 최다 기여자로서 Kroma 등 L2 롤업 생태계와 거버넌스 동향을 심층 분석하며, 주요 프로토콜 업데이트를 전합니다.',
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
        bio: '블록체인 엔지니어 & 리서처. Encode Club 해커톤 우승, Account Abstraction 전문가. 이더리움 코어 프로토콜과 EIP를 분석하며 차기 업그레이드의 기술적 방향성을 전달합니다.',
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
        bio: 'DeFi 프로토콜과 보안 이슈를 분석하며, 스마트 컨트랙트 보안부터 개발자 도구까지 이더리움 생태계의 실질적 활용을 탐구합니다.',
        memberType: 'core',
        social: { telegram: 'https://t.me/optimism_kr', linkedin: 'https://www.linkedin.com/in/hada-kang-b0b70295/' },
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
        bio: '이더리움 주요 업그레이드와 DAO 거버넌스를 분석하며, Pectra 업그레이드부터 Arbitrum DAO 투자 정책까지 폭넓은 시각을 제공합니다.',
        memberType: 'core',
        social: { linkedin: 'https://www.linkedin.com/in/%EC%9E%AC%EC%9B%90-%EB%B0%95-bb1982179/' },
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
        social: {},
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
        bio: 'Four Pillars Research Lead, 서울대 PhD. 이더리움 L1 확장성과 zkEVM 보안을 심층 분석하며, Asia Stablecoin Alliance 보드멤버로서 스테이블코인 정책 연구를 주도합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com/100y_eth' },
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

// Core Team과 동일 인물이면 Core 데이터(bio/social/period)를 동기화
const coreByName = new Map(mockMembers.map(m => [m.name.toLowerCase(), m]));

const telegramContributors = telegramToContributors(telegramData as TelegramData).map(tc => {
    const core = coreByName.get(tc.name.toLowerCase());
    if (!core) return tc;
    return {
        ...tc,
        bio: core.bio,
        social: core.social,
        period: core.period,
        isCurrent: core.isCurrent,
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

// --- Telegram → Research 변환 ---
function telegramToResearch(): ResearchItem[] {
    return (forwardedMessages as Array<{
        id: number;
        date: string;
        text: string;
        fromChannelTitle: string | null;
        fromPostAuthor: string | null;
    }>)
        .filter(msg => msg.text.length >= 200)
        .map(msg => {
            const text = msg.text;
            const tagMatch = text.match(/^\[([^\]]+)\]/);
            const title = tagMatch
                ? tagMatch[1]
                : text.split('\n')[0].slice(0, 80).replace(/\s+$/, '');
            const author = msg.fromPostAuthor || 'Community';
            const readTime = `${Math.max(1, Math.round(text.length / 500))} min`;
            const dateObj = new Date(msg.date);
            const date = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;

            return {
                id: `tg-${msg.id}`,
                title,
                author,
                authorId: '',
                date,
                category: 'Telegram' as const,
                summary: text.slice(0, 200).replace(/\n+/g, ' ').trim(),
                content: text,
                thumbnailUrl: '',
                readTime,
            };
        });
}

const telegramResearchItems = telegramToResearch();

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
    },
    ...telegramResearchItems,
];
