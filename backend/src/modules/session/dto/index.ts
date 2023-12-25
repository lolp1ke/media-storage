import { IsNotEmpty } from "class-validator";

export class CreateSessionDto {
	@IsNotEmpty()
	readonly userId: string;
}

export class DeleteSessionDto {
	@IsNotEmpty()
	readonly sessionId: string;
}
