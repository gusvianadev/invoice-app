import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "./ui/use-toast";

type Props = {
	id: string;
};

export default function DeleteDialog({ id }: Props) {
	const { toast } = useToast();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="p-6 font-bold" variant="destructive">
					Delete
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-lg">
				<DialogHeader>
					<DialogTitle>Confirm Deletion</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete invoice {id}? This
						action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex-end flex-row justify-end gap-3">
					<DialogTrigger asChild>
						<Button size="lg" variant="secondary">
							Cancel
						</Button>
					</DialogTrigger>
					<Button
						size="lg"
						variant="destructive"
						onClick={async () => {
							try {
								const res = await fetch(`/api/invoice/${id}`, {
									method: "DELETE",
								});

								if (res.ok) {
									window.history.back();
								}
							} catch (err) {
								toast({
									title: "Whoops!",
									description: "Something went wrong.",
									variant: "destructive",
								});
							}
						}}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
