import googleOauth from "@/assets/img/btn_google_dark_normal_ios.svg";
import { useToast } from "./ui/use-toast";

export default function SignIn() {
	const { toast } = useToast();
	return (
		<div
			onClick={async () => {
				try {
					const res = await fetch("/api/auth/google");

					if (res.ok) {
						location.href = await res.text();
					} else {
						throw new Error();
					}
				} catch (err) {
					toast({
						title: "Whoops!",
						description: "Something went wrong.",
						variant: "destructive",
					});
				}
			}}
			className={`px  mx-auto flex w-fit cursor-pointer select-none items-center gap-2 border-purple-500 border-opacity-30 p-3 duration-150 animate-in hover:bg-purple-500 hover:bg-opacity-10`}
		>
			<img src={googleOauth.src} />
			<p className="text-lg">Sign in with Google</p>
		</div>
	);
}
