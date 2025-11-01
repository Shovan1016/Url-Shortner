// import { varchar } from "drizzle-orm/mysql-core";
import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";



export const urlsTable = pgTable('urls', {
    id: uuid("id").primaryKey().defaultRandom(),

    shortCode: varchar('code', { length: 155 }).notNull().unique(),
    targetUrl: text("target_url").notNull(),

    userId: uuid("user_id").references(() => usersTable.id).notNull(),

    hitCount: integer("hit_count").default(0).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})