import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Eye, PenLine } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const WriteResearch: React.FC = () => {
    const navigate = useNavigate();
    const [previewMode, setPreviewMode] = useState(false);
    const { t } = useTranslation('research');

    React.useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
            navigate('/research');
        }
    }, [navigate]);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Technical',
        summary: '',
        content: '',
        thumbnailUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832'
    });

    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Research published! (Simulated - in a real app, this would be sent to a server)');
        navigate('/research');
    };

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20 px-6 overflow-x-hidden text-white">
            <div className="container mx-auto max-w-5xl">
                <div className="flex items-center justify-between mb-12">
                    <Link
                        to="/research"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                        {t('write.backToResearch')}
                    </Link>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setPreviewMode(!previewMode)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all border ${previewMode
                                ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                                }`}
                        >
                            {previewMode ? <PenLine size={18} /> : <Eye size={18} />}
                            {previewMode ? t('write.editMode') : t('write.preview')}
                        </button>
                        <button
                            onClick={handlePublish}
                            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/80 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/20"
                        >
                            <Send size={18} />
                            {t('write.publish')}
                        </button>
                    </div>
                </div>

                {!previewMode ? (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                        onSubmit={handlePublish}
                    >
                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">{t('write.titleLabel')}</label>
                            <input
                                type="text"
                                placeholder={t('write.titlePlaceholder')}
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-2xl font-bold focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all placeholder:text-gray-700"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">{t('write.categoryLabel')}</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-brand-accent/50 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="Technical" className="bg-brand-dark">Technical</option>
                                    <option value="Economic" className="bg-brand-dark">Economic</option>
                                    <option value="Social" className="bg-brand-dark">Social</option>
                                    <option value="Governance" className="bg-brand-dark">Governance</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">{t('write.thumbnailLabel')}</label>
                                <input
                                    type="text"
                                    value={formData.thumbnailUrl}
                                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-light focus:outline-none focus:border-brand-accent/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">{t('write.summaryLabel')}</label>
                            <textarea
                                placeholder={t('write.summaryPlaceholder')}
                                value={formData.summary}
                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[100px] text-gray-300 font-light focus:outline-none focus:border-brand-accent/50 transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest pl-1">{t('write.contentLabel')}</label>
                            <textarea
                                placeholder={t('write.contentPlaceholder')}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[500px] text-gray-100 font-mono text-lg focus:outline-none focus:border-brand-accent/50 transition-all leading-relaxed"
                                required
                            />
                        </div>
                    </motion.form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 md:p-20"
                    >
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-12">
                                <span className="px-3 py-1 rounded-full bg-brand-primary/20 text-xs font-bold text-brand-primary uppercase">
                                    {formData.category}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 mb-4">{formData.title || 'No Title'}</h1>
                                <p className="text-xl text-gray-400 font-light italic">{formData.summary || 'No Summary'}</p>
                            </div>
                            <div className="prose prose-invert prose-brand lg:prose-xl max-w-none">
                                <ReactMarkdown>{formData.content || '_No content yet. Start writing..._'}</ReactMarkdown>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default WriteResearch;
