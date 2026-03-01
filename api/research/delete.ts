import type { VercelRequest, VercelResponse } from '@vercel/node';
import { timingSafeEqual } from 'crypto';
import { getFileContent, updateFile, deleteFile } from '../_lib/github.js';

interface DeleteBody {
  password: string;
  id: string;
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf-8');
  const bufB = Buffer.from(b, 'utf-8');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body as DeleteBody;

  if (!body.password || !body.id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const publishPassword = process.env.PUBLISH_PASSWORD;
  if (!publishPassword || !safeCompare(body.password, publishPassword)) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  try {
    // 1. Update research-index.json (remove the entry)
    const indexPath = 'src/data/research-index.json';
    const indexFile = await getFileContent(indexPath);
    const indexContent = Buffer.from(indexFile.content, 'base64').toString('utf-8');
    const indexData = JSON.parse(indexContent) as Array<Record<string, unknown>>;

    const entryIndex = indexData.findIndex((item) => item.id === body.id);
    if (entryIndex === -1) {
      return res.status(404).json({ error: 'Research not found in index' });
    }

    indexData.splice(entryIndex, 1);

    await updateFile(
      indexPath,
      JSON.stringify(indexData, null, 2),
      indexFile.sha,
      `docs(research): remove index entry for "${body.id}"`,
    );

    // 2. Delete the article markdown file (if exists)
    const articlePath = `src/data/articles/${body.id}.md`;
    try {
      const articleFile = await getFileContent(articlePath);
      await deleteFile(
        articlePath,
        articleFile.sha,
        `docs(research): delete article "${body.id}"`,
      );
    } catch {
      // Article file may not exist (e.g., forwarded posts), skip silently
    }

    return res.status(200).json({ deleted: body.id });
  } catch (error) {
    console.error('[DELETE ERROR]', error);
    return res.status(500).json({ error: 'Delete failed. Please try again.' });
  }
}
