import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { SessionModule } from "@/modules/session/sessionModule";
import { UserModule } from "@/modules/user/user.module";

@Module({
	imports: [SessionModule, UserModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
