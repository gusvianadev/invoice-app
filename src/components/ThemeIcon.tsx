import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ThemeIcon() {
	const [theme, setTheme] = useState<"dark" | "light">("light");
	useEffect(() => {
		if (localStorage.getItem("theme") === "dark") {
			setTheme("dark");
			document.querySelector("body")!.classList.add("dark");
		} else {
			setTheme("light");
			document.querySelector("body")!.classList.remove("dark");
		}
	}, []);

	return (
		<Button
			variant="ghost"
			className="ml-auto h-full rounded-none px-6 hover:bg-navbar xl:mt-auto xl:mb-3 xl:h-fit"
			onClick={() => {
				if (theme === "light") {
					setTheme("dark");
					document.querySelector("body")!.classList.add("dark");
					localStorage.setItem("theme", "dark");
				} else {
					setTheme("light");
					document.querySelector("body")!.classList.remove("dark");
					localStorage.setItem("theme", "light");
				}
			}}
		>
			{theme === "light" ? <Moon className="fill-gray-500" /> : <Sun />}
		</Button>
	);
}
