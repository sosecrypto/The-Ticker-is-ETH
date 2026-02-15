import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockMembers, mockContributors } from '../../data/mockData';

const Conduit: React.FC<{ d: string; delay: number }> = ({ d, delay }) => (
    <g className="opacity-10">
        <path
            d={d}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="4 4"
        />
        <motion.path
            d={d}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: [0, 0.4, 0],
                pathOffset: [0, 1],
                opacity: [0, 0.5, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
            }}
            style={{ filter: 'blur(1px)' }}
        />
    </g>
);

const AvatarParticle: React.FC<{
    avatarUrl: string;
    name: string;
    delay: number;
    duration: number;
    angle: number;
    distance: number;
}> = ({ avatarUrl, name, delay, duration, angle, distance }) => {
    const radian = (angle * Math.PI) / 180;

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0,
                x: Math.cos(radian) * (distance + 40),
                y: Math.sin(radian) * (distance + 40)
            }}
            animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.3, 0.7, 0.7, 0.3],
                x: [
                    Math.cos(radian) * (distance + 30),
                    Math.cos(radian) * distance,
                    Math.cos(radian) * (distance - 30)
                ],
                y: [
                    Math.sin(radian) * (distance + 30),
                    Math.sin(radian) * distance,
                    Math.sin(radian) * (distance - 30)
                ]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeOut",
            }}
            className="absolute left-1/2 top-1/2 pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2"
        >
            <div className="relative group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20 bg-brand-dark shadow-2xl backdrop-blur-sm">
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="w-full h-full object-cover transition-all duration-500 scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${name}&background=random`;
                        }}
                    />
                </div>
                {/* Subtle Primary Glow */}
                <div className="absolute inset-0 bg-brand-primary/30 blur-md rounded-full -z-10 group-hover:bg-brand-accent/50 transition-all duration-500" />
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
        return Array.from(unique.values()).slice(0, 10); // Limit for clarity
    }, []);

    const conduits = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const r = 300;
            const x = 50 + Math.cos(angle) * r;
            const y = 50 + Math.sin(angle) * r;
            return {
                id: i,
                d: `M ${x} ${y} L 50 50`,
                delay: i * 0.5
            };
        });
    }, []);

    const particles = useMemo(() => {
        return allAvatars.map((member, i) => ({
            id: member.id + i,
            avatarUrl: member.avatarUrl,
            name: member.name,
            delay: i * 0.7,
            duration: 5 + Math.random() * 3,
            angle: (i * (360 / allAvatars.length)) % 360,
            distance: 120 + Math.random() * 60
        }));
    }, [allAvatars]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* SVG Layer for Conduits */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                {conduits.map(c => (
                    <Conduit key={c.id} d={c.d} delay={c.delay} />
                ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-[80px]" />

            {particles.map(p => (
                <AvatarParticle key={p.id} {...p} />
            ))}
        </div>
    );
};

export default MemberAvatarFlow;
