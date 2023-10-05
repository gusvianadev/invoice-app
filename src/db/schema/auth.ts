import { relations } from "drizzle-orm";
import { blob, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { invoices } from "./invoices";

export const users = sqliteTable("users", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").unique(),
	picture: text("picture").notNull(),
});

export const session = sqliteTable("user_sessions", {
	id: text("id").primaryKey(),
	userID: text("user_id")
		.notNull()
		.references(() => users.id),
	activeExpires: blob("active_expires", {
		mode: "bigint",
	}).notNull(),
	idleExpires: blob("idle_expires", {
		mode: "bigint",
	}).notNull(),
});

export const key = sqliteTable("user_keys", {
	id: text("id").primaryKey(),
	userID: text("user_id")
		.notNull()
		.references(() => users.id),
	hashedPassword: text("hashed_password"),
});

export const userRelations = relations(users, ({ many }) => ({
	invoices: many(invoices),
}));
