import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type Props = {
	defaultValue?: number;
	disabled?: boolean;
	onChange: any;
};

export default function DatePicker({
	defaultValue,
	disabled,
	onChange,
}: Props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant="outline"
						className="rounded-xs w-full justify-between text-left font-normal text-muted-foreground"
						disabled={disabled}
					>
						<span>
							{defaultValue
								? createDate(defaultValue)
								: "Pick a date"}
						</span>
						<CalendarIcon className="mr-2 h-4 w-4" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={defaultValue ? new Date(defaultValue) : undefined}
					onSelect={(ev) => {
						onChange(ev?.getTime());
					}}
					disabled={(date) =>
						date > new Date() || date < new Date("1900-01-01")
					}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
