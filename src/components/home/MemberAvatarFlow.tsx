import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockMembers, mockContributors } from '../../data/mockData';

const GlowingConduit: React.FC<{ d: string; delay: number }> = ({ d, delay }) => (
    <g>
        {/* Base Static Path */}
        <path
            d={d}
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            className="opacity-20"
        />
        {/* Glowing Pulse Path */}
        <motion.path
            d={d}
            fill="none"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: [0, 0.4, 0],
                pathOffset: [0, 1],
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
            }}
            style={{
                filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))',
            }}
        />
    </g>
);

const AvatarParticle: React.FC<{
    avatarUrl: string;
    name: string;
    delay: number;
    duration: number;
    angle: number;
}> = ({ avatarUrl, name, delay, duration, angle }) => {
    const radian = (angle * Math.PI) / 180;

    // Using a 100x100 square coordinate system
    const startRadius = 45;
    const startX = 50 + Math.cos(radian) * startRadius;
    const startY = 50 + Math.sin(radian) * startRadius;

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0,
                left: `${startX}%`,
                top: `${startY}%`,
            }}
            animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.3, 0.8, 0.8, 0],
                left: [`${startX}%`, '50%', '50%'],
                top: [`${startY}%`, '50%', '50%'],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
            }}
            className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
        >
            <div className="relative group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/40 bg-brand-dark shadow-2xl backdrop-blur-sm">
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="w-full h-full object-cover transition-all duration-500 scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${name}+S&background=random&color=fff`;
                        }}
                    />
                </div>
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

    const angles = [-90, -30, 30, 90, 150, 210];

    const conduits = useMemo(() => {
        return angles.map((angleDeg, i) => {
            const angleVal = (angleDeg) * (Math.PI / 180);
            const rStart = 85;
            const x = 50 + Math.cos(angleVal) * rStart;
            const y = 50 + Math.sin(angleVal) * rStart;
            return {
                id: i,
                d: `M ${x} ${y} L 50 50`,
                delay: i * 0.6
            };
        });
    }, []);

    const particles = useMemo(() => {
        return allAvatars.map((member, i) => ({
            id: member.id + i,
            avatarUrl: member.avatarUrl,
            name: member.name,
            delay: Math.random() * 6,
            duration: 5 + Math.random() * 3,
            angle: angles[i % 6]
        }));
    }, [allAvatars]);

    return (
        /* Enforce a large square viewport that remains centered on the logo */
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
            <div className="relative w-full h-full">
                {/* SVG Layer for Glowing Conduits */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    {conduits.map(c => (
                        <GlowingConduit key={c.id} d={c.d} delay={c.delay} />
                    ))}
                </svg>

                {/* Ambient Center Glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[140px]" />

                {/* Avatars flowing along paths */}
                <div className="absolute inset-0">
                    {particles.map(p => (
                        <AvatarParticle key={p.id} {...p} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MemberAvatarFlow;
