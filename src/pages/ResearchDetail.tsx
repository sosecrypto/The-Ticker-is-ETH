import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { mockResearch, loadResearchContent } from '../data/researchData';
import { getAvatarFallbackUrl } from '../utils/members';

const ResearchDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState<string>('');

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
                    <h1 className="text-4xl font-bold mb-4">Post not found</h1>
                    <Link to="/research" className="text-brand-primary hover:underline">Back to Research</Link>
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
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1B2838] via-[#1a2744] to-[#0e1621] flex items-center justify-center">
                        <svg viewBox="0 0 240 240" className="w-32 h-32 opacity-20">
                            <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0zm55.6 82.1L155.2 174c-2.6 11.7-9.4 14.6-19 9.1l-26.4-19.4-12.7 12.2c-1.4 1.4-2.6 2.6-5.3 2.6l1.9-26.7 48.8-44.1c2.1-1.9-.5-2.9-3.3-1.1l-60.3 38-26-8.1c-5.6-1.8-5.8-5.6 1.2-8.4l101.7-39.2c4.7-1.7 8.8 1.1 7.3 8.2z" fill="#26A5E4"/>
                        </svg>
                    </div>
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
                                Back to Research
                            </Link>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-brand-primary/20 backdrop-blur-md border border-white/10 text-xs font-bold text-brand-primary uppercase">
                                    {post.category}
                                </span>
                                <span className="text-gray-400 text-sm">{post.readTime} read</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={post.authorAvatar}
                                        alt={post.author}
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

                    <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
                                <Share2 size={18} />
                                Share
                            </button>
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
