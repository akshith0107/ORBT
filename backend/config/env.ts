import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'PORT',
  'DATABASE_URL',
  'JWT_SECRET',
  'GEMINI_API_KEY',
  'CLIENT_URL'
];

export function validateEnv() {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    missingVars.forEach((envVar) => {
      console.error(`Missing ${envVar}`);
    });
    console.error('Application failed to start due to missing required environment variables.');
    process.exit(1);
  }
}
