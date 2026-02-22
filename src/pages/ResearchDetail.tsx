import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { mockResearch } from '../data/researchData';

const ResearchDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const post = useMemo(() => {
        return mockResearch.find(p => p.id === id);
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
                    <div className="w-full h-full bg-gradient-to-br from-[#6B3FA0] via-[#3C4CA8] to-[#8B5CF6]" />
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
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <User size={20} className="text-brand-primary" />
                                    </div>
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
                        <ReactMarkdown>{post.content}</ReactMarkdown>
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
