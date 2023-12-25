import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	public async onModuleInit() {
		return this.$connect().then(() => {
			Logger.log("Prisma has been connected", "Prisma");
		});
	}
	public async onModuleDestroy() {
		return this.$disconnect().then(() => {
			Logger.log("Prisma has been disconnected", "Prisma");
		});
	}
}
