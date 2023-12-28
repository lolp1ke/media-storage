import { fetchApi } from "@/lib/fetch/fetch";
import axios from "axios";

export function useObject() {
	async function upload(params: FormData) {
		await axios({
			url: "http://127.0.0.1:5000/api/v1/object/upload",
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: params,
		});

		// await fetchApi("/object/upload", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "multipart/form-data",
		// 	},
		// 	body: params,
		// });
	}

	async function remove() {}

	async function get() {}

	async function preview() {}

	return {
		upload,
		remove,
		get,
		preview,
	};
}
