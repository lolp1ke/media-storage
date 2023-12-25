import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";

import { PrismaService } from "@/modules/prisma/prisma.service";
import { StringHelper } from "@/helpers/string/string.helper";

import type { CreateUserDto, ValidateUserDto } from "./dto";

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly stringHelper: StringHelper
	) {}

	public async create(dto: CreateUserDto) {
		dto.email = this.stringHelper.normzalizer(dto.email);

		const exist = await this.prismaService.user.findUnique({
			where: {
				email: dto.email,
			},
		});
		if (exist) throw new ConflictException("User already exists", "Try to use another email");

		dto.password = this.stringHelper.hash(dto.password);
		return this.prismaService.user.create({
			data: {
				email: dto.email,
				hash: dto.password,
			},
		});
	}

	public async validate(dto: ValidateUserDto) {
		dto.email = this.stringHelper.normzalizer(dto.email);

		const user = await this.prismaService.user.findUnique({
			where: {
				email: dto.email,
			},
		});

		const comparePassword: boolean = this.stringHelper.compare(dto.password, user.hash);
		if (!comparePassword)
			throw new UnauthorizedException("Unauthorized access", "Incorrect password");

		return user;
	}
}
