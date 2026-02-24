import React from 'react';
import Hero from '../components/home/Hero';
import MissionSection from '../components/home/MissionSection';
import UpdatesSection from '../components/home/UpdatesSection';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
    const { t } = useTranslation('home');
    return (
        <div className="bg-brand-dark">
            <Hero />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <MissionSection />
                <UpdatesSection />

                {/* CTA Section */}
                <section className="py-24 px-6">
                    <div className="container mx-auto max-w-5xl">
                        <div className="bg-gradient-to-br from-brand-primary to-brand-accent rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                                    {t('cta.title')}
                                </h2>
                                <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                                    {t('cta.description')}
                                </p>
                                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                                    <button className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105">
                                        {t('cta.contributor')}
                                    </button>
                                    <button className="px-10 py-5 bg-black/20 text-white font-bold rounded-full border border-white/20 hover:bg-black/30 transition-all backdrop-blur-md">
                                        {t('cta.github')}
                                    </button>
                                </div>
                            </div>

                            {/* Decorative orbs */}
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-dark/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>
                </section>
            </motion.div>
        </div>
    );
};

export default Home;
