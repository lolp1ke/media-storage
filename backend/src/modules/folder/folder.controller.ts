import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { FolderService } from "./folder.service";

import type { CreateFolderDto, DeleteFolderDto } from "./dto";

@Controller("/folder")
export class FolderController {
	constructor(private readonly folderService: FolderService) {}

	@Post("/create")
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() dto: CreateFolderDto) {
		return this.folderService.create(dto);
	}

	@Delete("/delete")
	@HttpCode(HttpStatus.OK)
	public async delete(@Body() dto: DeleteFolderDto) {
		return this.folderService.delete(dto);
	}
}
