import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBucketDto {
	@IsNotEmpty()
	name: string;

	@IsOptional()
	readonly public?: boolean;
}

export class DeleteBucketDto {
	@IsNotEmpty()
	name: string;
}

export class GetBucketDto {
	@IsNotEmpty()
	name: string;
}
