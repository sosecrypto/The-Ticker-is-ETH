import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockMembers, mockContributors } from '../../data/mockData';

const GlowingConduit: React.FC<{ d: string; delay: number }> = ({ d, delay }) => (
    <g>
        {/* Base Path */}
        <path
            d={d}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            className="opacity-10"
        />
        {/* Glowing Pulse Path */}
        <motion.path
            d={d}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: [0, 0.4, 0],
                pathOffset: [0, 1],
                opacity: [0, 0.8, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
            }}
            style={{
                filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))',
            }}
        />
    </g>
);

const AvatarParticle: React.FC<{
    avatarUrl: string;
    name: string;
    delay: number;
    duration: number;
    pathId: number;
    angle: number;
}> = ({ avatarUrl, name, delay, duration, pathId, angle }) => {
    // 8 radial paths centered at 50, 50
    const radian = (angle * Math.PI) / 180;
    const rStart = 300; // Start distance (percent)

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0,
                left: `${50 + Math.cos(radian) * 45}%`,
                top: `${50 + Math.sin(radian) * 45}%`
            }}
            animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.4, 0.8, 0.8, 0.4],
                left: [`${50 + Math.cos(radian) * 45}%`, '50%', '50%'],
                top: [`${50 + Math.sin(radian) * 45}%`, '50%', '50%'],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeIn",
            }}
            className="absolute pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2"
        >
            <div className="relative group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/30 bg-brand-dark shadow-2xl backdrop-blur-sm">
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="w-full h-full object-cover transition-all duration-500 scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${name}+S&background=random&color=fff`;
                        }}
                    />
                </div>
                {/* Colored Core Glow */}
                <div className="absolute inset-0 bg-brand-primary/40 blur-md rounded-full -z-10 group-hover:bg-brand-accent/60 transition-all duration-500" />
            </div>
        </motion.div>
    );
};

const MemberAvatarFlow: React.FC = () => {
    const allAvatars = useMemo(() => {
        const unique = new Map();
        [...mockMembers, ...mockContributors].forEach(m => {
            if (!unique.has(m.name)) unique.set(m.name, m);
        });
        return Array.from(unique.values()).slice(0, 12);
    }, []);

    const conduits = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const rStart = 80;
            const x = 50 + Math.cos(angle) * rStart;
            const y = 50 + Math.sin(angle) * rStart;
            return {
                id: i,
                d: `M ${x} ${y} L 50 50`,
                angle: i * 45,
                delay: i * 0.4
            };
        });
    }, []);

    const particles = useMemo(() => {
        return allAvatars.map((member, i) => ({
            id: member.id + i,
            avatarUrl: member.avatarUrl,
            name: member.name,
            delay: Math.random() * 8,
            duration: 4 + Math.random() * 4,
            pathId: i % 8,
            angle: (i % 8) * 45
        }));
    }, [allAvatars]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* SVG Layer for Glowing Conduits */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {conduits.map(c => (
                    <GlowingConduit key={c.id} d={c.d} delay={c.delay} />
                ))}
            </svg>

            {/* Ambient Center Glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-primary/10 rounded-full blur-[100px]" />

            {/* Avatars flowing along paths */}
            <div className="absolute inset-0">
                {particles.map(p => (
                    <AvatarParticle key={p.id} {...p} />
                ))}
            </div>
        </div>
    );
};

export default MemberAvatarFlow;
