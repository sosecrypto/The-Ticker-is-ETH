import React from 'react';

const ETH_DIAMOND = "M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z@@0.6|M127.962 0L0 212.32l127.962 75.639V154.158z@@0.45|M127.961 312.187l-1.575 1.92v98.199l1.575 4.601L256 236.587z@@0.6|M127.962 416.905v-104.72L0 236.585z@@0.45|M127.961 287.958l127.96-75.637-127.96-58.162z@@0.8|M.001 212.321l127.96 75.637V154.159z@@0.45";

const Diamond: React.FC<{ className?: string; fill?: string }> = ({ className = '', fill = 'currentColor' }) => (
    <svg viewBox="0 0 256 417" className={className} fill={fill}>
        {ETH_DIAMOND.split('|').map((segment, i) => {
            const [d, opacity] = segment.split('@@');
            return <path key={i} d={d} opacity={opacity} />;
        })}
    </svg>
);

const VARIANTS: Array<{
    gradient: string;
    render: () => React.ReactNode;
}> = [
    {
        gradient: 'from-[#1a1040] via-[#1a2050] to-[#0e1621]',
        render: () => (
            <Diamond className="w-12 h-20 opacity-20" fill="#A086FC" />
        ),
    },
    {
        gradient: 'from-[#0e1a2e] via-[#162040] to-[#0a1020]',
        render: () => (
            <div className="relative">
                <Diamond className="w-20 h-32 opacity-10 absolute -right-4 -top-8" fill="#3C4CA8" />
                <Diamond className="w-8 h-14 opacity-25" fill="#A086FC" />
            </div>
        ),
    },
    {
        gradient: 'from-[#1B2838] via-[#1e2a4a] to-[#12182a]',
        render: () => (
            <div className="relative w-full h-full flex items-center justify-center">
                <Diamond className="w-24 h-40 opacity-[0.06] absolute" fill="#A086FC" />
                <Diamond className="w-10 h-16 opacity-25" fill="#7B6BDB" />
            </div>
        ),
    },
    {
        gradient: 'from-[#14102a] via-[#1a1840] to-[#0c0e1e]',
        render: () => (
            <div className="flex items-center gap-3">
                <Diamond className="w-6 h-10 opacity-15" fill="#3C4CA8" />
                <Diamond className="w-10 h-16 opacity-25" fill="#A086FC" />
                <Diamond className="w-6 h-10 opacity-15" fill="#3C4CA8" />
            </div>
        ),
    },
    {
        gradient: 'from-[#0f1628] via-[#1a2248] to-[#0a0f1e]',
        render: () => (
            <div className="relative">
                <div className="w-20 h-20 rounded-full border border-white/[0.06] absolute -translate-x-1/2 -translate-y-1/2" />
                <Diamond className="w-10 h-16 opacity-25" fill="#A086FC" />
            </div>
        ),
    },
];

function hashId(id: string): number {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

interface EthThumbnailProps {
    articleId: string;
    className?: string;
}

const EthThumbnail: React.FC<EthThumbnailProps> = ({ articleId, className = '' }) => {
    const variant = VARIANTS[hashId(articleId) % VARIANTS.length];

    return (
        <div className={`w-full h-full bg-gradient-to-br ${variant.gradient} flex items-center justify-center ${className}`}>
            {variant.render()}
        </div>
    );
};

export default EthThumbnail;
