import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Code, PenTool, BookOpen, Users } from 'lucide-react';

// Enhanced Mock Data
const contributors = [
    { id: '1', name: 'Dave', role: 'Translation', category: 'Translation', period: '2023 - Present', isCurrent: true },
    { id: '2', name: 'Eve', role: 'UI Design', category: 'Design', period: '2023 - Present', isCurrent: true },
    { id: '3', name: 'Frank', role: 'Security Research', category: 'Research', period: '2022 - 2023', isCurrent: false },
    { id: '4', name: 'Grace', role: 'Frontend Dev', category: 'Development', period: '2022 - Present', isCurrent: true },
    { id: '5', name: 'Heidi', role: 'Community Manager', category: 'Community', period: '2021 - Present', isCurrent: true },
    { id: '6', name: 'Ivan', role: 'News Translation', category: 'Translation', period: '2021 - 2022', isCurrent: false },
    { id: '7', name: 'Jin', role: 'Contract Dev', category: 'Development', period: '2023', isCurrent: true },
    { id: '8', name: 'Ken', role: 'Content Writing', category: 'Community', period: '2022 - 2023', isCurrent: false },
    { id: '9', name: 'Luna', role: 'Protocol Research', category: 'Research', period: '2023 - Present', isCurrent: true },
    { id: '10', name: 'Minsu', role: 'Visual Design', category: 'Design', period: '2022 - Present', isCurrent: true },
];

const categories = [
    { id: 'all', label: 'All', icon: <Users size={16} /> },
    { id: 'Research', label: 'Research', icon: <BookOpen size={16} /> },
    { id: 'Development', label: 'Dev', icon: <Code size={16} /> },
    { id: 'Translation', label: 'Translation', icon: <Globe size={16} /> },
    { id: 'Design', label: 'Design', icon: <PenTool size={16} /> },
    { id: 'Community', label: 'Community', icon: <Users size={16} /> },
];

const Contributors: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredContributors = useMemo(() => {
        return contributors.filter(c => {
            const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
            const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.role.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-brand-accent mb-4">
                    Community Power
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                    Contributors
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Our mission is powered by dozens of passionate individuals who donate their time and expertise as public goods.
                </p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                {/* Category Filters */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 border border-white/5 bg-white/3 p-1 rounded-2xl backdrop-blur-md">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeCategory === cat.id
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all"
                    />
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredContributors.map((c) => (
                        <motion.div
                            key={c.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`relative bg-white/5 border border-white/10 rounded-3xl p-6 text-center group overflow-hidden transition-all hover:bg-white/10 hover:border-brand-accent/30 ${!c.isCurrent ? 'grayscale opacity-60' : ''}`}
                        >
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/10 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-brand-accent/15 transition-colors" />

                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                    <span className="text-xl font-bold text-white uppercase">{c.name.charAt(0)}</span>
                                </div>

                                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-brand-accent transition-colors">{c.name}</h3>
                                <p className="text-sm text-brand-primary font-medium mb-3">{c.role}</p>

                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">{c.period}</span>
                                    <div className={`mt-2 h-1 w-8 rounded-full ${c.isCurrent ? 'bg-green-500/50' : 'bg-gray-700'}`} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredContributors.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg italic">No contributors found matching your criteria.</p>
                </div>
            )}

            {/* Past Contributors Legend */}
            <div className="mt-24 border-t border-white/5 pt-16 text-center">
                <h2 className="text-2xl font-bold text-white mb-6">Historical Archives</h2>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-gray-400 text-sm max-w-3xl mx-auto">
                    {['Old Member 1', 'Explorer A', 'Researcher B', 'Dev X', 'Early Contributor'].map(name => (
                        <span key={name} className="hover:text-white transition-colors cursor-default">{name}</span>
                    ))}
                    <span className="text-gray-600 italic">...and many more who shaped the foundation.</span>
                </div>
            </div>
        </div>
    );
};

export default Contributors;
