import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { navigate } from "astro/transitions/router";

const options = ["draft", "pending", "paid"] as const;

export default function Filter() {
	const [isOpen, setIsOpen] = useState(false);
	const popoverRef = useRef<HTMLButtonElement>(null);

	return (
		<Popover onOpenChange={(ev) => setIsOpen(ev)}>
			<PopoverTrigger
				ref={popoverRef}
				className="flex items-center gap-3 px-5"
			>
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
				{options.map((opt) => {
					return (
						<div
							key={"filter" + opt}
							className="flex items-center justify-start gap-3"
						>
							<Input
								id={`filter-${opt}`}
								checked={new URLSearchParams(
									window.location.search
								)
									.get("filter")
									?.split(",")
									.includes(opt)}
								onChange={(ev) => {
									const params = new URLSearchParams(
										window.location.search
									);

									if (ev.target.checked) {
										params.set(
											"filter",
											`${
												params
													.get("filter")
													?.split(",")
													.concat(opt)
													.join(",") || opt
											}`
										);
									} else {
										params.set(
											"filter",
											`${params
												.get("filter")
												?.split(",")
												.filter((f) => f !== opt)
												.join(",")}`
										);
									}

									popoverRef.current?.click();
									navigate(
										`${
											window.location.pathname
										}?${params.toString()}`
									);
								}}
								type="checkbox"
								className="w-5"
								value={opt}
							/>
							<Label
								htmlFor={`filter-${opt}`}
								style={{
									lineHeight: 0,
								}}
								className="capitalize"
							>
								{opt}
							</Label>
						</div>
					);
				})}
			</PopoverContent>
		</Popover>
	);
}
