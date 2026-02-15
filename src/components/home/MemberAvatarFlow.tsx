import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockMembers, mockContributors } from '../../data/mockData';

const GlowingConduit: React.FC<{ d: string; delay: number }> = ({ d, delay }) => (
    <g>
        {/* Base Static Path - More visible */}
        <path
            d={d}
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            className="opacity-20"
        />
        {/* Glowing Pulse Path - Stronger glow */}
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

    // Start at edge of defined conduit (let's say 48%)
    // End at 50% (center)
    const startOffset = 45;
    const startX = 50 + Math.cos(radian) * startOffset;
    const startY = 50 + Math.sin(radian) * startOffset;

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
                scale: [0.3, 0.8, 0.8, 0.2],
                left: [`${startX}%`, '50%', '50%'],
                top: [`${startY}%`, '50%', '50%'],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear", // Move linearly along the conduit
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
            const rStart = 85; // Visual length of the conduit
            const x = 50 + Math.cos(angle) * rStart;
            const y = 50 + Math.sin(angle) * rStart;
            return {
                id: i,
                d: `M ${x} ${y} L 50 50`,
                angle: i * 45,
                delay: i * 0.5
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
            angle: (i % 8) * 45 // Assign to one of the 8 conduit angles
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
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-primary/10 rounded-full blur-[120px]" />

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
