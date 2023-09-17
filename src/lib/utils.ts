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
	const currentCurrency = currencies[country || "United States of America"];

	return new Intl.NumberFormat(currentCurrency.countryCode || "en-US", {
		style: "currency",
		currency: currentCurrency.currency || "USD",
		minimumFractionDigits: 2,
	}).format(amount);
}
