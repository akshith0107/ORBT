import { defineConfig } from '@prisma/config';

export default defineConfig({
  earlyAccess: true,
  studio: {
    port: 5555,
  },
  migrate: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/habits?schema=public',
  },
});
