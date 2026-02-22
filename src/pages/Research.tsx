import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Clock, User, ArrowRight, PenSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockResearch } from '../data/mockData';

const Research: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [isAdmin, setIsAdmin] = useState(false);

    React.useEffect(() => {
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    }, []);

    const categories = ['all', 'Technical', 'Economic', 'Social', 'Governance', 'Telegram'];

    const filteredResearch = useMemo(() => {
        return mockResearch.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.author.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto text-white">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-brand-primary mb-4">
                        Insights
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-accent">
                        Research
                    </h1>
                    <p className="text-gray-400 max-w-xl text-lg font-light leading-relaxed">
                        이더리움 생태계의 기술적, 경제적, 사회적 발전을 심도 있게 탐구합니다.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    {isAdmin && (
                        <Link
                            to="/research/write"
                            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/80 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-brand-primary/20"
                        >
                            <PenSquare size={20} />
                            Write Research
                        </Link>
                    )}
                </motion.div>
            </div>

            <div className="space-y-8 mb-16">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-[28rem] group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="누구를 찾으시나요?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-lg focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all font-light placeholder:text-gray-600 shadow-2xl"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredResearch.map((item) => (
                        <motion.article
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-brand-primary/50 transition-all duration-500 flex flex-col"
                        >
                            <Link to={`/research/${item.id}`} className="block relative aspect-video overflow-hidden">
                                {item.thumbnailUrl ? (
                                    <img
                                        src={item.thumbnailUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#6B3FA0] via-[#3C4CA8] to-[#8B5CF6] transition-transform duration-700 group-hover:scale-110" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-brand-primary/20 backdrop-blur-md border border-white/10 text-xs font-bold text-brand-primary uppercase">
                                        {item.category}
                                    </span>
                                </div>
                            </Link>

                            <div className="p-8 flex-grow flex flex-col">
                                <Link to={`/research/${item.id}`}>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-accent transition-colors line-clamp-2 leading-snug">
                                        {item.title}
                                    </h3>
                                </Link>
                                <p className="text-gray-400 font-light text-base mb-6 line-clamp-3 leading-relaxed">
                                    {item.summary}
                                </p>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <User size={14} />
                                            <span>{item.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <Clock size={14} />
                                            <span>{item.readTime}</span>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/research/${item.id}`}
                                        className="text-brand-primary hover:text-white transition-colors p-2"
                                    >
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </div>

            {filteredResearch.length === 0 && (
                <div className="text-center py-32 rounded-[3rem] bg-white/[0.02] border border-dashed border-white/10">
                    <BookOpen className="mx-auto text-gray-700 mb-6" size={64} />
                    <p className="text-gray-500 text-xl font-light italic">
                        검색 결과가 없습니다. 다시 검색해 주시겠어요?
                    </p>
                </div>
            )}
        </div>
    );
};

export default Research;
