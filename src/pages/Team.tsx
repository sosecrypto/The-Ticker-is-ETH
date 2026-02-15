import React, { useState, useMemo } from 'react';
import MemberCard from '../components/team/MemberCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { mockMembers } from '../data/mockData';

const Team: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const currentMembers = useMemo(() => {
        return mockMembers.filter(member =>
            member.isCurrent && (
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery]);

    const alumniMembers = useMemo(() => {
        return mockMembers.filter(member =>
            !member.isCurrent && (
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery]);

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

            <div className="flex justify-center mb-16">
                {/* Search - Primary Interaction */}
                <div className="relative w-full md:w-[28rem] group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="누구를 찾으시나요?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-4 pl-14 pr-6 text-white text-lg focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all font-light placeholder:text-gray-600 shadow-2xl"
                    />
                </div>
            </div>

            <div className="space-y-24">
                {/* Current Team Section */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-2xl font-bold text-white">Current Members</h2>
                        <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    {currentMembers.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {currentMembers.map((member) => (
                                    <MemberCard key={member.id} member={member} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white/2 rounded-3xl border border-dashed border-white/5">
                            <p className="text-gray-500 italic">No active members found.</p>
                        </div>
                    )}
                </section>

                {/* Alumni Section */}
                {alumniMembers.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-2xl font-bold text-white/60">Alumni Members</h2>
                            <div className="h-px flex-grow bg-gradient-to-r from-white/5 to-transparent" />
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                            <AnimatePresence mode="popLayout">
                                {alumniMembers.map((member) => (
                                    <MemberCard key={member.id} member={member} />
                                ))}
                            </AnimatePresence>
                        </div>
                    </section>
                )}

                {currentMembers.length === 0 && alumniMembers.length === 0 && (
                    <div className="text-center py-20">
                        <Users className="mx-auto text-gray-700 mb-4" size={48} />
                        <p className="text-gray-500 text-lg italic tracking-tight font-light">
                            검색 결과가 없습니다. 다시 검색해 주세요.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Team;
