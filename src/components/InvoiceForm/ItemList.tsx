import { Input } from "@/components/ui/input";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFieldArray, type Control } from "react-hook-form";
import type { z } from "zod";
import formSchema from "./schema";

type Props = {
	control: Control<z.infer<typeof formSchema>>;
	watch: any;
};

export default function ItemList({ control, watch }: Props) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	return (
		<div className="col-span-full flex flex-col gap-10">
			{fields.map((item, index) => {
				return (
					<div
						className="grid grid-cols-[1fr,2fr,3fr] gap-3 md:grid-cols-[4fr,1fr,2fr,2fr]"
						key={item.id}
					>
						<FormField
							control={control}
							name={`items.${index}.name`}
							render={({ field }) => {
								return (
									<FormItem className="col-span-full md:col-span-1">
										<FormLabel
											htmlFor={`items.${index}.name`}
										>
											Item Name
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={control}
							name={`items.${index}.quantity`}
							render={({ field: { onChange, ...field } }) => {
								return (
									<FormItem>
										<FormLabel
											htmlFor={`items.${index}.quantity`}
										>
											Qty.
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={field.value || ""}
												onChange={(ev) => {
													onChange(
														Number(ev.target.value)
													);
												}}
												type="number"
												step=".01"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={control}
							name={`items.${index}.price`}
							render={({ field: { onChange, ...field } }) => {
								return (
									<FormItem>
										<FormLabel
											htmlFor={`items.${index}.price`}
										>
											Price
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={field.value || ""}
												onChange={(ev) => {
													onChange(
														Number(ev.target.value)
													);
												}}
												type="number"
												step=".01"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={control}
							name={`items.${index}.total`}
							render={({ field: { onChange, ...field } }) => {
								return (
									<FormItem>
										<FormLabel
											htmlFor={`items.${index}.total`}
										>
											Total
										</FormLabel>
										<div className="flex gap-2">
											<Input
												{...field}
												onChange={(ev) =>
													onChange(
														Number(ev.target.value)
													)
												}
												type="number"
												disabled
												value={
													watch(
														`items.${index}.quantity`
													) *
													watch(
														`items.${index}.price`
													)
												}
												step=".01"
												className="border-none bg-transparent"
											/>
											<Button
												onClick={() => {
													remove(index);
												}}
												variant="ghost"
												className="hover:bg-transparent hover:text-destructive"
											>
												<Trash />
											</Button>
										</div>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
				);
			})}
			<Button
				type="button"
				variant="secondary"
				className="text-gray-.01 w-full text-md"
				onClick={() => {
					append({
						name: "",
						quantity: 0,
						price: 0,
						total: 0,
					});
					setTimeout(() => {
						const element = document.querySelector(
							"main > *:last-child"
						)!;

						element.scrollTop = element.scrollHeight;
					}, 0);
				}}
			>
				<Plus
					className="stroke-current pb-1"
					strokeWidth={5}
					size={15}
				/>
				Add New Item
			</Button>
		</div>
	);
}
