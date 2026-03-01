import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, Trash2, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { mockResearch, loadResearchContent } from '../data/researchData';
import { getAvatarFallbackUrl } from '../utils/members';
import EthThumbnail from '../components/shared/EthThumbnail';

const ResearchDetail: React.FC = () => {
    const { t } = useTranslation('research');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const handleDelete = async () => {
        if (!window.confirm(t('detail.deleteConfirm'))) return;

        const password = sessionStorage.getItem('publishKey');
        if (!password) {
            navigate('/admin');
            return;
        }

        setIsDeleting(true);
        setDeleteError('');

        try {
            const res = await fetch('/api/research/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, id }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Delete failed');
            }

            navigate('/research');
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : t('detail.deleteError'));
        } finally {
            setIsDeleting(false);
        }
    };

    const post = useMemo(() => {
        return mockResearch.find(p => p.id === id);
    }, [id]);

    useEffect(() => {
        if (!id) return;
        loadResearchContent(id).then(c => setContent(c ?? ''));
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">{t('detail.notFound')}</h1>
                    <Link to="/research" className="text-brand-primary hover:underline">{t('detail.backToResearch')}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-dark pb-20 overflow-x-hidden">
            {/* Hero Header */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                {post.thumbnailUrl ? (
                    <img
                        src={post.thumbnailUrl}
                        alt={post.title}
                        decoding="async"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <EthThumbnail articleId={post.id} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="container mx-auto px-6 pb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <Link
                                to="/research"
                                className="inline-flex items-center gap-2 text-brand-primary mb-6 hover:text-white transition-colors group"
                            >
                                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                                {t('detail.backToResearch')}
                            </Link>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-brand-primary/20 backdrop-blur-md border border-white/10 text-xs font-bold text-brand-primary uppercase">
                                    {post.category}
                                </span>
                                {'forwardedFrom' in post && post.forwardedFrom && (
                                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-gray-300">
                                        via {post.forwardedFrom === 'Unknown' ? t('forwardedFromUnknown') : post.forwardedFrom}
                                    </span>
                                )}
                                <span className="text-gray-400 text-sm">{post.readTime} {t('detail.read')}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={post.authorAvatar}
                                        alt={post.author}
                                        decoding="async"
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-white/10"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = getAvatarFallbackUrl(post.author, 40);
                                        }}
                                    />
                                    <span className="font-medium">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-6 mt-12">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-invert prose-brand lg:prose-xl max-w-none"
                    >
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </motion.div>

                    {deleteError && (
                        <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {deleteError}
                        </div>
                    )}

                    <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
                                <Share2 size={18} />
                                {t('detail.share')}
                            </button>
                            {isAdmin && (
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                    {isDeleting ? t('detail.deleting') : t('detail.delete')}
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            ID: {post.id}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResearchDetail;
