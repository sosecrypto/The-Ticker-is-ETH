import type { Activity, Contribution, TelegramContributor } from '../types/team';

export function formatDate(dateInput: string | Date): string {
    const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export function isStillActive(lastMessageDate: string): boolean {
    const lastDate = new Date(lastMessageDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return lastDate >= oneMonthAgo;
}

export function buildContributionGraph(
    messages: { date: string }[],
    firstDate: Date,
): Contribution[] {
    const dateCounts = new Map<string, number>();
    for (const msg of messages) {
        const dateKey = msg.date.slice(0, 10);
        dateCounts.set(dateKey, (dateCounts.get(dateKey) ?? 0) + 1);
    }

    const totalDays = Math.ceil((Date.now() - firstDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;

    return Array.from({ length: totalDays }, (_, i) => {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().slice(0, 10);
        return { date: d.toISOString(), count: dateCounts.get(key) ?? 0 };
    });
}

export function buildActivityLog(
    contributor: TelegramContributor,
    channel: string,
    idPrefix = 'tg',
): Activity[] {
    const recentMessages = [...contributor.messages]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return recentMessages.map((msg, i) => {
        const urlMatch = msg.text.match(/https?:\/\/[^\s),]+/);
        return {
            id: `${idPrefix}-${i}`,
            date: new Date(msg.date).toLocaleDateString('ko-KR', {
                year: 'numeric', month: '2-digit', day: '2-digit',
            }).replace(/\. /g, '.').replace(/\.$/, ''),
            type: 'telegram' as const,
            content: extractFirstSentence(msg.text),
            link: `https://t.me/${channel}/${msg.id}`,
            views: msg.views,
            forwards: msg.forwards,
            sourceUrl: urlMatch?.[0],
        };
    });
}

export function extractFirstSentence(text: string): string {
    const cleaned = text.replace(/\n+/g, ' ').trim();
    const match = cleaned.match(/^.+?[.!?]\s/);
    const sentence = match ? match[0].trim() : cleaned;
    return sentence.length > 100 ? sentence.slice(0, 97) + '...' : sentence;
}
