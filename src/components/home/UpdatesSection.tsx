import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';

const updates = [
    {
        id: 1,
        tag: "Research",
        title: "Dencun Upgrade: What it means for Ethereum's Scalability",
        date: "2024.02.10",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        tag: "Translation",
        title: "Vitalik Buterin: The Promise and Challenges of Crypto + AI",
        date: "2024.02.05",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        tag: "Community",
        title: "Ethereum Korea Community Meetup Recap #12",
        date: "2024.01.28",
        image: "https://images.unsplash.com/photo-1591115765373-520b7a217286?q=80&w=800&auto=format&fit=crop"
    }
];

const UpdatesSection: React.FC = () => {
    return (
        <section className="py-24 bg-brand-dark/50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-2 block"
                        >
                            Stay Informed
                        </motion.span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Latest from the Frontier</h2>
                    </div>
                    <button className="flex items-center gap-2 text-brand-primary hover:text-brand-accent transition-colors font-semibold group">
                        View all updates <ArrowUpRight size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {updates.map((update, i) => (
                        <motion.div
                            key={update.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-brand-primary/50 transition-all hover:-translate-y-2"
                        >
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={update.image}
                                    alt={update.title}
                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brand-primary/80 backdrop-blur-md text-[10px] font-bold text-white px-3 py-1 rounded-full uppercase tracking-widest">
                                        {update.tag}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                                    <Calendar size={14} />
                                    {update.date}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors line-clamp-2">
                                    {update.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                    Detailed insights and research regarding {update.title.toLowerCase()}.
                                </p>
                                <button className="text-sm font-bold text-white flex items-center gap-2 group/btn">
                                    Read Article <ArrowUpRight size={16} className="text-brand-primary group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpdatesSection;
