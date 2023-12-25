import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";

import type { CreateUserDto, ValidateUserDto } from "@/modules/user/dto";
import type { DeleteSessionDto } from "@/modules/session/dto";

@Controller("/auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/sign-up")
	@HttpCode(HttpStatus.CREATED)
	public async signUp(@Body() dto: CreateUserDto) {
		return this.authService.signUp(dto);
	}

	@Post("/sign-in")
	@HttpCode(HttpStatus.OK)
	public async signIn(@Body() dto: ValidateUserDto) {
		return this.authService.signIn(dto);
	}

	@Post("/sign-out")
	@HttpCode(HttpStatus.OK)
	public async signOut(@Body() dto: DeleteSessionDto) {
		return this.authService.signOut(dto);
	}
}
