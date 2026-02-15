import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Heart } from 'lucide-react';

const MissionSection: React.FC = () => {
    const values = [
        {
            icon: <Shield className="text-brand-accent" />,
            title: "Neutrality",
            description: "No tokens, no bias. 객관적인 연구와 뉴스를 공공재로서 제공하는 중립적 연구 집단입니다."
        },
        {
            icon: <Zap className="text-brand-primary" />,
            title: "Stewardship",
            description: "탈중앙화와 개방성이라는 이더리움의 영혼을 한국 생태계에서 지켜나가는 청지기입니다."
        },
        {
            icon: <Heart className="text-pink-400" />,
            title: "Infinite Garden",
            description: "한국의 빌더와 연구자들이 함께 가꾸고 성장할 수 있는 무한한 정원을 만들어갑니다."
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-brand-dark">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        Our Core Purpose
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-bold mb-8 leading-tight"
                    >
                        Expanding the <span className="text-white">Ethereum Frontier</span> in South Korea.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl leading-relaxed"
                    >
                        "The Ticker is ETH" is a non-profit collective dedicated to dismantling language and information barriers, fostering a globally connected Ethereum community in Korea.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-brand-primary/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {v.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{v.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {v.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px]" />
        </section>
    );
};

export default MissionSection;
