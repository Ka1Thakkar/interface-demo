import { createClient } from '@/utils/supabase/server'
// import 'dotenv/config'


import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { user_details } from './schema'
import { eq } from 'drizzle-orm'

const connectionString = process.env.DATABASE_URL
// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString || '', { prepare: false })
export const db = drizzle(client);