import { useEffect } from "react";
import gorilla from "@/assets/img/gorilla.jpeg";
import { navigate } from "astro/transitions/router";

export default function Redirect() {
	async function redirect() {
		const params = new URLSearchParams(location.search);

		const res = await fetch(`/api/auth/google/callback?${params}`);

		if (res.ok) {
			const user = await res.json();
			localStorage.setItem("avatar", user.picture);
			navigate("/");
		} else {
			navigate("/login/");
		}
	}
	useEffect(() => {
		redirect();
	}, []);

	return (
		<div className="row-span-full mx-auto flex flex-col items-center justify-center">
			<img src={gorilla.src} />
		</div>
	);
}
