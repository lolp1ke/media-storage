import { fetchApi } from "@/lib/fetch/fetch";
import type { TBucket } from "./types";

export function useBucket() {
	async function get<T>(name?: string) {
		return fetchApi(`/bucket/get${name ? `/${name}` : "-all"}`, {
			method: "GET",
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
			method: "POST",
			body: JSON.stringify({
				name,
				isPublic,
			}),
		});
	}

	async function remove(name: string) {
		"use server";

		await fetchApi(`/bucket/delete`, {
			method: "DELETE",
			body: JSON.stringify({
				name,
			}),
		});
	}

	return {
		get,
		create,
		remove,
	};
}
