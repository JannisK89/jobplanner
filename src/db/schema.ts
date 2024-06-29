import { pgTable, boolean, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const planTable = pgTable('plan_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  text1: text('text1').notNull(),
  text2: text('text2').notNull(),
  text3: text('text3').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  status: text('status').notNull().default('proposed'),
})

export const occupationTable = pgTable('occupation_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  education: boolean('education').notNull(),
  experience: boolean('experience').notNull(),
  planId: uuid('plan_id')
    .notNull()
    .references(() => planTable.id, { onDelete: 'cascade' }),
})

export type InsertPlan = typeof planTable.$inferInsert
export type SelectPlan = typeof planTable.$inferSelect

export type InsertOccupation = typeof occupationTable.$inferInsert
export type SelectOccuoation = typeof occupationTable.$inferSelect
