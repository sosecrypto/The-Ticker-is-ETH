import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        Vision
                    </motion.span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-accent leading-tight">
                        Nurturing the <br />Infinite Garden.
                    </h1>
                </div>

                <div className="space-y-12 text-lg text-gray-300 leading-relaxed font-light">
                    <div className="bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                        <p className="mb-6">
                            <span className="text-white font-semibold">The Ticker is ETH</span>는 이더리움 재단(EF)의 철학에 영감을 받아, 한국 이더리움 생태계의 성장을 돕기 위해 설립된 비영리 단체입니다.
                        </p>
                        <p>
                            우리는 이더리움을 단순히 기술로 보지 않고, 누구나 가꾸고 성장할 수 있는 <span className="text-brand-accent font-medium">무한한 정원(Infinite Garden)</span>으로 바라봅니다. 언어의 장벽과 파편화된 정보가 커뮤니티의 성장을 가로막지 않도록, 우리는 <span className="text-white font-medium">정원사(Gardener)</span>의 마음으로 한국 생태계를 보살피고 영양분을 공급합니다.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-white text-center">Philosophy</h2>

                        <div className="grid gap-6">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-brand-primary/50 transition-all group">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-brand-primary" />
                                    Subtraction — 뺄셈의 철학
                                </h3>
                                <p className="text-gray-400">
                                    우리는 권력을 독점하기보다 생태계로 분산시키는 것을 지향합니다. 직접 경쟁하기보다는 커뮤니티가 스스로 가치를 창출할 수 있도록 지원하며, 우리가 없어도 이더리움이 번영할 수 있는 환경을 만듭니다.
                                </p>
                            </div>

                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-brand-accent/50 transition-all group">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-brand-accent" />
                                    Stewardship — 가치의 수호
                                </h3>
                                <p className="text-gray-400">
                                    탈중앙화, 개방성, 무허가성이라는 이더리움의 영혼(Soul)을 지키는 청지기 역할을 수행합니다. 단기적인 이익보다 생태계의 장기적인 지속 가능성을 우선시합니다.
                                </p>
                            </div>

                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-pink-500/50 transition-all group">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                                    Public Goods — 공공재를 위한 순수한 지원
                                </h3>
                                <p className="text-gray-400">
                                    우리는 보조금(Grants)과 커뮤니티 기부만으로 운영됩니다. 자체 토큰도, 숨겨진 의도도 없습니다. 오직 공공재(Public Goods)를 위한 순수한 지원만이 우리의 원동력입니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-8 border-t border-white/5 italic text-gray-400">
                        <p>수십 년, 수백 년 뒤에도 울창할 이더리움의 숲을 위해 오늘 우리는 작은 씨앗을 심습니다.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
