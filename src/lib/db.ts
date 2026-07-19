import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// ============================================================================
// Hydrasaurus Outreach AI — Multi-Provider Environment Validation
// ============================================================================
const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'ZOHO_CLIENT_ID',
  'ZOHO_CLIENT_SECRET',
  'ZOHO_REFRESH_TOKEN',
  'ZOHO_ACCOUNT_ID'
];

function validateStartupEnvironment() {
  const missing = REQUIRED_ENV_VARS.filter(key => !process.env[key] || process.env[key]?.trim() === '');
  
  const hasAiKey = Boolean(
    process.env.GEMINI_API_KEY ||
    process.env.GROK_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.OPENAI_API_KEY
  );

  if (!hasAiKey) {
    missing.push('AI_API_KEY (GEMINI_API_KEY, GROK_API_KEY, GROQ_API_KEY, or OPENAI_API_KEY)');
  }

  if (missing.length > 0) {
    throw new Error(
      `[Startup Validation Error]: Required environment variables missing: ${missing.join(', ')}. Please check your .env.local file.`
    );
  }
}

// Enforce validation on boot
validateStartupEnvironment();

// ============================================================================
// Global Prisma Client Singleton for PostgreSQL / Neon Database
// ============================================================================
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

function createPrismaClient(): PrismaClient {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
