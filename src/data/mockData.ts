import type { TeamMember } from '../types/team';
import type { ResearchItem } from '../types/research';

export const mockMembers: TeamMember[] = [
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
        avatarUrl: '/assets/team/jay.jpg',
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
        avatarUrl: '/assets/team/sm-stack.jpg',
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
        avatarUrl: '/assets/team/rejamong.jpg',
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
        avatarUrl: '/assets/team/kuma.jpg',
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
        avatarUrl: '/assets/team/jenna.jpg',
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
        avatarUrl: '/assets/team/meenari.jpg',
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
        avatarUrl: '/assets/team/100y.jpg',
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
        ...mockMembers[0],
        id: 'c1',
        role: 'Contributor',
        category: 'Community',
        memberType: 'contributor',
        period: '2021.01.01 - Present',
        isCurrent: true,
    },
    {
        ...mockMembers[1],
        id: 'c2',
        role: 'Contributor',
        category: 'Research',
        memberType: 'contributor',
        period: '2022.03.15 - Present',
        isCurrent: true,
    },
    {
        ...mockMembers[2],
        id: 'c3',
        role: 'Contributor',
        category: 'Development',
        memberType: 'contributor',
        period: '2022.06.01 - Present',
        isCurrent: true,
    },
    {
        ...mockMembers[3],
        id: 'c4',
        role: 'Contributor',
        category: 'Design',
        memberType: 'contributor',
        period: '2022.09.20 - Present',
        isCurrent: true,
    },
    {
        ...mockMembers[4],
        id: 'c5',
        role: 'Contributor',
        category: 'Community',
        memberType: 'contributor',
        period: '2023.01.10 - Present',
        isCurrent: true,
    },
    {
        ...mockMembers[5],
        id: 'c6',
        role: 'Contributor',
        category: 'Community',
        memberType: 'contributor',
        period: '2023.02.15 - Present',
        isCurrent: true,
    },
    {
        ...mockMembers[6],
        id: 'c7',
        name: 'Meenari',
        role: 'Contributor',
        category: 'Translation',
        period: '2021.05.01 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: '/assets/team/meenari.jpg',
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
        ...mockMembers[7],
        id: 'c8',
        name: '100y',
        role: 'Contributor',
        category: 'Research',
        period: '2021.10.15 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: '/assets/team/100y.jpg',
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
        id: 'c9',
        name: 'Gen',
        role: 'Contributor',
        category: 'Community',
        period: '2023.10.01 - Present',
        isCurrent: true,
        memberType: 'contributor',
        avatarUrl: '/assets/contributors/gen.jpg',
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
