import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatMoney } from "@/lib/utils";
import type { Item } from "@/types";

type Props = {
	items: Item[];
};

export default function AmountDueTable({ items }: Props) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Item Name</TableHead>
					<TableHead>QTY.</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Total</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.map((item) => {
					return (
						<TableRow>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.quantity}</TableCell>
							<TableCell>
								{formatMoney(item.price, "United Kingdom")}
							</TableCell>
							<TableCell>
								{formatMoney(item.total, "United Kingdom")}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
