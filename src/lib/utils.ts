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

export async function req(
	path: string,
	props?: {
		body?: string;
		method?: Request["method"];
		headers?: { [key: string]: string };
	}
) {
	const opts: RequestInit = {};
	if (props?.method) opts.method = props.method;
	if (props?.body) opts.body = props.body;
	if (props?.headers) opts.headers = props.headers;

	return await fetch(`${import.meta.env.PUBLIC_ENDPOINT}${path}`, {
		credentials: "include",
		...opts,
	});
}
