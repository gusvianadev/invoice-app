import * as z from "zod";

export default z.object({
	createdAt: z.number().int().positive(),
	paymentDue: z.number().int().positive(),
	description: z.string().nonempty(),
	paymentTerms: z.number().int().positive(),
	clientName: z.string().nonempty(),
	clientEmail: z.string().email(),
	senderAddress: z.object({
		street: z.string().nonempty(),
		city: z.string().nonempty(),
		postCode: z.string().nonempty(),
		country: z.string().nonempty(),
	}),
	clientAddress: z.object({
		street: z.string(),
		city: z.string(),
		postCode: z.string(),
		country: z.string(),
	}),
	items: z.array(
		z.object({
			name: z.string().nonempty(),
			quantity: z.number().nonnegative(),
			price: z.number().nonnegative(),
			total: z.number().nonnegative(),
		})
	),
	total: z.number().nonnegative(),
});
