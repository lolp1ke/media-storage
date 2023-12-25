import { fetchApi } from "@/lib/fetch/fetch";

import { useCookies } from "@/hooks/cookies/useCookies";

import type { ISignIn, ISignOut } from "./types";

export function useAuth() {
	async function signIn(params: ISignIn) {
		"use server";
		const sessionId = await fetchApi("/auth/sign-in", {
			method: "POST",
			body: JSON.stringify(params),
		}).then((response) => {
			return response.text();
		});

		console.log(sessionId);

		useCookies().create({
			name: "sessionId",
			value: sessionId,
		});
	}

	async function signOut(params: ISignOut) {
		"use server";
		const sessionId = useCookies().get("session");

		await fetchApi("/auth/sign-out", {
			method: "POST",
			body: JSON.stringify({
				sessionId,
			}),
		});

		useCookies().clear("sessionId");
	}

	return {
		signIn,
		signOut,
	};
}
