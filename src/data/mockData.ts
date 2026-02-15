import type { TeamMember } from '../types/team';

export const mockMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Sose',
        role: 'Core Team',
        period: '2021.01.01 - Present',
        isCurrent: true,
        avatarUrl: 'https://ui-avatars.com/api/?name=Sose&background=3C4CA8&color=fff',
        bio: '이더리움 생태계의 성장을 돕는 정원사(Gardener) 역할을 수행하며 비영리 단체의 비전과 방향성을 이끕니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com', github: 'https://github.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 8)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.15', type: 'telegram', content: '[분석] Infinite Garden 철학에 기반한 2024년 생태계 로드맵 공유' },
            { id: '2', date: '2024.02.10', type: 'telegram', content: '[공지] Subtraction(뺄셈의 철학)에 따른 커뮤니티 거버넌스 개편 안내' },
        ]
    },
    {
        id: '2',
        name: 'Jay',
        role: 'Core Team',
        period: '2022.03.15 - Present',
        isCurrent: true,
        avatarUrl: 'https://ui-avatars.com/api/?name=Jay&background=A086FC&color=fff',
        bio: '기술적 장벽을 낮추기 위해 이더리움 코어 기술 및 로드맵을 한국어로 심층 연구하고 전파합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 6)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.14', type: 'telegram', content: '[리서치] 이더리움 덴쿤(Dencun) 업그레이드의 기술적 의의 정리' },
            { id: '2', date: '2024.02.08', type: 'telegram', content: '[Q&A] 레이어 2 확장성 솔루션 기술 세미나 진행' }
        ]
    },
    {
        id: '3',
        name: 'sm-stack',
        role: 'Core Team',
        period: '2022.06.01 - Present',
        isCurrent: true,
        avatarUrl: 'https://ui-avatars.com/api/?name=sm-stack&background=333&color=fff',
        bio: '커뮤니티의 기술적 공공재인 웹 도구와 인프라를 개발하며, 오픈 소스 생태계 기여를 주도합니다.',
        memberType: 'core',
        social: { github: 'https://github.com/sm-stack' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 10)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.13', type: 'github', content: 'Ethereum Korea 공식 웹사이트 v2.0 배포 완료', link: 'https://github.com' },
            { id: '2', date: '2024.02.05', type: 'telegram', content: '[개발] 개발자들을 위한 이더리움 SDK 튜토리얼 게시' }
        ]
    },
    {
        id: '4',
        name: 'Rejamong',
        role: 'Core Team',
        period: '2022.09.20 - Present',
        isCurrent: true,
        avatarUrl: 'https://ui-avatars.com/api/?name=Rejamong&background=FECACA&color=fff',
        bio: '이더리움의 가치를 시각적으로 전달하며, 생태계 구성원들이 즐겁게 참여할 수 있는 브랜드 경험을 디자인합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 5)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.12', type: 'telegram', content: '[디자인] The Ticker is ETH 신규 굿즈 디자인 시안 투표' },
            { id: '2', date: '2024.02.01', type: 'telegram', content: '[공지] 오프라인 밋업 현장 스케치 및 하이라이트 영상 공유' }
        ]
    },
    {
        id: '5',
        name: 'Kuma',
        role: 'Core Team',
        period: '2023.01.10 - Present',
        isCurrent: true,
        avatarUrl: 'https://ui-avatars.com/api/?name=Kuma&background=FDE047&color=fff',
        bio: '커뮤니티 멤버들의 활발한 소통을 돕고, 정원(Garden) 안에서 누구나 편안하게 활동할 수 있도록 지원합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 7)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.14', type: 'telegram', content: '[이벤트] 설날 맞이 이더리움 퀴즈 이벤트 진행' },
            { id: '2', date: '2024.02.07', type: 'telegram', content: '[커뮤니티] 신규 멤버들을 위한 Q&A 채널 가이드 공지' }
        ]
    },
    {
        id: '6',
        name: 'Jenna',
        role: 'Core Team',
        period: '2023.02.15 - Present',
        isCurrent: true,
        avatarUrl: 'https://ui-avatars.com/api/?name=Jenna&background=C084FC&color=fff',
        bio: '비영리 단체의 효율적인 운영과 프로젝트 관리를 담당하며, 지속 가능한 생태계를 위한 청지기 역할을 수행합니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 4)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.11', type: 'telegram', content: '[운영] 1분기 보조금(Grants) 집행 현황 및 투명성 보고서 게시' },
            { id: '2', date: '2024.01.25', type: 'telegram', content: '[공지] 상반기 생태계 공헌 활동 계획 수립 안내' }
        ]
    },
    {
        id: '7',
        name: 'Meenari',
        role: 'Core Team',
        period: '2021.05.01 - 2023.12.31',
        isCurrent: false,
        avatarUrl: 'https://ui-avatars.com/api/?name=Meenari&background=4ADE80&color=fff',
        bio: '초기 이더리움 문서 번역 및 가이드 제작을 주도하며 한국 생태계의 기초를 닦았습니다.',
        memberType: 'core',
        social: { github: 'https://github.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: i > 60 ? 0 : Math.floor(Math.random() * 3)
        })),
        recentActivity: [
            { id: '1', date: '2023.12.20', type: 'telegram', content: '[운영] 번역 팀 운영 가이드라인 최종 업데이트' }
        ]
    },
    {
        id: '8',
        name: '100y',
        role: 'Core Team',
        period: '2021.10.15 - 2023.08.30',
        isCurrent: false,
        avatarUrl: 'https://ui-avatars.com/api/?name=100y&background=FB923C&color=fff',
        bio: '심도 있는 가치 연구를 통해 생태계에 철학적인 영양분을 공급하며 기초를 다졌습니다.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: i > 100 ? 0 : Math.floor(Math.random() * 4)
        })),
        recentActivity: [
            { id: '1', date: '2023.08.15', type: 'telegram', content: '[리서치] 이더리움 공공재 가치 보존의 역사 아카이브 완료' }
        ]
    }
];

