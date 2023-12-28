export class CreateFolderDto {
	bucket: string;
	name: string;
}

export class DeleteFolderDto {
	bucket: string;
	path: string;
}
