import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Linkedin, Mail, Twitter } from 'lucide-react';
import ethLogoCustom from '../../assets/eth-logo-custom.png';
import MemberAvatarFlow from './MemberAvatarFlow';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // ... rest of imports
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#050505] text-white pt-24 lg:pt-32">
            {/* Background Effects: Deep Premium Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-brand-primary/10 rounded-full blur-[160px] opacity-20" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ opacity }}
                    className="max-w-4xl"
                >
                    <span className="text-xs font-medium uppercase tracking-[0.4em] text-gray-500 mb-6 block">
                        KOREA ETHEREUM COMMUNITY
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black mb-10 tracking-[-0.04em] leading-[0.9] uppercase italic text-white">
                        The ticker <br />
                        is <span className="text-white">ETH</span>
                    </h1>

                    {/* SNS Icons */}
                    <div className="flex justify-center gap-4 mb-8">
                        {[
                            { icon: Send, href: "https://t.me/thetickeriseth", label: "Telegram" },
                            { icon: Twitter, href: "https://x.com/TickerisETH_kr", label: "Twitter" },
                            { icon: Linkedin, href: "https://linkedin.com/company/the-ticker-is-eth/", label: "LinkedIn" },
                            { icon: Mail, href: "https://substack.com/@tickeriseth", label: "Newsletter" }
                        ].map((sns, idx) => (
                            <motion.a
                                key={idx}
                                href={sns.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -4, scale: 1.1 }}
                                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
                                title={sns.label}
                            >
                                <sns.icon size={16} strokeWidth={1.5} />
                            </motion.a>
                        ))}
                    </div>

                    <div className="flex justify-center mb-0">
                        <Link to="/about" className="group relative px-12 py-4 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all duration-500 hover:border-white/40 inline-block">
                            <span className="relative z-10 text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-white">
                                Learn More
                            </span>
                            <div className="absolute inset-0 bg-white/5 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Custom Logo Image with Parallax and Animation - Restored Size */}
            <motion.div
                style={{ y }}
                className="relative w-full max-w-lg mt-12 lg:mt-16 aspect-[1/1.1] min-h-[400px] flex items-center justify-center pointer-events-none select-none px-6"
            >
                {/* Member Avatar Flow Animation Overlay - Behind the Logo */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <MemberAvatarFlow />
                </div>

                <div className="relative z-20">
                    {/* Backglow for the logo */}
                    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-75" />

                    <motion.img
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        src={ethLogoCustom}
                        alt="Ethereum Custom Logo"
                        className="w-full h-auto object-contain mx-auto relative mix-blend-screen"
                        style={{
                            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 70%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 70%, transparent 100%)',
                        }}
                    />
                </div>

                {/* Bottom Shadow Fade - Deeply recessed to avoid any clipping */}
                <div className="absolute inset-x-0 -bottom-20 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent -z-10" />
            </motion.div>


            {/* Explore Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20"
            >
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>
        </div>
    );
};


export default Hero;
