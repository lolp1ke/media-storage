import { IsNotEmpty, IsOptional } from "class-validator";

export class UploadObjectDto {
	@IsNotEmpty()
	bucket: string;

	@IsOptional()
	path?: string;

	@IsNotEmpty()
	name: string;
}

export class GetObjectDto {
	@IsNotEmpty()
	readonly objectId: string;
}

export class RemoveObjectDto {
	@IsNotEmpty()
	readonly objectId: string;
}

export class PreviewObjectDto {
	@IsNotEmpty()
	readonly objectId: string;

	@IsNotEmpty()
	bucket: string;

	@IsOptional()
	jwt?: string;
}
