import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { type Response } from "express";

import { PrismaService } from "@/modules/prisma/prisma.service";
import { BucketService } from "@/modules/bucket/bucket.service";
import { FileHelper } from "@/helpers/file/file.helper";
import { StringHelper } from "@/helpers/string/string.helper";

import type { GetObjectDto, PreviewObjectDto, RemoveObjectDto, UploadObjectDto } from "./dto";

@Injectable()
export class ObjectService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly bucketService: BucketService,
		private readonly fileHelper: FileHelper,
		private readonly stringHelper: StringHelper
	) {}

	public async upload(dto: UploadObjectDto, file: Express.Multer.File) {
		dto.bucket = this.stringHelper.normzalizer(dto.bucket);

		const bucket = await this.bucketService.get({ name: dto.bucket });

		dto.path = dto.bucket + this.stringHelper.normzalizer(dto.path);
		dto.name = this.stringHelper.normzalizer(dto.name) + "." + file.mimetype.substring(6);

		const exist = await this.prismaService.object.findUnique({
			where: {
				path: `${dto.path}/${dto.name}`,
			},
		});
		if (exist) throw new ConflictException("Object already exists", "Try to rename the object");

		await this.fileHelper.mkdir(dto.path);
		await this.fileHelper.write(dto.path, dto.name, file.buffer);

		return this.prismaService.object.create({
			data: {
				bucket: {
					connect: {
						id: bucket.id,
					},
				},
				path: `${dto.path}/${dto.name}`,
				type: file.mimetype,
			},
		});
	}

	public async get(dto: GetObjectDto) {
		return this.prismaService.object
			.findUnique({
				where: {
					id: dto.objectId,
				},
			})
			.then((object) => {
				if (!object) throw new NotFoundException("Object not found", "Double check object id");

				return object;
			});
	}

	public async remove(dto: RemoveObjectDto) {
		const object = await this.get({ objectId: dto.objectId });

		await this.fileHelper.rm(object.path);

		return this.prismaService.object.delete({
			where: {
				id: dto.objectId,
			},
		});
	}

	public async preview(dto: PreviewObjectDto, res: Response) {
		const bucket = await this.bucketService.get({
			name: dto.bucket,
		});
		// TODO implement private access
		// if (!bucket.public && !dto.jwt) throw new UnauthorizedException("Key is empty", "This object requires key");

		const object = await this.get({
			objectId: dto.objectId,
		});
		const fileBuffer = await this.fileHelper.readFile(object.path);
		res.setHeader("Content-Type", object.type);
		return res.send(fileBuffer);
	}
}
