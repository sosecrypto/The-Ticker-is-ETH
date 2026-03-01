import { useCallback, useEffect, useRef } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './block-note-dark.css';

interface BlockNoteEditorProps {
    initialMarkdown?: string;
    onChange: (md: string) => void;
}

const DEBOUNCE_MS = 300;

const BlockNoteEditor: React.FC<BlockNoteEditorProps> = ({ initialMarkdown, onChange }) => {
    const editor = useCreateBlockNote({});
    const initialized = useRef(false);
    const debounceTimer = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        if (!initialMarkdown) return;

        let mounted = true;

        async function loadInitialContent() {
            const blocks = await editor.tryParseMarkdownToBlocks(initialMarkdown!);
            if (mounted) {
                editor.replaceBlocks(editor.document, blocks);
            }
        }
        loadInitialContent();

        return () => { mounted = false; };
    }, [editor, initialMarkdown]);

    useEffect(() => {
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, []);

    const handleChange = useCallback(async () => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(async () => {
            const md = await editor.blocksToMarkdownLossy(editor.document);
            onChange(md);
        }, DEBOUNCE_MS);
    }, [editor, onChange]);

    return (
        <div className="bn-container">
            <BlockNoteView
                editor={editor}
                onChange={handleChange}
                theme="dark"
            />
        </div>
    );
};

export default BlockNoteEditor;
