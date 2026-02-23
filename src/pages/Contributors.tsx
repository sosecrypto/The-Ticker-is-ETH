import React, { useState, useMemo } from 'react';
import MemberCard from '../components/team/MemberCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, ChevronDown } from 'lucide-react';
import { mockContributors } from '../data/mockData';
import { sortMembers } from '../utils/members';

type SortOption = 'contributions' | 'seniority';

const Contributors: React.FC = () => {
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('contributions');

    const categories = useMemo(() => {
        const cats = mockContributors.map(c => c.category);
        return ['all', ...Array.from(new Set(cats))];
    }, []);

    const filteredContributors = useMemo(() => {
        const filtered = mockContributors.filter(member => {
            const matchesFilter = filter === 'all' || member.category === filter;
            const matchesSearch =
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
        return sortMembers(filtered, sortBy);
    }, [filter, searchQuery, sortBy]);

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-brand-primary mb-4">
                    Community
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-accent">
                    Contributors
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                    The heart of our ecosystem. Every contribution from research to translation helps the garden grow.
                </p>
            </motion.div>

            <div className="space-y-8 mb-16">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    {/* Search */}
                    <div className="relative w-full md:w-[28rem] group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search contributors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-14 pr-6 text-white text-base focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all font-light"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative w-full md:w-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="appearance-none w-full md:w-56 bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-6 pr-12 text-white font-light focus:outline-none focus:border-brand-accent/50 transition-all shadow-xl cursor-pointer text-sm"
                        >
                            <option value="contributions" className="bg-brand-dark">Most Contributions</option>
                            <option value="seniority" className="bg-brand-dark">Seniority (Oldest First)</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredContributors.map((c) => (
                        <MemberCard key={c.id} member={c} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredContributors.length === 0 && (
                <div className="text-center py-20">
                    <Users className="mx-auto text-gray-700 mb-4" size={48} />
                    <p className="text-gray-500 text-lg italic font-light tracking-tight">No contributors found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Contributors;
