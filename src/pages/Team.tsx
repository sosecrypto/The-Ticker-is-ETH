import React, { useState } from 'react';
import MemberCard from '../components/team/MemberCard';
import { motion } from 'framer-motion';

import { mockMembers } from '../data/mockData';

const Team: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'current' | 'past'>('all');

    const filteredMembers = mockMembers.filter(member => {
        if (filter === 'current') return member.isCurrent;
        if (filter === 'past') return !member.isCurrent;
        return true;
    });

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-accent">
                    Core Team
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Meet the dedicated individuals working to bringing Ethereum closer to Korea.
                </p>
            </motion.div>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-4 mb-12">
                {[
                    { id: 'all', label: 'All Members' },
                    { id: 'current', label: 'Current' },
                    { id: 'past', label: 'Alumni' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id as any)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === tab.id
                            ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
};

export default Team;
