import { Injectable } from "@nestjs/common";

import { FileHelper } from "@/helpers/file/file.helper";
import { StringHelper } from "@/helpers/string/string.helper";

import type { CreateFolderDto, DeleteFolderDto } from "./dto";

@Injectable()
export class FolderService {
	constructor(
		private readonly fileHelper: FileHelper,
		private readonly stringHelper: StringHelper
	) {}

	public async create(dto: CreateFolderDto) {
		dto.bucket = this.stringHelper.normzalizer(dto.bucket);
		dto.name = this.stringHelper.normzalizer(dto.name);

		await this.fileHelper.mkdir(`${dto.bucket}/${dto.name}`);
	}

	public async delete(dto: DeleteFolderDto) {
		dto.bucket = this.stringHelper.normzalizer(dto.bucket);
		dto.path = this.stringHelper.normzalizer(dto.path);

		await this.fileHelper.rm_rf(`${dto.bucket}/${dto.path}`);
	}
}
