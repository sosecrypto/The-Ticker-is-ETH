import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getRawContent } from '../../_lib/github.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string' || id.length > 50) {
    return res.status(400).json({ error: 'Missing article id' });
  }

  // Allow both legacy (research-YYYYMMDD-NNN) and new (research-YYYYMMDD-hex) formats
  if (!/^research-\d{8}-[a-f0-9]{3,8}$/.test(id)) {
    return res.status(400).json({ error: 'Invalid article id format' });
  }

  try {
    const content = await getRawContent(`src/data/articles/${id}.md`);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).send(content);
  } catch {
    return res.status(404).json({ error: 'Article not found' });
  }
}
