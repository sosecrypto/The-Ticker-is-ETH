import React, { type RefObject } from 'react';
import {
    Heading2,
    Heading3,
    Bold,
    Italic,
    Link,
    Image,
    List,
    ListOrdered,
    Quote,
    Code,
    FileCode,
    Minus,
    type LucideIcon,
} from 'lucide-react';

interface MarkdownToolbarProps {
    textareaRef: RefObject<HTMLTextAreaElement | null>;
    value: string;
    onChange: (value: string) => void;
}

type InsertAction =
    | { type: 'wrap'; before: string; after: string }
    | { type: 'prefix'; prefix: string }
    | { type: 'block'; block: string };

const TOOLBAR_ITEMS: { icon: LucideIcon; label: string; action: InsertAction }[] = [
    { icon: Heading2, label: 'H2', action: { type: 'prefix', prefix: '## ' } },
    { icon: Heading3, label: 'H3', action: { type: 'prefix', prefix: '### ' } },
    { icon: Bold, label: 'Bold', action: { type: 'wrap', before: '**', after: '**' } },
    { icon: Italic, label: 'Italic', action: { type: 'wrap', before: '*', after: '*' } },
    { icon: Link, label: 'Link', action: { type: 'wrap', before: '[', after: '](url)' } },
    { icon: Image, label: 'Image', action: { type: 'wrap', before: '![', after: '](url)' } },
    { icon: List, label: 'Bullet', action: { type: 'prefix', prefix: '- ' } },
    { icon: ListOrdered, label: 'Numbered', action: { type: 'prefix', prefix: '1. ' } },
    { icon: Quote, label: 'Quote', action: { type: 'prefix', prefix: '> ' } },
    { icon: Code, label: 'Code', action: { type: 'wrap', before: '`', after: '`' } },
    { icon: FileCode, label: 'Code Block', action: { type: 'block', block: '```\n' } },
    { icon: Minus, label: 'Divider', action: { type: 'block', block: '\n---\n' } },
];

function applyAction(
    textarea: HTMLTextAreaElement,
    value: string,
    action: InsertAction,
): { newValue: string; cursorPos: number } {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);

    switch (action.type) {
        case 'wrap': {
            const inserted = `${action.before}${selected || 'text'}${action.after}`;
            return {
                newValue: value.slice(0, start) + inserted + value.slice(end),
                cursorPos: selected
                    ? start + inserted.length
                    : start + action.before.length,
            };
        }
        case 'prefix': {
            const inserted = `${action.prefix}${selected || 'text'}`;
            return {
                newValue: value.slice(0, start) + inserted + value.slice(end),
                cursorPos: selected
                    ? start + inserted.length
                    : start + action.prefix.length,
            };
        }
        case 'block': {
            if (action.block === '\n---\n') {
                const inserted = action.block;
                return {
                    newValue: value.slice(0, start) + inserted + value.slice(end),
                    cursorPos: start + inserted.length,
                };
            }
            const fence = '```';
            const inserted = `${fence}\n${selected || 'code'}\n${fence}`;
            return {
                newValue: value.slice(0, start) + inserted + value.slice(end),
                cursorPos: selected
                    ? start + inserted.length
                    : start + fence.length + 1,
            };
        }
    }
}

const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ textareaRef, value, onChange }) => {
    const handleClick = (action: InsertAction) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const { newValue, cursorPos } = applyAction(textarea, value, action);
        onChange(newValue);

        requestAnimationFrame(() => {
            textarea.focus();
            textarea.setSelectionRange(cursorPos, cursorPos);
        });
    };

    return (
        <div className="flex flex-wrap gap-1 p-2 bg-white/5 border border-white/10 rounded-xl">
            {TOOLBAR_ITEMS.map(({ icon: Icon, label, action }) => (
                <button
                    key={label}
                    type="button"
                    title={label}
                    onClick={() => handleClick(action)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <Icon size={18} />
                </button>
            ))}
        </div>
    );
};

export default MarkdownToolbar;
