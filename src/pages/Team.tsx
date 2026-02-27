import React, { useState, useMemo } from 'react';
import MemberCard from '../components/team/MemberCard';
import AnimatedNumber from '../components/common/AnimatedNumber';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockMembers } from '../data/mockData';
import { sortMembers, getTotalContributions } from '../utils/members';
import usePageMeta from '../hooks/usePageMeta';

type SortOption = 'contributions' | 'seniority';

const Team: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('contributions');
    const { t } = useTranslation('team');
    usePageMeta({ title: 'Core Team', description: 'The Ticker is ETH 코어팀 멤버' });

    const currentMembers = useMemo(() => {
        const filtered = mockMembers.filter(member =>
            member.isCurrent && (
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        return sortMembers(filtered, sortBy);
    }, [searchQuery, sortBy]);

    const stats = useMemo(() => {
        const memberCount = mockMembers.length;
        const totalContributions = mockMembers.reduce((sum, m) => sum + getTotalContributions(m.contributions), 0);
        const earliest = mockMembers.reduce((min, m) => {
            const start = new Date(m.period.split(' - ')[0].replace(/\./g, '-')).getTime();
            return start < min ? start : min;
        }, Infinity);
        const days = Math.floor((Date.now() - earliest) / 86400000);
        return { memberCount, totalContributions, days };
    }, []);

    const alumniMembers = useMemo(() => {
        const filtered = mockMembers.filter(member =>
            !member.isCurrent && (
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        return sortMembers(filtered, sortBy);
    }, [searchQuery, sortBy]);

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-brand-primary mb-4">
                    {t('badge')}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-accent">
                    {t('title')}
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    {t('description')}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16"
            >
                {[
                    { label: t('stats.members'), value: stats.memberCount },
                    { label: t('stats.contributions'), value: stats.totalContributions },
                    { label: t('stats.days'), value: stats.days },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm"
                    >
                        <AnimatedNumber value={stat.value} className="text-3xl font-bold text-brand-accent" />
                        <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16">
                {/* Search */}
                <div className="relative w-full md:w-[28rem] group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder={t('common:search.placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-lg focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all font-light placeholder:text-gray-600 shadow-2xl"
                    />
                </div>

                {/* Sort Dropdown */}
                <div className="relative w-full md:w-auto">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="appearance-none w-full md:w-56 bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-12 text-white font-light focus:outline-none focus:border-brand-accent/50 transition-all shadow-xl cursor-pointer"
                    >
                        <option value="contributions" className="bg-brand-dark">{t('common:sort.contributions')}</option>
                        <option value="seniority" className="bg-brand-dark">{t('common:sort.seniority')}</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                </div>
            </div>

            <div className="space-y-24">
                {/* Current Team Section */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-2xl font-bold text-white">{t('sections.current')}</h2>
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
                        <div className="text-center py-10 bg-white/5 rounded-3xl border border-dashed border-white/10">
                            <p className="text-gray-500 italic">{t('sections.noActive')}</p>
                        </div>
                    )}
                </section>

                {/* Alumni Section */}
                {alumniMembers.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-2xl font-bold text-white/60">{t('sections.alumni')}</h2>
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
                            {t('common:noResults')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Team;
