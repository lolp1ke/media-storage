export class UploadMediaDto {
	readonly bucketName: string;
	readonly path: string;
	readonly fileName: string;
}

export class GetMediaDto {
	readonly bucketName: string;
	readonly path: string;
	readonly fileName: string;
}

export class DeleteMediaDto {
	readonly bucketName: string;
	readonly path: string;
	readonly fileName: string;
}
