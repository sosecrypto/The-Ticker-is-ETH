import { motion } from 'framer-motion';
import type { TeamMember } from '../../types/team';
import ContributionGraph from './ContributionGraph';
import { Github, Twitter, Send, Linkedin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAvatarFallbackUrl, getTotalContributions } from '../../utils/members';

interface MemberCardProps {
    member: TeamMember;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-accent/30 transition-all group hover:bg-white/[0.07]"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src={member.avatarUrl || getAvatarFallbackUrl(member.name)}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-transparent group-hover:border-brand-accent transition-colors"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = getAvatarFallbackUrl(member.name);
                            }}
                        />
                        {member.isCurrent && (
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-brand-dark rounded-full" title="Active Object" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors">
                            {member.name}
                        </h3>
                        <p className="text-sm text-brand-primary font-medium">{member.role}</p>
                        <p className="text-xs text-gray-500 mt-1">{member.period}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {member.social.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Github size={18} />
                        </a>
                    )}
                    {member.social.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Twitter size={18} />
                        </a>
                    )}
                    {member.social.telegram && (
                        <a href={member.social.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#26A5E4] transition-colors">
                            <Send size={18} />
                        </a>
                    )}
                    {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin size={18} />
                        </a>
                    )}
                    {member.social.website && (
                        <a href={member.social.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Globe size={18} />
                        </a>
                    )}
                </div>
            </div>

            <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                {member.bio}
            </p>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Activity</span>
                    <span className="text-xs text-brand-accent">
                        {getTotalContributions(member.contributions)} contributions
                    </span>
                </div>
                <ContributionGraph data={member.contributions} />
            </div>

            <Link
                to={member.memberType === 'core' ? `/team/${member.id}` : `/contributors/${member.id}`}
                className="block w-full text-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors border border-transparent hover:border-white/10"
            >
                View Profile & Activity Log
            </Link>
        </motion.div>
    );
};

export default MemberCard;
