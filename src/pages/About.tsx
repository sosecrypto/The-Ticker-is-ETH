import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Shield, Heart, Sprout } from 'lucide-react';

const About: React.FC = () => {
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
                            Vision & Philosophy
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-tight tracking-tight text-white">
                            Nurturing the <br />
                            Infinite Garden <br />
                            in <span className="text-brand-accent">Korea</span>.
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                            이더리움의 가치를 실천하며, 한국 생태계의 건강한 성장을 위해 씨앗을 심고 정원을 가꾸는 사람들의 이야기입니다.
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
                                Who we are
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                <span className="text-white font-medium">The Ticker is ETH</span>는 이더리움 재단(EF)의 철학에 영감을 받아, 한국 이더리움 생태계의 성장을 돕기 위해 설립된 비영리 단체입니다.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 p-8 rounded-3xl border border-white/10"
                        >
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                우리는 이더리움을 단순히 기술로 보지 않고, 누구나 가꾸고 성장할 수 있는 <span className="text-brand-accent font-medium">무한한 정원(Infinite Garden)</span>으로 바라봅니다. 우리는 정원사의 마음으로 생태계를 보살피고 영양분을 공급합니다.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section - Minimalist Cards */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Philosophy</h2>
                        <div className="h-0.5 w-12 bg-white/20 mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <Minus size={20} />,
                                title: "Subtraction",
                                subtitle: "뺄셈의 철학",
                                color: "text-brand-primary",
                                description: "권력을 독점하기보다 생태계로 분산시킵니다. 커뮤니티가 스스로 가치를 창출할 수 있도록 지원하며, 우리가 없어도 번영할 수 있는 환경을 만듭니다."
                            },
                            {
                                icon: <Shield size={20} />,
                                title: "Stewardship",
                                subtitle: "가치의 수호",
                                color: "text-brand-accent",
                                description: "탈중앙화와 개방성이라는 이더리움의 영혼을 지키는 청지기 역할을 수행합니다. 단기적 이익보다 장기적인 지속 가능성을 우선시합니다."
                            },
                            {
                                icon: <Heart size={20} />,
                                title: "Public Goods",
                                subtitle: "공공재를 위한 지원",
                                color: "text-pink-500",
                                description: "우리는 보조금과 기부만으로 운영됩니다. 자체 토큰도, 숨겨진 의도도 없습니다. 오직 공공재를 위한 순수한 지원만이 우리의 원동력입니다."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
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
                            "수십 년 뒤에도 울창할 이더리움의 숲을 위해 <br />
                            우리는 <span className="text-white font-medium not-italic">작은 씨앗</span>을 심습니다."
                        </p>
                        <div className="w-1 h-1 rounded-full bg-white/20 mx-auto" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
