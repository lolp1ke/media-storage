import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { mainConfig } from "@/config/main";

export function useCookies() {
	function create(params: ResponseCookie) {
		cookies().set({
			...params,

			name: `${mainConfig.COOKIES_PREFIX}${params.name}`,
			path: params.path ?? "/",
		});
	}

	function get(name: string) {
		return cookies().get(`${mainConfig.COOKIES_PREFIX}${name}`)?.value;
	}

	function clear(name: string) {
		cookies().delete(`${mainConfig.COOKIES_PREFIX}${name}`);
	}

	return {
		create,
		get,
		clear,
	};
}
