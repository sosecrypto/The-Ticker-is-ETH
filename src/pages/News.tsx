import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { NewsFeedData } from '../types/news';
import newsFeedData from '../data/news-feed.json';

const feed = newsFeedData as NewsFeedData;
const ITEMS_PER_PAGE = 5;

const News: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { t, i18n } = useTranslation('news');
  const visibleItems = feed.items.slice(0, visibleCount);
  const hasMore = visibleCount < feed.items.length;

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const locale = i18n.language === 'ko' ? 'ko-KR' : 'en-US';
    return date.toLocaleDateString(locale, { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '');
  };

  useEffect(() => {
    document.title = 'News — The Ticker is ETH';
    return () => { document.title = 'The Ticker is ETH'; };
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 rounded-full mb-4">
            {t('badge')}
          </span>
          <h1 className="text-4xl font-bold mb-3 text-white">News</h1>
          <p className="text-gray-500 text-sm">{feed.feedSubtitle}</p>
        </div>

        {/* News Items */}
        <div className="space-y-6">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/news/${item.id}`}
                className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.07] transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar size={14} />
                    <span>{formatDate(item.published)}</span>
                  </div>
                  <span className="text-xs text-gray-500">by {item.author}</span>
                </div>

                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
                  {item.title}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                  {item.summary}
                </p>

                <span className="inline-flex items-center gap-1 text-sm text-brand-accent font-medium">
                  {t('readReport')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <ChevronDown size={16} />
              {t('common:loadMore', { count: feed.items.length - visibleCount })}
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center p-8 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-3xl border border-white/5">
          <h3 className="text-xl font-bold mb-4 text-white">{t('ctaTitle')}</h3>
          <p className="text-gray-400 mb-6">{t('ctaDescription')}</p>
          <a
            href="https://eth.rejamong.com/ko/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            <ExternalLink size={16} />
            eth.rejamong.com
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default News;
