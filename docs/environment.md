# Environment Configuration Guide

This document outlines the environment configuration required to run the ORBT platform locally or in production.

## Generating a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Navigate to "Get API Key" on the left sidebar.
4. Click "Create API Key".
5. Copy the generated key and add it to your `backend/.env` file under `GEMINI_API_KEY`.

## Configuring the Database

The ORBT platform uses PostgreSQL. The backend connects using Prisma ORM.

1. Install PostgreSQL and create a database (e.g., `orbt`).
2. Add your database connection string to `backend/.env`:
   `DATABASE_URL=postgresql://username:password@localhost:5432/orbt`
3. Run Prisma migrations:
   ```bash
   cd backend
   npx prisma migrate dev
   ```

## Running Locally

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd advanced_habit_tracker
   ```

2. **Configure Backend**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your actual values
   npm install
   npm run dev
   ```

3. **Configure Frontend**
   ```bash
   cd ../frontend
   cp .env.example .env.local
   # Edit .env.local with your actual values
   npm install
   npm run dev
   ```

## Production Configuration

When deploying to production (e.g., Vercel for frontend, Render/Railway for backend):

- **Backend**: Set all variables from `backend/.env.example` in your hosting provider's environment variables dashboard. Ensure `NODE_ENV=production`.
- **Frontend**: Set all `NEXT_PUBLIC_*` variables from `frontend/.env.example` in Vercel.
- **Security**: Never commit `.env`, `.env.local`, or `.env.production` to version control. They are ignored in `.gitignore` by default.

## Validation

The platform includes startup validation for environment variables.
- The **backend** will crash immediately if `PORT`, `DATABASE_URL`, `JWT_SECRET`, or `GEMINI_API_KEY` are missing.
- The **frontend** will fail to build or start if `NEXT_PUBLIC_API_URL` is missing.
