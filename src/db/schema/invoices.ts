import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./auth";

export const invoices = sqliteTable("invoices", {
	id: text("id", { length: 6, mode: "text" })
		.$defaultFn(() => {
			let id = "";
			for (let i = 0; i < 2; i++) {
				const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
				id += alphabet[Math.floor(Math.random() * alphabet.length)];
			}

			for (let i = 0; i < 4; i++) {
				id += Math.floor(Math.random() * 10);
			}
			return id;
		})
		.primaryKey()
		.unique()
		.notNull(),
	createdAt: integer("created_at")
		.$defaultFn(() => Date.now())
		.notNull(),
	paymentDue: integer("payment_due").notNull(),
	description: text("description", { length: 100, mode: "text" }),
	paymentTerms: integer("payment_terms", { mode: "number" })
		.default(1)
		.notNull(),
	clientName: text("client_name", { length: 100, mode: "text" }),
	clientEmail: text("client_email", { length: 100, mode: "text" }),
	status: text("status", { length: 7, mode: "text" })
		.default("pending")
		.notNull(),
	senderStreet: text("sender_street", {
		length: 200,
		mode: "text",
	}),
	senderCity: text("sender_city", {
		length: 100,
		mode: "text",
	}),
	senderPostCode: text("sender_post_code", {
		length: 50,
		mode: "text",
	}),
	senderCountry: text("sender_country", {
		length: 56,
		mode: "text",
	}),
	clientStreet: text("client_street", {
		length: 200,
		mode: "text",
	}),
	clientCity: text("client_city", {
		length: 100,
		mode: "text",
	}),
	clientPostCode: text("client_post_code", {
		length: 50,
		mode: "text",
	}),
	clientCountry: text("client_country", {
		length: 56,
		mode: "text",
	}),
	items: text("items", { mode: "json" })
		.default("[]")
		.$type<
			{
				name: string;
				quantity: number;
				price: number;
				total: number;
			}[]
		>()
		.notNull(),
	total: integer("total", { mode: "number" }).default(0).notNull(),
	userID: text("user_id").notNull(),
});

export const invoiceRelations = relations(invoices, ({ one }) => ({
	user: one(users, {
		fields: [invoices.userID],
		references: [users.id],
	}),
}));

export type Invoice = typeof invoices.$inferSelect;
