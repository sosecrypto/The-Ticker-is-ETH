import type { TeamMember, TelegramData, TelegramContributor } from '../types/team';
import { formatDate, isStillActive, buildContributionGraph, buildActivityLog, extractFirstSentence } from '../utils/telegram';
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
        bio: 'Sunnyside Labs에서 프라이버시 솔루션 Privacy Boost를 빌딩하고 있습니다. 주 관심 분야는 레이어 2의 생태계입니다.',
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
        bio: 'Four Pillars Research Lead, 서울대 PhD. 이더리움 L1 확장성과 zkEVM 보안을 심층 분석하며, Asia Stablecoin Alliance 보드멤버로서 스테이블코인 정책 연구를 주도합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com/100y_eth' },
        contributions: [],
        recentActivity: [],
    }
];

// Telegram 실데이터 매핑 (활동 기간: 마지막 글 기준 1개월 이내 → Present, 초과 → 마지막 글 날짜)
export const mockMembers: TeamMember[] = rawMembers.map(member => {
    const tgContributor = findTelegramContributor(member.name);
    if (!tgContributor) return member;

    const contributions = buildContributionGraph(tgContributor.messages, new Date(tgContributor.firstMessageDate));
    const recentActivity = buildActivityLog(tgContributor, 'thetickeriseth');
    const active = isStillActive(tgContributor.lastMessageDate);
    const startDate = member.period.split(' - ')[0];
    const endDate = active ? 'Present' : formatDate(tgContributor.lastMessageDate);

    return {
        ...member,
        contributions,
        recentActivity,
        period: `${startDate} - ${endDate}`,
        isCurrent: active,
    };
});

function telegramToContributors(data: TelegramData): (TeamMember & { category: string })[] {
    return data.contributors.map((contributor, index) => {
        const contributions = buildContributionGraph(contributor.messages, new Date(contributor.firstMessageDate));

        const recentMessages = [...contributor.messages]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const recentActivity = recentMessages.map((msg, i) => ({
            id: `t${index}-${i}`,
            date: new Date(msg.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
            type: 'telegram' as const,
            content: extractFirstSentence(msg.text),
            link: `https://t.me/${data.channel}/${msg.id}`,
        }));

        const active = isStillActive(contributor.lastMessageDate);
        const endDate = active ? 'Present' : formatDate(contributor.lastMessageDate);
        const period = `${formatDate(contributor.firstMessageDate)} - ${endDate}`;

        return {
            id: `tg-${index}`,
            name: contributor.name,
            role: 'Content Creator',
            period,
            isCurrent: active,
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
