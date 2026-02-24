import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import type { NewsFeedData } from '../types/news';
import newsFeedData from '../data/news-feed.json';

const feed = newsFeedData as NewsFeedData;

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr',
  'ul', 'ol', 'li',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'strong', 'em', 'a', 'code', 'pre', 'blockquote',
  'div', 'span', 'img',
];

const ALLOWED_ATTR = ['href', 'target', 'rel', 'src', 'alt', 'id', 'class'];

const NewsDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const locale = i18n.language === 'ko' ? 'ko-KR' : 'en-US';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  };
  const item = feed.items.find((i) => i.id === id);

  useEffect(() => {
    document.title = item
      ? `${item.title} — The Ticker is ETH`
      : 'News — The Ticker is ETH';
    return () => { document.title = 'The Ticker is ETH'; };
  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('newsDetail.notFound')}</h1>
          <Link to="/news" className="text-brand-accent hover:underline">
            {t('newsDetail.backToNews')}
          </Link>
        </div>
      </div>
    );
  }

  const sanitizedHTML = DOMPurify.sanitize(item.content, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Back link */}
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          {t('newsDetail.backToNews')}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{item.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(item.published)}
            </span>
            <span>{t('newsDetail.by')} {item.author}</span>
          </div>
        </div>

        {/* Content */}
        <div
          className="news-content"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />

        {/* Footer link */}
        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            to="/news"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {t('newsDetail.allReports')}
          </Link>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-accent hover:underline"
          >
            <ExternalLink size={14} />
            {t('newsDetail.viewOriginal')}
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsDetail;
