import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockMembers, mockContributors } from '../../data/mockData';

const AvatarParticle: React.FC<{
    avatarUrl: string;
    name: string;
    delay: number;
    duration: number;
    angle: number;
    distance: number;
}> = ({ avatarUrl, name, delay, duration, angle, distance }) => {
    // Current position calculation for circular flow
    // We want them to orbit or float in a circle
    const radian = (angle * Math.PI) / 180;

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0,
                x: Math.cos(radian) * (distance + 50),
                y: Math.sin(radian) * (distance + 50)
            }}
            animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5],
                x: [
                    Math.cos(radian) * (distance + 40),
                    Math.cos(radian + 0.2) * distance,
                    Math.cos(radian + 0.4) * (distance - 20)
                ],
                y: [
                    Math.sin(radian) * (distance + 40),
                    Math.sin(radian + 0.2) * distance,
                    Math.sin(radian + 0.4) * (distance - 20)
                ]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2"
        >
            <div className="relative group">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20 bg-brand-dark shadow-2xl backdrop-blur-sm">
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${name}&background=random`;
                        }}
                    />
                </div>
                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full -z-10 group-hover:bg-brand-accent/30 transition-colors" />
            </div>
        </motion.div>
    );
};

const MemberAvatarFlow: React.FC = () => {
    // Combine core team and a few contributors for the animation
    const allAvatars = useMemo(() => {
        const unique = new Map();
        [...mockMembers, ...mockContributors].forEach(m => {
            if (!unique.has(m.name)) {
                unique.set(m.name, m);
            }
        });
        return Array.from(unique.values());
    }, []);

    const particles = useMemo(() => {
        return allAvatars.map((member, i) => ({
            id: member.id + i,
            avatarUrl: member.avatarUrl,
            name: member.name,
            delay: i * 0.8,
            duration: 6 + Math.random() * 4,
            angle: (i * (360 / allAvatars.length)) % 360,
            distance: 180 + Math.random() * 100 // Distance from center
        }));
    }, [allAvatars]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* Ambient Background Glow for the whole circle area */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px]" />

            {particles.map(p => (
                <AvatarParticle key={p.id} {...p} />
            ))}
        </div>
    );
};

export default MemberAvatarFlow;
