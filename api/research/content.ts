import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getRawContent } from '../_lib/github.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string' || id.length > 50) {
    return res.status(400).json({ error: 'Missing article id' });
  }

  const isTgId = /^tg-\d{1,10}$/.test(id);
  const isResearchId = /^research-\d{8}-[a-f0-9]{3,8}$/.test(id);

  if (!isTgId && !isResearchId) {
    return res.status(400).json({ error: 'Invalid article id format' });
  }

  try {
    const content = await getRawContent(`src/data/articles/${id}.md`);

    if (!content) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).send(content);
  } catch {
    return res.status(404).json({ error: 'Article not found' });
  }
}
