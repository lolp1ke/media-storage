import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "@/modules/prisma/prisma.service";

import { StringHelper } from "@/helpers/string/string.helper";
import { FileHelper } from "@/helpers/file/file.helper";

import type { CreateBucketDto, DeleteBucketDto, GetBucketDto } from "./dto";

@Injectable()
export class BucketService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly stringHelper: StringHelper,
		private readonly fileHelper: FileHelper
	) {}

	public async create(dto: CreateBucketDto) {
		dto.name = this.stringHelper.normzalizer(dto.name);

		const exist = await this.prismaService.bucket.findUnique({
			where: {
				name: dto.name,
			},
		});
		if (exist)
			throw new ConflictException("Bucket already exists", "Try to create new one instead");

		await this.fileHelper.mkdir(`/${dto.name}`).catch((error) => {
			Logger.error(error);

			throw new InternalServerErrorException("Failed to create bucket", "Folder already exists");
		});
		return this.prismaService.bucket
			.create({
				data: {
					name: dto.name,
					public: dto.public,
				},
			})
			.catch(async (error) => {
				Logger.error(error);

				await this.fileHelper.rm_rf(dto.name);
				throw new InternalServerErrorException("Failed to create bucket", "Record error");
			});
	}

	public async delete(dto: DeleteBucketDto) {
		dto.name = this.stringHelper.normzalizer(dto.name);

		return this.prismaService.bucket
			.delete({
				where: {
					name: dto.name,
				},
			})
			.then(async () => {
				await this.fileHelper.rm_rf(dto.name);
			})
			.catch((error) => {
				Logger.error(error);

				throw new InternalServerErrorException("Failed to delete bucket", "Record error");
			});
	}

	public async get(dto: GetBucketDto) {
		return this.prismaService.bucket
			.findUnique({
				where: {
					name: dto.name,
				},
				include: {
					objects: true,
				},
			})
			.then((bucket) => {
				if (!bucket) throw new NotFoundException("Bucket not found", "Double check bucket's name");

				return bucket;
			});
	}

	public async getAll() {
		return this.prismaService.bucket.findMany().then((res) => {
			return res;
		});
	}
}
