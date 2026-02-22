import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, MessageCircle, PenTool, ArrowLeft, Eye, Share2, ExternalLink, Linkedin, Send, Globe } from 'lucide-react';
import ContributionGraph from '../components/team/ContributionGraph';
import { mockMembers, mockContributors } from '../data/mockData';

function extractDomain(url: string): string {
    try {
        const host = new URL(url).hostname.replace('www.', '');
        return host.length > 24 ? host.slice(0, 21) + '...' : host;
    } catch {
        return '';
    }
}

const MemberDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const member = [...mockMembers, ...mockContributors].find(m => m.id === id);

    if (!member) {
        return (
            <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto text-white">
                <Link to="/team" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Team
                </Link>
                <div className="text-center text-xl font-light">Member not found</div>
            </div>
        );
    }

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'telegram': return <MessageCircle size={16} className="text-blue-400" />;
            case 'github': return <Github size={16} className="text-gray-400" />;
            case 'blog': return <PenTool size={16} className="text-brand-accent" />;
            default: return <MessageCircle size={16} />;
        }
    };

    const backLink = member.memberType === 'core' ? '/team' : '/contributors';
    const backLabel = member.memberType === 'core' ? 'Back to Team' : 'Back to Contributors';
    const totalMessages = member.recentActivity.length;

    const now = Date.now();
    const DAY_MS = 24 * 60 * 60 * 1000;
    const last14 = member.contributions
        .filter(c => now - new Date(c.date).getTime() <= 14 * DAY_MS)
        .reduce((a, c) => a + c.count, 0);
    const last30 = member.contributions
        .filter(c => now - new Date(c.date).getTime() <= 30 * DAY_MS)
        .reduce((a, c) => a + c.count, 0);

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
            <Link to={backLink} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> {backLabel}
            </Link>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Profile Sidebar */}
                <div className="lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-28 backdrop-blur-md"
                    >
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <img
                                src={member.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3C4CA8&color=fff&size=128`}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover border-4 border-brand-dark shadow-2xl"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3C4CA8&color=fff&size=128`;
                                }}
                            />
                            {member.isCurrent && (
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-brand-dark rounded-full" />
                            )}
                        </div>

                        <h1 className="text-3xl font-bold text-center text-white mb-2">{member.name}</h1>
                        <p className="text-center text-brand-primary font-semibold mb-6 uppercase tracking-wider text-xs">{member.role}</p>

                        <div className="flex justify-center gap-3 mb-8">
                            {member.social.twitter && (
                                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" title="Twitter">
                                    <Twitter size={20} />
                                </a>
                            )}
                            {member.social.github && (
                                <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" title="GitHub">
                                    <Github size={20} />
                                </a>
                            )}
                            {member.social.linkedin && (
                                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" title="LinkedIn">
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {member.social.telegram && (
                                <a href={member.social.telegram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" title="Telegram">
                                    <Send size={20} />
                                </a>
                            )}
                            {member.social.website && (
                                <a href={member.social.website} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" title="Website">
                                    <Globe size={20} />
                                </a>
                            )}
                        </div>

                        <div className="space-y-4 text-sm text-gray-400 mb-8 border-t border-white/5 pt-8">
                            <div className="flex justify-between">
                                <span>Membership</span>
                                <span className={member.isCurrent ? "text-green-400 font-medium" : "text-gray-500"}>
                                    {member.isCurrent ? (member.memberType === 'core' ? "Active Core" : "Active Contributor") : "Alumni"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Contribution Period</span>
                                <span className="text-white">{member.period}</span>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-4 mb-8">
                            <p className="text-gray-300 text-sm leading-relaxed italic">
                                "{member.bio}"
                            </p>
                        </div>

                        {/* Contribution Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white/5 rounded-xl p-3 text-center">
                                <div className="text-xl font-bold text-white">{totalMessages}</div>
                                <div className="text-[10px] text-gray-500 mt-1">Total</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 text-center">
                                <div className="text-xl font-bold text-brand-accent">{last30}</div>
                                <div className="text-[10px] text-gray-500 mt-1">Last 30d</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 text-center">
                                <div className="text-xl font-bold text-brand-primary">{last14}</div>
                                <div className="text-[10px] text-gray-500 mt-1">Last 14d</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Contribution Graph */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-brand-dark/30 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                Contribution Pulse
                            </h3>
                            <span className="text-xs font-semibold text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                {totalMessages} Total messages
                            </span>
                        </div>
                        <ContributionGraph data={member.contributions} />
                    </motion.div>

                    {/* Activity Log */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Recent Contributions</h3>
                            <span className="text-xs text-gray-500">
                                {member.contributions.reduce((a, c) => a + c.count, 0)} messages in {Math.ceil(member.contributions.length / 7)} weeks
                            </span>
                        </div>
                        <div className="max-h-[640px] overflow-y-auto pr-1 space-y-3">
                            {member.recentActivity.map((activity) => {
                                const domain = activity.sourceUrl ? extractDomain(activity.sourceUrl) : '';

                                return (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="group relative pl-8 border-l border-white/10 pb-6 last:pb-0 last:border-0"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-brand-dark border border-white/20 flex items-center justify-center">
                                            {getActivityIcon(activity.type)}
                                        </div>

                                        {/* Content card */}
                                        <div className="bg-white/[0.02] group-hover:bg-white/[0.05] border border-transparent group-hover:border-white/5 rounded-xl p-4 transition-all duration-200">
                                            {/* Date + meta row */}
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-[11px] text-gray-500 font-medium">{activity.date}</span>
                                                {activity.views != null && activity.views > 0 && (
                                                    <span className="flex items-center gap-1 text-[10px] text-gray-600">
                                                        <Eye size={10} /> {activity.views.toLocaleString()}
                                                    </span>
                                                )}
                                                {activity.forwards != null && activity.forwards > 0 && (
                                                    <span className="flex items-center gap-1 text-[10px] text-gray-600">
                                                        <Share2 size={10} /> {activity.forwards}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content text */}
                                            <p className="text-sm text-gray-200 leading-relaxed mb-2">
                                                {activity.content}
                                            </p>

                                            {/* Footer: source URL tag + telegram link */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {domain && (
                                                    <a
                                                        href={activity.sourceUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                                    >
                                                        <ExternalLink size={9} />
                                                        {domain}
                                                    </a>
                                                )}
                                                {activity.link && (
                                                    <a
                                                        href={activity.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[11px] text-brand-accent/70 hover:text-brand-accent transition-colors"
                                                    >
                                                        View on Telegram &rarr;
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetail;
