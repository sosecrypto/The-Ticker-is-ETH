import React, { useState, useMemo } from 'react';
import MemberCard from '../components/team/MemberCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { mockMembers } from '../data/mockData';

const Team: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'current' | 'past'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMembers = useMemo(() => {
        return mockMembers.filter(member => {
            const matchesFilter =
                filter === 'all' ? true :
                    filter === 'current' ? member.isCurrent : !member.isCurrent;

            const matchesSearch =
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesFilter && matchesSearch;
        });
    }, [filter, searchQuery]);

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-brand-primary mb-4">
                    The Guardians
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-accent">
                    Core Team
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Meet the dedicated individuals working to bringing Ethereum closer to Korea with the spirit of the Infinite Garden.
                </p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                {/* Filter Tabs */}
                <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
                    {[
                        { id: 'all', label: 'All' },
                        { id: 'current', label: 'Current' },
                        { id: 'past', label: 'Alumni' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id as any)}
                            className={`px-8 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === tab.id
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search team members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all font-light"
                    />
                </div>
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredMembers.map((member) => (
                        <MemberCard key={member.id} member={member} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredMembers.length === 0 && (
                <div className="text-center py-20">
                    <Users className="mx-auto text-gray-700 mb-4" size={48} />
                    <p className="text-gray-500 text-lg italic tracking-tight">No team members found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Team;
