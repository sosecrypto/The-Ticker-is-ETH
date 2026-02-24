import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockResearch } from '../../data/researchData';

const latestUpdates = mockResearch.slice(0, 3);

const UpdatesSection: React.FC = () => {
    const { t } = useTranslation('home');
    return (
        <section className="py-24 bg-brand-dark/50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-2 block"
                        >
                            {t('updates.badge')}
                        </motion.span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{t('updates.title')}</h2>
                    </div>
                    <Link to="/research" className="flex items-center gap-2 text-brand-primary hover:text-brand-accent transition-colors font-semibold group">
                        {t('updates.viewAll')} <ArrowUpRight size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {latestUpdates.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-brand-primary/50 transition-all hover:-translate-y-2"
                        >
                            <Link to={`/research/${item.id}`} className="block h-48 relative overflow-hidden">
                                {item.thumbnailUrl ? (
                                    <img
                                        src={item.thumbnailUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#1B2838] via-[#1a2744] to-[#0e1621] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 flex items-center justify-center">
                                        <svg viewBox="0 0 240 240" className="w-16 h-16 opacity-30">
                                            <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0zm55.6 82.1L155.2 174c-2.6 11.7-9.4 14.6-19 9.1l-26.4-19.4-12.7 12.2c-1.4 1.4-2.6 2.6-5.3 2.6l1.9-26.7 48.8-44.1c2.1-1.9-.5-2.9-3.3-1.1l-60.3 38-26-8.1c-5.6-1.8-5.8-5.6 1.2-8.4l101.7-39.2c4.7-1.7 8.8 1.1 7.3 8.2z" fill="#26A5E4"/>
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brand-primary/80 backdrop-blur-md text-[10px] font-bold text-white px-3 py-1 rounded-full uppercase tracking-widest">
                                        {item.category}
                                    </span>
                                </div>
                            </Link>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                                    <Calendar size={14} />
                                    {item.date}
                                </div>
                                <Link to={`/research/${item.id}`}>
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                </Link>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                    {item.summary}
                                </p>
                                <Link to={`/research/${item.id}`} className="text-sm font-bold text-white flex items-center gap-2 group/btn">
                                    {t('updates.readArticle')} <ArrowUpRight size={16} className="text-brand-primary group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpdatesSection;
