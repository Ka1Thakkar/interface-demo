import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./schema/schema.ts",
  out: "./supabase/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgres://postgres.rzheyfgmicorpoaegskc:vpvUfdYECfHaLl3Q@aws-0-ap-south-1.pooler.supabase.com:6543/postgres', // Ensure url is always a string, not undefined
  }
});