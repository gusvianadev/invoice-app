import * as z from "zod";

const schema = z.object({
	createdAt: z.number().int().positive(),
	description: z.string(),
	paymentTerms: z.number().int().positive(),
	clientName: z.string(),
	clientEmail: z.string(),
	senderAddress: z.object({
		street: z.string(),
		city: z.string(),
		postCode: z.string(),
		country: z.string(),
	}),
	clientAddress: z.object({
		street: z.string(),
		city: z.string(),
		postCode: z.string(),
		country: z.string(),
	}),
	items: z.array(
		z.object({
			name: z.string(),
			quantity: z.number(),
			price: z.number(),
			total: z.number(),
		})
	),
});

export type InvoiceSchema = z.infer<typeof schema>;

export default schema;
