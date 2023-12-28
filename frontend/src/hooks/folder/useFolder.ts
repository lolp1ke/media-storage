import { fetchApi } from "@/lib/fetch/fetch";

export function useFolder() {
	async function create(bucket: string, name: string) {
		await fetchApi("/folder/create", {
			method: "post",
			body: JSON.stringify({
				bucket,
				name,
			}),
		});
	}

	async function remove(bucket: string, name: string) {
		await fetchApi("/folder/delete", {
			method: "delete",
			body: JSON.stringify({
				bucket,
				name,
			}),
		});
	}

	return {
		create,
		remove,
	};
}
