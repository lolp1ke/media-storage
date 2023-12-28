import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	Res,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { type Response } from "express";

import { ObjectService } from "./object.service";

import type { GetObjectDto, PreviewObjectDto, RemoveObjectDto, UploadObjectDto } from "./dto";

@Controller("/object")
export class ObjectController {
	constructor(private readonly objectService: ObjectService) {}

	@Post("/upload")
	@HttpCode(HttpStatus.CREATED)
	@UseInterceptors(FileInterceptor("file"))
	public async upload(@Body() dto: UploadObjectDto, @UploadedFile() file: Express.Multer.File) {
		console.log(dto, file);

		return this.objectService.upload(dto, file);
	}

	@Delete("/remove")
	@HttpCode(HttpStatus.OK)
	public async remove(@Body() dto: RemoveObjectDto) {
		return this.objectService.remove(dto);
	}

	@Get("/get/:objectId")
	@HttpCode(HttpStatus.OK)
	public async get(@Param() dto: GetObjectDto) {
		return this.objectService.get(dto);
	}

	@Get("/preview")
	@HttpCode(HttpStatus.OK)
	public async preview(@Query() dto: PreviewObjectDto, @Res() res: Response) {
		return this.objectService.preview(dto, res);
	}
}
