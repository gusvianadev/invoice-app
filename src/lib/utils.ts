import type { Invoice } from "@/db/schema/invoices";
import { type Invoice as ClientInvoice } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function createDate(dateString: string | number) {
	return new Date(dateString)
		.toLocaleDateString("en-GB", {
			year: "numeric",
			month: "short",
			day: "numeric",
			timeZone: "UTC",
		})
		.replace(",", "");
}

const currencies = {
	"Argentina": {
		countryCode: "es-AR",
		currency: "ARS",
	},
	"United Kingdom": {
		countryCode: "en-GB",
		currency: "GBP",
	},
	"United States of America": {
		countryCode: "en-US",
		currency: "USD",
	},
} as const;

export type Country = keyof typeof currencies;

export function formatMoney(amount: number, country?: keyof typeof currencies) {
	const currentCurrency =
		currencies[country || "United States of America"] ||
		currencies["United States of America"];

	return new Intl.NumberFormat(currentCurrency.countryCode || "en-US", {
		style: "currency",
		currency: currentCurrency.currency || "USD",
		minimumFractionDigits: 2,
	}).format(amount);
}

export function parseInvoice(invoice: Invoice) {
	const newInvoice = Object.entries(invoice).reduce((acc, [key, value]) => {
		if (value === null) {
			return {
				...acc,
				[key]: "",
			};
		}

		return {
			...acc,
			[key]: value,
		};
	}, {} as Invoice);
	return {
		...newInvoice,
		senderAddress: {
			street: newInvoice.senderStreet,
			city: newInvoice.senderCity,
			postCode: newInvoice.senderPostCode,
			country: newInvoice.senderCountry,
		},
		clientAddress: {
			street: newInvoice.clientStreet,
			city: newInvoice.clientCity,
			postCode: newInvoice.clientPostCode,
			country: newInvoice.clientCountry,
		},
	} as ClientInvoice;
}
