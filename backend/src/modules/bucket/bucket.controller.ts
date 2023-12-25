import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";

import { BucketService } from "./bucket.service";

import type { CreateBucketDto, DeleteBucketDto, GetBucketDto } from "./dto";

@Controller("/bucket")
export class BucketController {
	constructor(private readonly bucketService: BucketService) {}

	@Post("/create")
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() dto: CreateBucketDto) {
		return this.bucketService.create(dto);
	}

	@Delete("/delete")
	@HttpCode(HttpStatus.OK)
	public async delete(@Body() dto: DeleteBucketDto) {
		return this.bucketService.delete(dto);
	}

	@Get("/get/:name")
	@HttpCode(HttpStatus.OK)
	public async get(@Param() dto: GetBucketDto) {
		return this.bucketService.get(dto);
	}
}
