import { invoices } from "@/db/schema";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const prerender = false;

export const PATCH: APIRoute = async ({ locals, params }) => {
	if (!params.id) {
		return new Response(null, {
			status: 400,
		});
	}

	await locals.db
		.update(invoices)
		.set({
			status: "paid",
		})
		.where(
			and(eq(invoices.userID, locals.user.id), eq(invoices.id, params.id))
		);

	return new Response(null, {
		status: 204,
	});
};
