import { serial, pgTable, varchar, timestamp, json } from "drizzle-orm/pg-core";

export const device_state = pgTable('device_state', {
    id: serial('id').primaryKey().notNull(),
    clientId: varchar('clientid', {length: 255}).notNull().unique(),
    username: varchar('username', {length: 255}).notNull(),
    topic: varchar('topic', {length: 255}).notNull().unique(),
    event: varchar('event', {length: 255}).notNull(),
    time: timestamp('time', { withTimezone: true }).notNull(),
    reason: varchar('reason', {length: 255}),
    peername: varchar('peername', {length: 255}),
    peerhost: varchar('peerhost', {length: 255}),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const DeviceStateSelectSchema = device_state.$inferSelect;
export const DeviceStateInsertSchema = device_state.$inferInsert;

export const payload = pgTable('payload', {
    id: serial('id').primaryKey().notNull(),
    clientId: varchar('client_id', {length: 255}).notNull().references(() => device_state.clientId),
    topic: varchar('topic', {length: 255}).notNull().references(() => device_state.topic),
    payload: json('payload').notNull(),
    time: timestamp('time', { withTimezone: true }).notNull(),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const PayloadSelectSchema = payload.$inferSelect;
export const PayloadInsertSchema = payload.$inferInsert;