import type { ResearchItem } from '../types/research';
import type { TelegramData } from '../types/team';
import { formatDate } from '../utils/telegram';
import telegramData from './telegram-contributors.json';

function formatTelegramToMarkdown(text: string): string {
    return text
        .replace(/(?<!\[|\()(https?:\/\/[^\s),\]]+)/g, '[$1]($1)')
        .replace(/\n{1,}/g, '\n\n');
}

function getAvatarUrl(name: string): string {
    const normalized = name.toLowerCase();
    return `/assets/team/${normalized}.jpg`;
}

function contributorMessagesToResearch(): ResearchItem[] {
    const data = telegramData as TelegramData;
    const items: ResearchItem[] = [];

    for (const contributor of data.contributors) {
        const avatar = getAvatarUrl(contributor.name);

        for (const msg of contributor.messages) {
            if (msg.text.length < 200) continue;

            const text = msg.text;
            const tagMatch = text.match(/^\[([^\]]+)\]/);
            const title = tagMatch
                ? tagMatch[1]
                : text.split('\n')[0].slice(0, 80).replace(/\s+$/, '');
            const readTime = `${Math.max(1, Math.round(text.length / 500))} min`;
            const date = formatDate(msg.date);

            items.push({
                id: `tg-${msg.id}`,
                title,
                author: contributor.name,
                authorId: '',
                authorAvatar: avatar,
                date,
                category: 'Telegram' as const,
                summary: text.slice(0, 200).replace(/\n+/g, ' ').trim(),
                content: formatTelegramToMarkdown(text),
                thumbnailUrl: '',
                readTime,
            });
        }
    }

    return items.sort((a, b) => b.date.localeCompare(a.date));
}

export const mockResearch: ResearchItem[] = contributorMessagesToResearch();
