import type { TeamMember } from '../types/team';

export const mockMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Alice Kim',
        role: 'Research Lead',
        period: '2022.03.15 - Present',
        isCurrent: true,
        avatarUrl: 'https://ui-avatars.com/api/?name=Alice+Kim&background=3C4CA8&color=fff',
        bio: 'Focused on Layer 2 scaling solutions and privacy protocols. Leading the effort to translate core technical documents into Korean for accessibility.',
        memberType: 'core',
        social: { twitter: 'https://x.com', github: 'https://github.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 5)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.12', type: 'telegram', content: '[분석] EIP-4844가 L2 수수료에 미치는 영향 분석 공유' },
            { id: '2', date: '2024-02.10', type: 'github', content: 'Ethereum Roadmap (eth.org) 한국어 번역 초기 커밋', link: 'https://github.com' },
            { id: '3', date: '2024.02.05', type: 'telegram', content: '[정보] Ethereum Q3 상태 보고서 요약본 게시' },
            { id: '4', date: '2024.01.28', type: 'telegram', content: '[Q&A] 스테이킹 인출 관련 커뮤니티 질의응답 진행' },
        ]
    },
    {
        id: '2',
        name: 'Bob Lee',
        role: 'Senior Editor',
        period: '2021.05.10 - Present',
        isCurrent: true,
        avatarUrl: 'https://ui-avatars.com/api/?name=Bob+Lee&background=A086FC&color=fff',
        bio: 'Curating the best Ethereum news for the Korean community. Veteran in the crypto space with a focus on governance and DAO structures.',
        memberType: 'core',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 8)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.14', type: 'telegram', content: '[위클리] 리퀴드 스테이킹 동향 및 이슈 정리' },
            { id: '2', date: '2024.02.11', type: 'telegram', content: '[공지] 서울 밋업 주제 선정을 위한 투표 진행' },
            { id: '3', date: '2024.02.08', type: 'telegram', content: '[뉴스] 이더리움 덴쿤 업그레이드 일정 확정 안내' }
        ]
    },
    {
        id: '3',
        name: 'Charlie Park',
        role: 'Legacy Contributor',
        period: '2020.08.01 - 2023.12.31',
        isCurrent: false,
        avatarUrl: 'https://ui-avatars.com/api/?name=Charlie+Park&background=333&color=fff',
        bio: 'Built the initial infrastructure for the community site and telegram bots. Now advising on regional expansion strategies.',
        memberType: 'core',
        social: { github: 'https://github.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: i > 50 ? 0 : Math.floor(Math.random() * 2)
        })),
        recentActivity: [
            { id: '1', date: '2023.12.01', type: 'telegram', content: '[운영] 텔레그램 공지 봇 관리 권한 인계 완료' },
            { id: '2', date: '2023.11.25', type: 'telegram', content: '[개발] 커뮤니티 대시보드 v1.0 릴리즈' }
        ]
    },
];

export const mockContributors: (TeamMember & { category: string })[] = [
    {
        id: 'c1',
        name: 'Dave',
        role: 'Translation',
        category: 'Translation',
        period: '2023.01.20 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Dave&background=555&color=fff',
        bio: 'Passionate about making Ethereum content accessible to everyone in Korea through high-quality translations.',
        social: { github: 'https://github.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 3)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.14', type: 'telegram', content: '[번역] "이더리움이란 무엇인가?" 기초 백서 번역본 공유' },
            { id: '2', date: '2024.02.10', type: 'telegram', content: '[번역] 공식 로드맵 기술적 아티클 요약 번역' }
        ]
    },
    {
        id: 'c2',
        name: 'Eve',
        role: 'UI Design',
        category: 'Design',
        period: '2023.06.05 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Eve&background=777&color=fff',
        bio: 'Creating beautiful and intuitive interfaces for the community dashboard.',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 4)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.10', type: 'telegram', content: '[디자인] 신규 디자인 시스템 토큰 가이드 게시' },
            { id: '2', date: '2024.02.02', type: 'telegram', content: '[디자인] 2월 오프라인 밋업 배너 시안 공유' }
        ]
    },
    {
        id: 'c4',
        name: 'Grace',
        role: 'Frontend Dev',
        category: 'Development',
        period: '2022.11.12 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Grace&background=999&color=fff',
        bio: 'Building the next generation of web tools for the Ethereum Korea community.',
        social: { github: 'https://github.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 10)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.15', type: 'telegram', content: '[개발] 히어로 섹션 애니메이션 최적화 현황 공유' },
            { id: '2', date: '2024.02.05', type: 'telegram', content: '[개발] 모바일 웹 뷰 포트 최적화 패치 노트 게시' }
        ]
    },
    {
        id: 'c5',
        name: 'Heidi',
        role: 'Community Manager',
        category: 'Community',
        period: '2021.09.28 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: 'https://ui-avatars.com/api/?name=Heidi&background=444&color=fff',
        bio: 'Connecting people and fostering a collaborative environment for all Ethereum enthusiasts.',
        social: { twitter: 'https://x.com' },
        contributions: Array.from({ length: 140 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            count: Math.floor(Math.random() * 6)
        })),
        recentActivity: [
            { id: '1', date: '2024.02.12', type: 'telegram', content: '[커뮤니티] 신규 참여자 온보딩 가이드 텔레그램 공지' },
            { id: '2', date: '2024.02.08', type: 'telegram', content: '[커뮤니티] 이더리움 기초 개념 AMA 세션 주최' }
        ]
    }
];
