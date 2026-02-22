import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface EventItem {
    id: number;
    date: string;
    title: string;
    description: string;
    location?: string;
    link?: string;
    tag?: string;
    image?: string;
}

const upcomingEvents: EventItem[] = [
    {
        id: 101,
        date: '2026.04',
        title: 'Ethereum Korea',
        description: 'Coming soon — details to be announced.',
        tag: 'Soon',
    },
    {
        id: 102,
        date: '2026.09',
        title: 'Ethereum Korea',
        description: 'Coming soon — details to be announced.',
        tag: 'Soon',
    },
];

const pastEvents: EventItem[] = [
    {
        id: 4,
        date: '2024.10.18 - 10.20',
        title: 'Ethcon Korea 2024',
        description: '"Ignite your Cypherpunk Vision" — 4회째를 맞이한 비영리 이더리움 개발자 컨퍼런스. 개발자, 리서처, 학생이 함께 사이퍼펑크 비전을 논의.',
        location: 'Seoul, Korea',
        link: 'https://2024.ethcon.kr/',
        image: '/assets/events/ethcon2024.webp',
    },
    {
        id: 3,
        date: '2023.09.01 - 09.03',
        title: 'Ethcon Korea 2023',
        description: '"Proof of Sharing" — Vitalik Buterin이 헤드라인 게스트로 참여. 해커톤과 컨퍼런스를 결합한 3일간의 행사.',
        location: 'Platz2 (플라츠2), Seoul',
        link: 'https://2023.ethcon.kr/',
        image: '/assets/events/ethcon2023.png',
    },
    {
        id: 2,
        date: '2020.12.19 - 12.20',
        title: 'Ethcon Korea 2020',
        description: '"Explore the Network of Opportunities!" — Vitalik Buterin, Sandeep Nailwal (Polygon), 0xMaki (SushiSwap), Sebastien Borget (The Sandbox) 등 글로벌 스피커 참여.',
        location: 'Seoul, Korea (Online Hybrid)',
        link: 'https://2024.ethcon.kr/archives/',
    },
    {
        id: 1,
        date: '2019.05.27 - 05.28',
        title: 'Ethcon Korea 2019',
        description: '"Discover the Light" — 60명의 스피커, 500명의 참가자가 함께한 첫 비영리 이더리움 개발자 컨퍼런스. Ethereum 101, Vyper & Solidity 워크샵 진행.',
        location: 'COEX Grand Ballroom, Seoul',
        link: 'https://genesis.ethcon.kr/',
        image: '/assets/events/ethcon2019.jpg',
    },
];

const EventCard: React.FC<{ event: EventItem; index: number; upcoming?: boolean }> = ({ event, index, upcoming }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`bg-white/5 border rounded-2xl overflow-hidden transition-colors ${
            upcoming ? 'border-brand-accent/30 hover:border-brand-accent/60' : 'border-white/10 hover:border-white/20'
        }`}
    >
        {/* Image */}
        {event.image && (
            <div className="w-full overflow-hidden relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-auto block opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
            </div>
        )}

        <div className="p-6 flex flex-col md:flex-row gap-5 items-start">
            <div className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap flex items-center gap-2 shrink-0 ${
                upcoming ? 'bg-brand-accent/20 text-brand-accent' : 'bg-brand-primary/20 text-brand-primary'
            }`}>
                <Calendar size={14} />
                {event.date}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    {event.tag && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full">
                            {event.tag}
                        </span>
                    )}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                {event.location && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <MapPin size={12} /> {event.location}
                    </div>
                )}
                {event.link && (
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-sm text-brand-accent hover:underline">
                        <ExternalLink size={13} /> Visit Website
                    </a>
                )}
            </div>
        </div>
    </motion.div>
);

const Events: React.FC = () => {
    return (
        <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
            >
                {/* Upcoming Events */}
                <h1 className="text-4xl font-bold mb-3 text-center text-white">Upcoming Events</h1>
                <p className="text-center text-gray-500 text-sm mb-12">Stay tuned for our next community gatherings</p>

                <div className="space-y-6 mb-20">
                    {upcomingEvents.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} upcoming />
                    ))}
                </div>

                {/* Past Events */}
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-bold text-white whitespace-nowrap">Past Events</h2>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="space-y-6">
                    {pastEvents.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 text-center p-8 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-3xl border border-white/5">
                    <h3 className="text-xl font-bold mb-4">Want to host an event?</h3>
                    <p className="text-gray-400 mb-6">We support community initiatives. Reach out to us!</p>
                    <a href="https://t.me/thetickerisethchat" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors inline-block">
                        Contact Us
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Events;
