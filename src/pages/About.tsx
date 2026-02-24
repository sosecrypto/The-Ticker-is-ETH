import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Shield, Heart, Sprout } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const About: React.FC = () => {
    const { t } = useTranslation('about');

    return (
        <div className="min-h-screen bg-brand-dark">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="container mx-auto relative z-10 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-semibold tracking-widest text-brand-primary uppercase mb-8"
                        >
                            {t('badge')}
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-tight tracking-tight text-white">
                            Nurturing the <br />
                            Infinite Garden <br />
                            in <span className="text-brand-accent">Korea</span>.
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                            {t('heroDescription')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section - Cleaner Grid */}
            <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
                <div className="container mx-auto">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Sprout className="text-brand-primary" size={24} />
                                {t('whoWeAre')}
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                <Trans
                                    i18nKey="about:whoWeAreDescription"
                                    components={{ bold: <span className="text-white font-medium" /> }}
                                />
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 p-8 rounded-3xl border border-white/10"
                        >
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                <Trans
                                    i18nKey="about:philosophyBox"
                                    components={{ accent: <span className="text-brand-accent font-medium" /> }}
                                />
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section - Minimalist Cards */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('philosophy')}</h2>
                        <div className="h-0.5 w-12 bg-white/20 mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <Minus size={20} />,
                                title: t('subtraction'),
                                subtitle: t('subtractionSubtitle'),
                                color: "text-brand-primary",
                                description: t('subtractionDescription'),
                            },
                            {
                                icon: <Shield size={20} />,
                                title: t('stewardship'),
                                subtitle: t('stewardshipSubtitle'),
                                color: "text-brand-accent",
                                description: t('stewardshipDescription'),
                            },
                            {
                                icon: <Heart size={20} />,
                                title: t('publicGoods'),
                                subtitle: t('publicGoodsSubtitle'),
                                color: "text-pink-500",
                                description: t('publicGoodsDescription'),
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center text-center px-6"
                            >
                                <div className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 ${item.color}`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">{item.subtitle}</span>
                                <p className="text-gray-400 font-light leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Poetic Footer */}
            <section className="py-32 px-6">
                <div className="container mx-auto max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center"
                    >
                        <p className="text-xl md:text-2xl text-gray-500 italic font-light leading-relaxed mb-8">
                            <Trans
                                i18nKey="about:poeticQuote"
                                components={{ seed: <span className="text-white font-medium not-italic" /> }}
                            />
                        </p>
                        <div className="w-1 h-1 rounded-full bg-white/20 mx-auto" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
