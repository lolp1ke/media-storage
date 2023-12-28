import { TObject } from "@/hooks/object/types";

export type TBucket = {
	readonly id: string;
	readonly name: string;
	readonly public: boolean;

	objects: TObject[];

	readonly createdAt: Date;
	readonly alteredAt: Date;
};
