import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import EthCursorTrail from '../components/cursor/EthCursorTrail';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', path: '/about' },
        { name: 'Core Team', path: '/team' },
        { name: 'Contributors', path: '/contributors' },
        { name: 'Research', path: '/research' },
        { name: 'Events', path: '/events' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden cursor-none-desktop">
            <EthCursorTrail />
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="text-xl font-black tracking-[-0.02em] text-white uppercase italic">
                        The Ticker <span className="text-brand-accent">is ETH</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full" />
                            </Link>
                        ))}
                        <a href="https://t.me/thetickeriseth" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors border border-white/5">
                            Subscribe
                        </a>
                    </div>

                    {/* Mobile Nav Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Nav Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-brand-dark/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
                        >
                            <div className="flex flex-col p-6 gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-gray-300 hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="flex-grow pt-20">
                {children}
            </main>

            <footer className="bg-black/50 border-t border-white/5 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold text-white mb-4">The ticker is ETH</h3>
                            <p className="text-gray-400 max-w-sm">
                                A non-profit organization dedicated to delivering the latest Ethereum news and fostering the community in Korea.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Community</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="https://x.com/TickerisETH_kr" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent">Twitter</a></li>
                                <li><a href="https://t.me/thetickeriseth" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent">Telegram Channel</a></li>
                                <li><a href="https://t.me/thetickerisethchat" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent">Telegram Chat</a></li>
                                <li><a href="https://linkedin.com/company/the-ticker-is-eth/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent">LinkedIn</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/research" className="hover:text-brand-accent">Blog</Link></li>
                                <li><Link to="/events" className="hover:text-brand-accent">Events</Link></li>
                                <li><a href="https://substack.com/@tickeriseth" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent">Newsletter</a></li>
                                <li><a href="https://t.me/thetickerisethchat" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} The ticker is ETH. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
