import type { InvoiceSchema } from "@/components/InvoiceForm/schema";
import { invoices } from "@/db/schema";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const prerender = false;

export const PATCH: APIRoute = async ({ request, locals, params }) => {
	if (!params.id) {
		return new Response(null, {
			status: 400,
		});
	}

	const { senderAddress, clientAddress, ...body }: InvoiceSchema =
		await request.json();

	body.items = body.items.map((item) => ({
		...item,
		total: item.price * item.quantity,
	}));

	await locals.db
		.update(invoices)
		.set({
			...body,
			paymentDue: body.createdAt + body.paymentTerms * 86400000,
			senderStreet: senderAddress.street,
			senderCity: senderAddress.city,
			senderPostCode: senderAddress.postCode,
			senderCountry: senderAddress.country,
			clientStreet: clientAddress.street,
			clientCity: clientAddress.city,
			clientPostCode: clientAddress.postCode,
			clientCountry: clientAddress.country,
			total: body.items.reduce(
				(acc, item) => acc + item.price * item.quantity,
				0
			),
		})
		.where(
			and(eq(invoices.userID, locals.user.id), eq(invoices.id, params.id))
		);

	return new Response(null, {
		status: 204,
	});
};

export const DELETE: APIRoute = async ({ locals, params }) => {
	if (!params.id) {
		return new Response(null, {
			status: 400,
		});
	}

	await locals.db
		.delete(invoices)
		.where(
			and(eq(invoices.userID, locals.user.id), eq(invoices.id, params.id))
		);

	return new Response(null, {
		status: 204,
	});
};
