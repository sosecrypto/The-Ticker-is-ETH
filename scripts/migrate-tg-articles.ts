import * as fs from 'fs';
import * as path from 'path';

/**
 * Migration script: research-content.json → individual tg-{id}.md files
 *
 * Reads the monolithic research-content.json and writes each entry
 * as a separate .md file under src/data/articles/.
 */
function main() {
  const root = process.cwd();
  const inputPath = path.resolve(root, 'src/data/research-content.json');
  const articlesDir = path.resolve(root, 'src/data/articles');

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  const raw = fs.readFileSync(inputPath, 'utf-8');
  const contentMap: Record<string, string> = JSON.parse(raw);
  const ids = Object.keys(contentMap);

  console.log(`Found ${ids.length} entries in research-content.json`);

  let created = 0;
  let skipped = 0;

  for (const id of ids) {
    const filePath = path.resolve(articlesDir, `${id}.md`);

    if (fs.existsSync(filePath)) {
      skipped++;
      continue;
    }

    fs.writeFileSync(filePath, contentMap[id], 'utf-8');
    created++;
  }

  console.log(`Created: ${created} files`);
  if (skipped > 0) {
    console.log(`Skipped: ${skipped} files (already exist)`);
  }
  console.log(`Total: ${ids.length} articles → src/data/articles/`);
  console.log('Migration complete.');
}

main();
