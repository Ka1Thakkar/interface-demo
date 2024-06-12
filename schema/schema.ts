import { pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";

export const user_details = pgTable('user_details', {

  id: uuid('id').primaryKey().unique(),
  fullName: text('full_name'),
  email: text('email').unique(),
  country: text('country'),
});