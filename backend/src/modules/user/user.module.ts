import { Module } from "@nestjs/common";

import { UserService } from "./user.service";

import { PrismaModule } from "@/modules/prisma/prisma.module";
import { HelperModule } from "@/helpers/helper.module";

@Module({
	imports: [PrismaModule, HelperModule],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
