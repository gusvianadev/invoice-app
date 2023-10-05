import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

export const client = createClient({
	url: import.meta.env.DATABASE_URL!,
	authToken: import.meta.env.DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(client, {
	schema,
});

export type DB = typeof db;
