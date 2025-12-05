import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
  email: text().notNull().unique()
})

export const courses = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().unique().notNull(),
  description: text(),
})