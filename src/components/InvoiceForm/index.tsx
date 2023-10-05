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
import formSchema, { type InvoiceSchema } from "./schema";
import { useToast } from "../ui/use-toast";

type Props = {
	invoice?: Invoice;
};

const defaultInvoice: Omit<Invoice, "id" | "total" | "paymentDue"> = {
	createdAt: Date.now(),
	status: "pending",
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
};

export default function ProfileForm({ invoice }: Props) {
	const { toast } = useToast();

	const form = useForm<InvoiceSchema>({
		// @ts-ignore: next-line
		resolver: zodResolver(formSchema),
		defaultValues: invoice || defaultInvoice,
	});

	async function onSubmit(values: z.infer<typeof formSchema>, ev: any) {
		try {
			const isDraft = ev.nativeEvent.submitter.id === "draft-btn";

			// @ts-ignore: next-line
			values.status = isDraft ? "draft" : "pending";

			const res = await fetch(
				`/api/invoice${invoice ? `/${invoice.id}` : ""}`,
				{
					method: invoice ? "PATCH" : "POST",
					body: JSON.stringify(values),
				}
			);

			if (res.ok) {
				window.history.back();
			}
		} catch (err) {
			toast({
				title: "Whoops!",
				description: "Something went wrong",
				variant: "destructive",
			});
		}
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
			class: "col-span-1",
			value: invoice?.senderAddress.city,
		},
		{
			id: "postCode",
			label: "Post Code",
			class: "col-span-1",
			value: invoice?.senderAddress.postCode,
		},
		{
			id: "country",
			label: "Country",
			class: "md:col-span-1",
			value: invoice?.senderAddress.country,
		},
	];

	const billTo = [
		{
			id: "clientName",
			label: "Client's Name",
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
			class: "col-span-1",
			value: invoice?.clientAddress.city,
		},
		{
			id: "postCode",
			label: "Post Code",
			class: "col-span-1",
			value: invoice?.clientAddress.postCode,
		},
		{
			id: "country",
			label: "Country",
			class: "md:col-span-1",
			value: invoice?.clientAddress.country,
		},
	];

	return (
		<Form {...form}>
			<form
				className="grid grid-cols-2 gap-5 md:grid-cols-3"
				onSubmit={form.handleSubmit(onSubmit)}
				id="invoice-form"
			>
				<h3 className="col-span-full -mb-3 text-primary">Bill From</h3>
				{billFrom.map((item) => {
					return (
						<FormField
							control={form.control}
							name={`senderAddress.${item.id}` as any}
							key={`senderAddress.${item.id}`}
							render={({ field }) => (
								<FormItem
									className={cn("col-span-full", item.class)}
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
				<h3 className="col-span-full -mb-3 mt-4 text-primary">
					Bill To
				</h3>
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
									className={cn("col-span-full", item.class)}
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
				<div className="col-span-full grid gap-5 md:grid-cols-2">
					<FormField
						control={form.control}
						name="createdAt"
						render={({ field }) => (
							<FormItem>
								<FormLabel
									className={
										invoice !== undefined
											? "text-gray-600"
											: ""
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
							<FormItem>
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
				</div>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="col-span-full">
							<FormLabel>Project / Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<h3 className="col-span-full mt-4 text-lg text-gray-700 dark:text-gray-400">
					Item List
				</h3>
				<ItemList control={form.control} watch={form.watch} />
			</form>
		</Form>
	);
}
