/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_ENDPOINT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	type DB = import("./db").DB;
	interface Locals {
		user: {
			id: string;
			name: string;
			email: string | undefined | null;
			picture: string;
		};
		db: DB;
		session?: Lucia.Session;
		authRequest?: Lucia.AuthRequest;
	}
}

/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./lib/lucia").Auth;
	type Session = import("lucia").Session;
	type AuthRequest = import("lucia").AuthRequest;
	type DatabaseUserAttributes = {
		name: string;
		email: string | undefined | null;
		picture: string;
	};
	type DatabaseSessionAttributes = {};
}
