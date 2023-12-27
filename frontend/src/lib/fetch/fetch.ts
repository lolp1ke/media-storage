import { mainConfig } from "@/config/main";

export function fetchApi(url: string, params?: RequestInit) {
	return fetch(`${mainConfig.FETCH_PREFIX}${url}`, {
		...params,
		mode: "cors",
		cache: "no-store",
		headers: {
			...params?.headers,
			"Content-Type": "application/json",
		},
	});
}
