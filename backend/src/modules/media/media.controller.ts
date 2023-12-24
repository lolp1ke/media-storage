import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	Res,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { MediaService } from "./media.service";

import type { DeleteMediaDto, GetMediaDto, UploadMediaDto } from "./dto";
import { Response } from "express";

@Controller("/media")
export class MediaContorller {
	constructor(private readonly mediaService: MediaService) {}

	@Post("/upload")
	@HttpCode(HttpStatus.CREATED)
	@UseInterceptors(FileInterceptor("file"))
	public async upload(@UploadedFile() file: Express.Multer.File, @Body() dto: UploadMediaDto) {
		return this.mediaService.upload(file, dto);
	}

	@Get("/get")
	@HttpCode(HttpStatus.OK)
	public async get(@Query() dto: GetMediaDto, @Res() res: Response) {
		return this.mediaService.get(dto, res);
	}

	@Delete("/delete")
	public async delete(@Body() dto: DeleteMediaDto) {
		return this.mediaService.delete(dto);
	}
}
