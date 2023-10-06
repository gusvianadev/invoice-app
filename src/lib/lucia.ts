// src/lib/lucia.ts
import { client } from "@/db";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { google } from "@lucia-auth/oauth/providers";
import { lucia } from "lucia";
import { astro } from "lucia/middleware";

export const auth = lucia({
	adapter: libsql(client, {
		user: "users",
		session: "user_sessions",
		key: "user_keys",
	}),
	env: import.meta.env.DEV ? "DEV" : "PROD",
	middleware: astro(),
	getUserAttributes: (data) => {
		return {
			id: data.id,
			name: data.name,
			picture: data.picture,
			email: data.email,
		};
	},
});

export const googleAuth = google(auth, {
	clientId: import.meta.env.GOOGLE_CLIENT_ID,
	clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
	redirectUri: `${import.meta.env.GOOGLE_REDIRECT}/auth/google/`,
});

export type Auth = typeof auth;
