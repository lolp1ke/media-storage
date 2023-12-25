import { Injectable } from "@nestjs/common";

import { UserService } from "@/modules/user/user.service";
import { SessionService } from "@/modules/session/session.service";

import type { CreateUserDto, ValidateUserDto } from "@/modules/user/dto";
import { DeleteSessionDto } from "../session/dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly sessionService: SessionService
	) {}

	public async signUp(dto: CreateUserDto) {
		const user = await this.userService.create(dto);

		return this.sessionService
			.create({
				userId: user.id,
			})
			.then((session) => {
				return session.id;
			});
	}

	public async signIn(dto: ValidateUserDto) {
		const user = await this.userService.validate(dto);

		return this.sessionService
			.create({
				userId: user.id,
			})
			.then((session) => {
				return session.id;
			});
	}

	public async signOut(dto: DeleteSessionDto) {
		return this.sessionService.delete(dto);
	}
}
