import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, MessageCircle, PenTool, ArrowLeft } from 'lucide-react';
import ContributionGraph from '../components/team/ContributionGraph';
import { mockMembers } from '../data/mockData';

const MemberDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const member = mockMembers.find(m => m.id === id);

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

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
            <Link to="/team" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Team
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
                                src={member.avatarUrl}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover border-4 border-brand-dark shadow-2xl"
                            />
                            {member.isCurrent && (
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-brand-dark rounded-full" />
                            )}
                        </div>

                        <h1 className="text-3xl font-bold text-center text-white mb-2">{member.name}</h1>
                        <p className="text-center text-brand-primary font-semibold mb-6 uppercase tracking-wider text-xs">{member.role}</p>

                        <div className="flex justify-center gap-4 mb-8">
                            {member.social.github && (
                                <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                    <Github size={20} />
                                </a>
                            )}
                            {member.social.twitter && (
                                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                    <Twitter size={20} />
                                </a>
                            )}
                        </div>

                        <div className="space-y-4 text-sm text-gray-400 mb-8 border-t border-white/5 pt-8">
                            <div className="flex justify-between">
                                <span>Membership</span>
                                <span className={member.isCurrent ? "text-green-400 font-medium" : "text-gray-500"}>
                                    {member.isCurrent ? "Active Core" : "Alumni"}
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
                                {member.contributions.reduce((acc, curr) => acc + curr.count, 0)} Total units
                            </span>
                        </div>
                        <ContributionGraph data={member.contributions} />
                    </motion.div>

                    {/* Activity Log */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">Recent Contributions</h3>
                        <div className="space-y-4">
                            {member.recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="relative pl-8 border-l border-white/10 pb-8 last:pb-0 last:border-0"
                                >
                                    <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-brand-dark border border-white/20 flex items-center justify-center">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="text-xs text-gray-500 mb-1">{activity.date}</div>
                                    <div className="text-white font-medium mb-1">
                                        {activity.content}
                                    </div>
                                    {activity.link && (
                                        <a href={activity.link} className="text-xs text-brand-accent hover:underline">
                                            View Source &rarr;
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetail;
