import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

type Props = {
	id: string;
	paid: boolean;
};

export default function MarkAsPaidBtn({ id, paid }: Props) {
	const { toast } = useToast();

	return (
		<Button
			disabled={paid}
			className="p-6 font-bold"
			onClick={async () => {
				try {
					const res = await fetch(`/api/invoice/${id}/paid`, {
						method: "PATCH",
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
			Mark as Paid
		</Button>
	);
}
