import type { ResearchItem } from '../types/research';
import forwardedMessages from './forwarded-messages.json';

// --- Telegram 텍스트 → Markdown 변환 ---
function formatTelegramToMarkdown(text: string): string {
    return text
        .replace(/(?<!\[|\()(https?:\/\/[^\s),\]]+)/g, '[$1]($1)')
        .replace(/\n(?!\n)/g, '  \n');
}

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
                content: formatTelegramToMarkdown(text),
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
