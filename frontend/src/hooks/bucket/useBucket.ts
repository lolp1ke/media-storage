import { fetchApi } from "@/lib/fetch/fetch";
import type { TBucket } from "./types";

export function useBucket() {
	async function get<T>(name?: string) {
		return fetchApi(`/bucket/get${name ? `/${name}` : "-all"}`, {
			method: "get",
		})
			.then((response) => {
				return response.json();
			})
			.then((response: T extends string ? TBucket : TBucket[]) => {
				return response;
			});
	}

	async function create(name: string, isPublic: boolean = false) {
		"use server";
		await fetchApi("/bucket/create", {
			method: "post",
			body: JSON.stringify({
				name,
				isPublic,
			}),
		});
	}

	return {
		get,
		create,
	};
}
