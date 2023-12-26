import { useBucket } from "@/hooks/bucket/useBucket";

interface Params {
	params: {
		bucket: string;
	};
}

export default async function page({ params }: Params) {
	const bucket = await useBucket().get<string>(params.bucket);

	return <>{bucket.id}</>;
}
