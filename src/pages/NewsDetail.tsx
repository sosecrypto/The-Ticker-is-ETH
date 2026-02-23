import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const item = feed.items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Report not found</h1>
          <Link to="/news" className="text-brand-accent hover:underline">
            Back to News
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
          Back to News
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{item.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(item.published)}
            </span>
            <span>by {item.author}</span>
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
            &larr; All Reports
          </Link>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-accent hover:underline"
          >
            <ExternalLink size={14} />
            View Original
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsDetail;
