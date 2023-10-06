import type { InvoiceSchema } from "@/components/InvoiceForm/schema";
import { invoices } from "@/db/schema";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
	const userID = locals.user.id;
	const { senderAddress, clientAddress, ...body }: InvoiceSchema =
		await request.json();
	body.items = body.items.map((item) => ({
		...item,
		total: item.price * item.quantity,
	}));

	await locals.db.insert(invoices).values({
		userID,
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
	});

	return new Response(null, {
		status: 201,
	});
};
