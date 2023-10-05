import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useToast } from "./ui/use-toast";

export default function Avatar() {
	const src = localStorage.getItem("avatar");
	const { toast } = useToast();

	return src ? (
		<Popover>
			<PopoverTrigger className="flex h-full w-full cursor-pointer items-center">
				<img
					src={src}
					alt="user avatar"
					className="mx-3 h-9 w-9 rounded-full xl:mx-auto xl:my-4"
				/>
			</PopoverTrigger>
			<PopoverContent className="flex w-full flex-col">
				<Button
					onClick={async () => {
						const res = await fetch("/api/auth/logout", {
							method: "POST",
						});

						if (res.ok) {
							localStorage.removeItem("userID");
							localStorage.removeItem("avatar");
							location.href = "/";
						} else {
							toast({
								title: "Whoops!",
								description: "Something went wrong",
								variant: "destructive",
							});
						}
					}}
					className="px-5"
					variant="ghost"
				>
					Log out
				</Button>
			</PopoverContent>
		</Popover>
	) : null;
}
