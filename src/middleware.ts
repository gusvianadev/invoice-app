import { defineMiddleware } from "astro:middleware";
import { auth } from "./lib/lucia";
import { db } from "./db";

export const onRequest = defineMiddleware(async (ctx, next) => {
	const {
		url: { pathname },
	} = ctx;

	if (
		pathname !== "/auth/google/" &&
		pathname !== "/api/auth/google" &&
		pathname !== "/api/auth/google/callback"
	) {
		const authRequest = auth.handleRequest(ctx);
		const session = await authRequest.validate();

		if (pathname === "/login/") {
			if (!session) {
				return next();
			} else {
				return ctx.redirect("/");
			}
		}

		if (!session) {
			return ctx.redirect("/login/");
		} else {
			ctx.locals.user = session.user;
			ctx.locals.db = db;
			if (pathname === "/api/auth/logout") {
				ctx.locals.session = session;
				ctx.locals.authRequest = authRequest;
			}
		}
	}

	return next();
});
