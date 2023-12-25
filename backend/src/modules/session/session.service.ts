import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "@/modules/prisma/prisma.service";

import type { CreateSessionDto, DeleteSessionDto } from "./dto";

@Injectable()
export class SessionService {
	constructor(private readonly prismaService: PrismaService) {}

	public async create(dto: CreateSessionDto) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: dto.userId,
			},
		});
		if (!user) throw new NotFoundException("User does not exist", "Try to enter another user id");

		return this.prismaService.session.create({
			data: {
				user: {
					connect: {
						id: user.id,
					},
				},
			},
		});
	}

	public async delete(dto: DeleteSessionDto) {
		return this.prismaService.session
			.delete({
				where: {
					id: dto.sessionId,
				},
			})
			.then((session) => {
				if (!session) throw new NotFoundException("Session does not exist");

				return session;
			});
	}
}
