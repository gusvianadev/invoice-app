import {
	Select as Sel,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Props = {
	value?: number;
	onChange: any;
};

export default function Select({ value, onChange }: Props) {
	const placeholders = {
		1: "Net 1 Day",
		7: "Net 7 Days",
		14: "Net 14 Days",
		30: "Net 30 Days",
	};
	return (
		<Sel
			name="payment-terms"
			defaultValue={value?.toString() || "1"}
			onValueChange={(val) => onChange(Number(val))}
			required
		>
			<SelectTrigger className="w-full">
				<SelectValue>
					{placeholders[Number(value) as keyof typeof placeholders] ||
						placeholders[1]}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="1">Net 1 Day</SelectItem>
					<SelectItem value="7">Net 7 Days</SelectItem>
					<SelectItem value="14">Net 14 Days</SelectItem>
					<SelectItem value="30">Net 30 Days</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Sel>
	);
}
