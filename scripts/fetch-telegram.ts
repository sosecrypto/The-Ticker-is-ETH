import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Api } from 'telegram';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const API_ID = Number(process.env.TELEGRAM_API_ID);
const API_HASH = process.env.TELEGRAM_API_HASH ?? '';
const SESSION_STRING = process.env.TELEGRAM_SESSION ?? '';
const CHANNEL = process.env.TELEGRAM_CHANNEL ?? 'thetickeriseth';

if (!API_ID || !API_HASH) {
  console.error('Missing required env vars: TELEGRAM_API_ID, TELEGRAM_API_HASH');
  console.error('Copy .env.example to .env.local and fill in the values.');
  process.exit(1);
}

// Normalize author names: merge aliases into canonical names
const AUTHOR_ALIASES: Record<string, string> = {
  'Rejamong | A41': 'Rejamong',
  '100y | Four Pillars': '100y',
  'Jinsol (100y.eth) | Four Pillars': '100y',
  'Jenna Park': 'Jenna',
  'kuma hada': 'Kuma',
};

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

interface ForwardedMessage {
  id: number;
  date: string;
  text: string;
  fromChannelTitle?: string;
  fromPostAuthor?: string;
}

interface UnattributedMessage {
  id: number;
  date: string;
  text: string;
}

interface RawMessage {
  id: number;
  date: string;
  text: string;
  postAuthor: string;
  views: number;
  forwards: number;
}

interface ContributorData {
  name: string;
  messageCount: number;
  firstMessageDate: string;
  lastMessageDate: string;
  messages: RawMessage[];
}

interface OutputData {
  channel: string;
  fetchedAt: string;
  totalMessages: number;
  contributors: ContributorData[];
}

async function main() {
  console.log(`Fetching messages from @${CHANNEL}...`);
  console.log('Using user session authentication (bots cannot read channel history).\n');

  const session = new StringSession(SESSION_STRING);
  const client = new TelegramClient(session, API_ID, API_HASH, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: () => prompt('Phone number (with country code, e.g. +821012345678): '),
    phoneCode: () => prompt('Verification code (check Telegram app): '),
    password: () => prompt('2FA password (if enabled): '),
    onError: (err) => console.error('Auth error:', err),
  });

  console.log('Authenticated successfully.\n');

  // Save session string for future runs
  const savedSession = client.session.save() as unknown as string;
  if (savedSession && savedSession !== SESSION_STRING) {
    const envPath = path.resolve(process.cwd(), '.env.local');
    let envContent = fs.readFileSync(envPath, 'utf-8');

    if (envContent.includes('TELEGRAM_SESSION=')) {
      envContent = envContent.replace(/TELEGRAM_SESSION=.*/, `TELEGRAM_SESSION=${savedSession}`);
    } else {
      envContent += `\n# Session string (auto-saved, do not edit)\nTELEGRAM_SESSION=${savedSession}\n`;
    }

    fs.writeFileSync(envPath, envContent, 'utf-8');
    console.log('Session saved to .env.local (no login needed next time).\n');
  }

  const messages: RawMessage[] = [];
  const forwarded: ForwardedMessage[] = [];
  const unattributed: UnattributedMessage[] = [];
  let count = 0;

  for await (const msg of client.iterMessages(CHANNEL, { limit: undefined })) {
    if (!(msg instanceof Api.Message)) continue;
    if (!msg.message) continue;

    // Collect forwarded messages separately
    const fwdFrom = (msg as Api.Message & { fwdFrom?: { fromName?: string; postAuthor?: string } }).fwdFrom;
    if (fwdFrom) {
      forwarded.push({
        id: msg.id,
        date: new Date(msg.date * 1000).toISOString(),
        text: msg.message.slice(0, 1000),
        fromChannelTitle: fwdFrom.fromName,
        fromPostAuthor: fwdFrom.postAuthor,
      });
      continue;
    }

    const rawAuthor = (msg as Api.Message & { postAuthor?: string }).postAuthor;
    const dateStr = new Date(msg.date * 1000).toISOString();

    // Separate unattributed messages (no postAuthor)
    if (!rawAuthor) {
      // Auto-attribute: all unattributed messages assigned to Kuma
      // TODO: revisit attribution logic later
    }

    // Apply alias mapping, with fallback for signature-inferred author
    const postAuthor = rawAuthor
      ? (AUTHOR_ALIASES[rawAuthor] ?? rawAuthor)
      : 'Kuma';

    messages.push({
      id: msg.id,
      date: dateStr,
      text: msg.message.slice(0, 1000),
      postAuthor,
      views: (msg as Api.Message & { views?: number }).views ?? 0,
      forwards: (msg as Api.Message & { forwards?: number }).forwards ?? 0,
    });

    count++;
    if (count % 100 === 0) {
      console.log(`  Fetched ${count} messages...`);
    }
  }

  console.log(`\nTotal messages fetched: ${messages.length}`);
  console.log(`Forwarded messages filtered: ${forwarded.length}`);
  console.log(`Unattributed messages (no postAuthor): ${unattributed.length}`);

  const grouped = new Map<string, RawMessage[]>();
  for (const msg of messages) {
    const existing = grouped.get(msg.postAuthor) ?? [];
    existing.push(msg);
    grouped.set(msg.postAuthor, existing);
  }

  const contributors: ContributorData[] = Array.from(grouped.entries())
    .map(([name, msgs]) => {
      const sorted = msgs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return {
        name,
        messageCount: msgs.length,
        firstMessageDate: sorted[0].date,
        lastMessageDate: sorted[sorted.length - 1].date,
        messages: sorted,
      };
    })
    .sort((a, b) => b.messageCount - a.messageCount);

  const output: OutputData = {
    channel: CHANNEL,
    fetchedAt: new Date().toISOString(),
    totalMessages: messages.length,
    contributors,
  };

  const outputPath = path.resolve(process.cwd(), 'src/data/telegram-contributors.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`\nWritten to ${outputPath}`);
  console.log(`Contributors found: ${contributors.length}`);
  for (const c of contributors) {
    console.log(`  - ${c.name}: ${c.messageCount} messages`);
  }

  // Write forwarded messages for review
  if (forwarded.length > 0) {
    const forwardedPath = path.resolve(process.cwd(), 'src/data/forwarded-messages.json');
    fs.writeFileSync(forwardedPath, JSON.stringify(forwarded, null, 2), 'utf-8');
    console.log(`\nForwarded messages written to ${forwardedPath} (${forwarded.length} messages)`);
  }

  // Write unattributed messages for manual review
  if (unattributed.length > 0) {
    const unattributedPath = path.resolve(process.cwd(), 'src/data/unattributed-messages.json');
    fs.writeFileSync(unattributedPath, JSON.stringify(unattributed, null, 2), 'utf-8');
    console.log(`\nUnattributed messages written to ${unattributedPath} (${unattributed.length} messages)`);
  }

  await client.disconnect();
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
