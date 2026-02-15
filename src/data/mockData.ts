import type { TeamMember } from '../types/team';

export const mockMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Alice Kim',
        role: 'Research Lead',
        period: '2022 - Present',
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
            { id: '1', date: '2024-02-12 14:30', type: 'telegram', content: 'Shared analysis on EIP-4844 impact on L2 fees.' },
            { id: '2', date: '2024-02-10 09:15', type: 'github', content: 'Committed initial translation for eth.org/roadmap', link: 'https://github.com' },
            { id: '3', date: '2024-02-05 18:00', type: 'blog', content: 'Published "State of Ethereum Q3" report.' },
            { id: '4', date: '2024-01-28 11:20', type: 'telegram', content: 'Answered community question regarding staking withdrawals.' },
        ]
    },
    {
        id: '2',
        name: 'Bob Lee',
        role: 'Senior Editor',
        period: '2021 - Present',
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
            { id: '1', date: '2024-02-14 10:00', type: 'blog', content: 'Weekly Recap: The state of liquid staking.' },
            { id: '2', date: '2024-02-11 15:20', type: 'telegram', content: 'Started a poll on upcoming Seoul meetup topics.' },
        ]
    },
    {
        id: '3',
        name: 'Charlie Park',
        role: 'Legacy Contributor',
        period: '2020 - 2023',
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
            { id: '1', date: '2023-12-01 10:00', type: 'github', content: 'Transferred repository ownership to the collective.' },
        ]
    },
];

export const mockContributors: (TeamMember & { category: string })[] = [
    {
        id: 'c1',
        name: 'Dave',
        role: 'Translation',
        category: 'Translation',
        period: '2023 - Present',
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
            { id: '1', date: '2024-02-14 11:00', type: 'github', content: 'Translated "What is Ethereum?" article.', link: 'https://github.com' }
        ]
    },
    {
        id: 'c2',
        name: 'Eve',
        role: 'UI Design',
        category: 'Design',
        period: '2023 - Present',
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
            { id: '1', date: '2024-02-10 14:00', type: 'blog', content: 'Shared new design system tokens.' }
        ]
    },
    {
        id: 'c4',
        name: 'Grace',
        role: 'Frontend Dev',
        category: 'Development',
        period: '2022 - Present',
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
            { id: '1', date: '2024-02-15 09:00', type: 'github', content: 'Optimized Hero section animations.', link: 'https://github.com' }
        ]
    },
    {
        id: 'c5',
        name: 'Heidi',
        role: 'Community Manager',
        category: 'Community',
        period: '2021 - Present',
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
            { id: '1', date: '2024-02-12 16:00', type: 'telegram', content: 'Organized community AMA session.' }
        ]
    }
];
