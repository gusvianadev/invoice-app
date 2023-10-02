export type SenderAddress = {
	street: string;
	city: string;
	postCode: string;
	country: string;
};

export type ClientAddress = {
	street: string;
	city: string;
	postCode: string;
	country: string;
};

export type Item = {
	name: string;
	quantity: number;
	price: number;
	total: number;
};

export type Invoice = {
	id: string;
	createdAt: number;
	paymentDue: number;
	description: string;
	paymentTerms: number;
	clientName: string;
	clientEmail: string;
	status: "paid" | "pending" | "draft";
	senderAddress: SenderAddress;
	clientAddress: ClientAddress;
	items: Item[];
	total: number;
};
