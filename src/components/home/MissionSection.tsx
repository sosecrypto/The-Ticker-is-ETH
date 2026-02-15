import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sprout, Heart } from 'lucide-react';

const MissionSection: React.FC = () => {
    const values = [
        {
            icon: <Shield className="text-brand-accent" size={24} />,
            title: "Subtraction",
            description: "권력을 독점하기보다 생태계로 분산시키며, 커뮤니티가 스스로 번영할 수 있는 환경을 만듭니다."
        },
        {
            icon: <Heart className="text-pink-400" size={24} />,
            title: "Public Goods",
            description: "보조금과 기부만으로 운영되는 순수한 지원. 오직 공공재의 가치를 위해 존재합니다."
        },
        {
            icon: <Sprout className="text-brand-primary" size={24} />,
            title: "Infinite Garden",
            description: "정원사의 마음으로 한국 이더리움 생태계를 돌보고 성장을 돕는 무한한 정원을 가꿉니다."
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
                        Our Mission
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-bold mb-8 leading-tight"
                    >
                        Nurturing the <span className="text-white">Infinite Garden</span> <br /> in <span className="text-brand-accent">Korea</span>.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl leading-relaxed"
                    >
                        The Ticker is ETH는 이더리움 재단의 철학에 영감을 받아, 정원사의 마음으로 <br className="hidden md:block" /> 한국 이더리움 생태계의 성장을 돕는 비영리 단체입니다.
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
                            className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-brand-primary/30 transition-all group"
                        >
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {v.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{v.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm font-light">
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
