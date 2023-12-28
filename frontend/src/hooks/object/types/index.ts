export type TObject = {
	readonly id: string;
	readonly path: string;
	readonly type: string;
	readonly bucketId: string;

	readonly createdAt: Date;
	readonly alteredAt: Date;
};
