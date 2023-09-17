import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import Select from "@/components/Select";
import DatePicker from "@/components/DatePicker";
import ItemList from "./ItemList";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type Invoice } from "@/types";
import { useForm } from "react-hook-form";
import formSchema from "./schema";

type Props = {
	invoice?: Invoice;
};

const defaultInvoice: Invoice = {
	id: "",
	createdAt: Date.now(),
	paymentDue: Date.now(),
	status: "",
	description: "",
	paymentTerms: 1,
	clientName: "",
	clientEmail: "",
	senderAddress: {
		street: "",
		city: "",
		postCode: "",
		country: "",
	},
	clientAddress: {
		street: "",
		city: "",
		postCode: "",
		country: "",
	},
	items: [],
	total: 0,
};

export default function ProfileForm({ invoice }: Props) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: invoice || defaultInvoice,
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	const billFrom = [
		{
			id: "street",
			label: "Street Address",
			value: invoice?.senderAddress.street,
		},
		{
			id: "city",
			label: "City",
			class: "w-[45%]",
			value: invoice?.senderAddress.city,
		},
		{
			id: "postCode",
			label: "Post Code",
			class: "w-[45%]",
			value: invoice?.senderAddress.postCode,
		},
		{
			id: "country",
			label: "Country",
			value: invoice?.senderAddress.country,
		},
	];

	const billTo = [
		{
			id: "clientName",
			label: "Client's Name'",
			value: invoice?.clientName,
		},
		{
			id: "clientEmail",
			label: "Client's Email",
			value: invoice?.clientEmail,
		},
		{
			id: "street",
			label: "Street Address",
			value: invoice?.clientAddress.street,
		},
		{
			id: "city",
			label: "City",
			class: "w-[45%]",
			value: invoice?.clientAddress.city,
		},
		{
			id: "postCode",
			label: "Post Code",
			class: "w-[45%]",
			value: invoice?.clientAddress.postCode,
		},
		{
			id: "country",
			label: "Country",
			value: invoice?.clientAddress.country,
		},
	];

	return (
		<Form {...form}>
			<form
				className="flex flex-wrap gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
				id="invoice-form"
			>
				<h3 className="-mb-3 w-full text-primary">Bill From</h3>
				{billFrom.map((item) => {
					return (
						<FormField
							control={form.control}
							name={`senderAddress.${item.id}` as any}
							key={`senderAddress.${item.id}`}
							render={({ field }) => (
								<FormItem
									className={cn("w-full grow", item.class)}
								>
									<FormLabel>{item.label}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					);
				})}
				<h3 className="mt-4 -mb-3 w-full text-primary">Bill To</h3>
				{billTo.map((item, i) => {
					return (
						<FormField
							control={form.control}
							name={
								i < 2
									? item.id
									: (`clientAddress.${item.id}` as any)
							}
							key={`clientAddress.${item.id}`}
							render={({ field }) => (
								<FormItem
									className={cn("w-full grow", item.class)}
								>
									<FormLabel>{item.label}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					);
				})}
				<FormField
					control={form.control}
					name="createdAt"
					render={({ field }) => (
						<FormItem className="w-full grow">
							<FormLabel
								className={
									invoice !== undefined ? "text-gray-600" : ""
								}
							>
								Invoice Date
							</FormLabel>
							<DatePicker
								onChange={field.onChange}
								disabled={invoice !== undefined}
								defaultValue={field.value}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="paymentTerms"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Payment Terms</FormLabel>
							<FormControl>
								<Select
									onChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="w-full grow">
							<FormLabel>Project / Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<h3 className="mt-4 w-full text-lg text-gray-700 dark:text-gray-400">
					Item List
				</h3>
				<ItemList control={form.control} />
			</form>
		</Form>
	);
}
