# Neon Postgres Setup Guide

## Prerequisites

1. A Vercel account
2. Your project deployed on Vercel (or ready to deploy)

## Step 1: Add Neon Postgres Database to Your Vercel Project

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (`nasa-apod-app`)
3. Go to the "Storage" tab
4. Click "Create" next to **Neon** (Serverless Postgres)
5. Follow the setup wizard to create your database
6. Vercel will automatically add the database connection details

## Step 2: Environment Variables

Vercel will automatically add the following environment variables to your project:

- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` 
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Step 3: Local Development Setup

For local development, you'll need to:

1. Copy the environment variables from your Vercel dashboard
2. Create a `.env.local` file in your project root
3. Add the environment variables to the file

Example `.env.local`:
```
POSTGRES_URL="postgresql://username:password@host:port/database"
POSTGRES_PRISMA_URL="postgresql://username:password@host:port/database?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgresql://username:password@host:port/database"
POSTGRES_USER="username"
POSTGRES_HOST="host"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="database"
```

## Step 4: Initialize Database

Run the database initialization script to create the required tables:

```bash
npm run db:init
```

## Step 5: Test the Connection

The API routes are now configured to use the database:

- `POST /api/names` - Add a name to the database
- `GET /api/names` - Get all names from the database

## Database Schema

The database includes one table:

### Names Table
- `id` (SERIAL PRIMARY KEY)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `created_at` (TIMESTAMP)

## Troubleshooting

1. **Connection Issues**: Make sure your environment variables are correctly set
2. **Table Not Found**: Run `npm run db:init` to create the tables
3. **Permission Errors**: Check that your database user has the necessary permissions
4. **Neon-specific**: Ensure your Neon database is in the same region as your Vercel deployment for best performance

## Next Steps

Now that your database is connected, you can:
1. Build features that persist data
2. Add user authentication
3. Create more complex data relationships
4. Add data validation and sanitization

## Neon Benefits

- **Serverless**: Scales automatically
- **Branching**: Create database branches for development
- **Performance**: Optimized for serverless applications
- **Free Tier**: Generous free tier for development 