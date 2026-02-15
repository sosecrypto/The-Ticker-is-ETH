import React from 'react';
import { motion } from 'framer-motion';

const events = [
    { id: 1, date: '2023-11-15', title: 'ETH Seoul Meetup', description: 'Community gathering to discuss the latest Dencun upgrade.' },
    { id: 2, date: '2023-12-01', title: 'DevConnect Recap', description: 'Sharing insights and updates from the DevConnect Istanbul.' },
    { id: 3, date: '2024-01-20', title: 'Smart Contract Security Workshop', description: 'Hands-on workshop for junior developers.' },
];

const Events: React.FC = () => {
    return (
        <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
            >
                <h1 className="text-4xl font-bold mb-12 text-center">Upcoming Events</h1>

                <div className="space-y-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start hover:border-brand-primary/50 transition-colors"
                        >
                            <div className="bg-brand-primary/20 text-brand-accent px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap">
                                {event.date}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                <p className="text-gray-400">{event.description}</p>
                                <button className="mt-4 text-sm text-brand-primary hover:text-white transition-colors">
                                    Register &rarr;
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center p-8 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-3xl border border-white/5">
                    <h3 className="text-xl font-bold mb-4">Want to host an event?</h3>
                    <p className="text-gray-400 mb-6">We support community initiatives. Reach out to us!</p>
                    <a href="#" className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
                        Contact Us
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Events;
