import type { APIRoute } from "astro";
import { auth, googleAuth } from "@/lib/lucia";
import { parseCookie } from "lucia/utils";
import { OAuthRequestError } from "@lucia-auth/oauth";

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
	console.log("Hello from callback");
	const cookie = request.headers.get("cookie") || "";
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");

	const cookies = parseCookie(cookie);
	const storedState = cookies.google_oauth_state;

	if (!state || !storedState || storedState !== state || !code) {
		console.log(state);
		console.log(storedState);
		console.log(code);
		return new Response("Unauthorized", {
			status: 401,
			statusText: "Unauthorized",
		});
	}

	try {
		const { getExistingUser, googleUser, createUser } =
			await googleAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;

			const user = await createUser({
				attributes: {
					name: googleUser.name,
					email: googleUser.email || "",
					picture: googleUser.picture,
				},
			});

			return user;
		};

		const user = await getUser();
		console.log(user);
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});
		console.log(session);
		const sessionCookie = auth.createSessionCookie(session);
		console.log(sessionCookie);

		return new Response(
			JSON.stringify({
				id: user.userId,
				picture: googleUser.picture,
			}),
			{
				headers: {
					"Set-Cookie": sessionCookie.serialize(),
				},
			}
		);
	} catch (err) {
		if (err instanceof OAuthRequestError) {
			return new Response("Unauthorized", {
				status: 401,
				statusText: "Unauthorized",
			});
		}
		return new Response("Something went wrong", {
			status: 500,
		});
	}
};