export const mockContributors: (TeamMember & { category: string })[] = [
    {
        id: '1',
        name: 'Sose',
        role: 'Contributor',
        category: 'Community',
        period: '2021.01.01 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Sose&background=3C4CA8&color=fff',
        bio: '이더리움 생태계의 성장을 돕는 정원사(Gardener) 역할을 수행합니다.',
        social: { twitter: 'https://x.com', github: 'https://github.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 8)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.15', type: 'telegram', content: '[분석] Infinite Garden 철학 기반 생태계 로드맵 공유' }
        ]
    },
    {
        id: '2',
        name: 'Jay',
        role: 'Contributor',
        category: 'Research',
        period: '2022.03.15 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Jay&background=A086FC&color=fff',
        bio: '이더리움 코어 기술 및 로드맵을 연구하고 전파합니다.',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 6)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.14', type: 'telegram', content: '[리서치] 덴쿤 업그레이드 기술 총정리' }
        ]
    },
    {
        id: '3',
        name: 'sm-stack',
        role: 'Contributor',
        category: 'Development',
        period: '2022.06.01 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=sm-stack&background=333&color=fff',
        bio: '커뮤니티 공공재 도구 및 인프라를 개발합니다.',
        social: { github: 'https://github.com/sm-stack' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 10)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.13', type: 'github', content: '공식 사이트 v2.0 배포' }
        ]
    },
    {
        id: '4',
        name: 'Rejamong',
        role: 'Contributor',
        category: 'Design',
        period: '2022.09.20 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Rejamong&background=FECACA&color=fff',
        bio: '이더리움의 가치를 시각적으로 디자인합니다.',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 5)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.12', type: 'telegram', content: '[디자인] 신규 굿즈 시안 공유' }
        ]
    },
    {
        id: '5',
        name: 'Kuma',
        role: 'Contributor',
        category: 'Community',
        period: '2023.01.10 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Kuma&background=FDE047&color=fff',
        bio: '커뮤니티 소통과 멤버 활동을 지원합니다.',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 7)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.14', type: 'telegram', content: '[이벤트] 설날 퀴즈 이벤트 진행' }
        ]
    },
    {
        id: '6',
        name: 'Jenna',
        role: 'Contributor',
        category: 'Community',
        period: '2023.02.15 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Jenna&background=C084FC&color=fff',
        bio: '비영리 단체 운영 및 프로젝트 관리를 담당합니다.',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 4)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.11', type: 'telegram', content: '[운영] 투명성 보고서 게시' }
        ]
    },
    {
        id: '7',
        name: 'Meenari',
        role: 'Contributor',
        category: 'Translation',
        period: '2021.05.01 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Meenari&background=4ADE80&color=fff',
        bio: '이더리움 한국어 번역 및 가이드 제작에 기여하고 있습니다.',
        social: { github: 'https://github.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 3)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.15', type: 'telegram', content: '[번역] 최신 EF 블로그 포스트 번역' }
        ]
    },
    {
        id: '8',
        name: '100y',
        role: 'Contributor',
        category: 'Research',
        period: '2021.10.15 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=100y&background=FB923C&color=fff',
        bio: '이더리움의 가치와 기술 연구에 참여하고 있습니다.',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 4)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.10', type: 'telegram', content: '[리서치] 공공재 기여 가이드 업데이트' }
        ]
    },
    {
        id: 'c6',
        name: 'Gen',
        role: 'Contributor',
        category: 'Community',
        period: '2023.10.01 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Gen&background=60A5FA&color=fff',
        bio: '커뮤니티를 위한 양질의 콘텐츠를 생산하고 소통을 돕습니다.',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 5)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.14', type: 'telegram', content: '[콘텐츠] 텔레그램 커뮤니티 데일리 뉴스 브리핑' }
        ]
    }
];
