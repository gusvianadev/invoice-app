import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const options = ["draft", "pending", "paid"];

export default function Filter() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover onOpenChange={(ev) => setIsOpen(ev)}>
			<PopoverTrigger className="flex items-center gap-3 px-5">
				<span className="md:hidden">Filter</span>
				<span className="hidden md:block">Filter by status</span>
				<ChevronDown
					size={17}
					strokeWidth={3}
					className="stroke-primary"
					style={{
						transform: isOpen ? "rotate(0deg)" : "rotate(-180deg)",
						transition: "transform 0.2s ease-in-out",
					}}
				/>
			</PopoverTrigger>
			<PopoverContent className="flex w-fit flex-col pr-10 md:pr-20">
				{options.map((opt) => (
					<div
						key={"filter" + opt}
						className="flex items-center justify-start gap-3"
					>
						<Input type="checkbox" className="w-5" value={opt} />
						<Label
							htmlFor="draft"
							style={{
								lineHeight: 0,
							}}
							className="capitalize"
						>
							{opt}
						</Label>
					</div>
				))}
			</PopoverContent>
		</Popover>
	);
}
