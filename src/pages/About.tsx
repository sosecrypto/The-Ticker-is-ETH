import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Shield, Heart, Sprout } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-dark overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="container mx-auto relative z-10">
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
                            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-brand-primary mb-6"
                        >
                            Vision & Philosophy
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-white">
                            Nurturing the <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40 italic font-serif">Infinite Garden</span> <br />
                            in <span className="text-brand-accent">Korea</span>.
                        </h1>
                    </motion.div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            </section>

            {/* Mission Statement */}
            <section className="py-20 px-6 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Sprout className="text-brand-primary" size={32} />
                                Who we are
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed font-light">
                                <span className="text-white font-medium">The Ticker is ETH</span>는 이더리움 재단(EF)의 철학에 영감을 받아, 한국 이더리움 생태계의 성장을 돕기 위해 설립된 비영리 단체입니다.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-md"
                        >
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                우리는 이더리움을 단순히 기술로 보지 않고, 누구나 가꾸고 성장할 수 있는 <span className="text-brand-accent font-medium">무한한 정원(Infinite Garden)</span>으로 바라봅니다. 언어의 장벽과 파편화된 정보가 커뮤니티의 성장을 가로막지 않도록, 우리는 <span className="text-white font-medium">정원사(Gardener)</span>의 마음으로 한국 생태계를 보살피고 영양분을 공급합니다.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Philosophy Grid */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Philosophy</h2>
                        <div className="h-1 w-20 bg-brand-primary rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Minus size={24} />,
                                title: "Subtraction",
                                subtitle: "뺄셈의 철학",
                                color: "brand-primary",
                                description: "우리는 권력을 독점하기보다 생태계로 분산시키는 것을 지향합니다. 직접 경쟁하기보다는 커뮤니티가 스스로 가치를 창출할 수 있도록 지원하며, 우리가 없어도 이더리움이 번영할 수 있는 환경을 만듭니다."
                            },
                            {
                                icon: <Shield size={24} />,
                                title: "Stewardship",
                                subtitle: "가치의 수호",
                                color: "brand-accent",
                                description: "탈중앙화, 개방성, 무허가성이라는 이더리움의 영혼(Soul)을 지키는 청지기 역할을 수행합니다. 단기적인 이익보다 생태계의 장기적인 지속 가능성을 우선시합니다."
                            },
                            {
                                icon: <Heart size={24} />,
                                title: "Public Goods",
                                subtitle: "공공재를 위한 순수한 지원",
                                color: "pink-500",
                                description: "우리는 보조금(Grants)과 커뮤니티 기부만으로 운영됩니다. 자체 토큰도, 숨겨진 의도도 없습니다. 오직 공공재(Public Goods)를 위한 순수한 지원만이 우리의 원동력입니다."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-500"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 text-${item.color}`}>
                                    {item.icon}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-white">
                                        {item.title} <br />
                                        <span className="text-sm font-medium opacity-40 uppercase tracking-widest">{item.subtitle}</span>
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed font-light text-base">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Decorative corner */}
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-${item.color}/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action or Footer Message */}
            <section className="pb-32 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="w-px h-24 bg-gradient-to-b from-brand-primary to-transparent mx-auto mb-12" />
                        <p className="text-2xl md:text-3xl text-gray-400 italic font-light leading-relaxed">
                            "수십 년, 수백 년 뒤에도 울창할 이더리움의 숲을 위해 <br className="hidden md:block" />
                            오늘 우리는 <span className="text-white font-medium not-italic">작은 씨앗</span>을 심습니다."
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
