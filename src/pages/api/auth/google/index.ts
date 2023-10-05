import { googleAuth } from "@/lib/lucia";
import type { APIRoute } from "astro";
import { serializeCookie } from "lucia/utils";

export const GET: APIRoute = async () => {
	const [url, state] = await googleAuth.getAuthorizationUrl();
	const stateCookie = serializeCookie("google_oauth_state", state, {
		httpOnly: true,
		secure: import.meta.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60,
		sameSite: "strict",
	});

	return new Response(url.toString(), {
		headers: {
			"Set-Cookie": stateCookie,
		},
	});
};
