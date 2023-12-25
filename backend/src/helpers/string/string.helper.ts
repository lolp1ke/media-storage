import { Injectable } from "@nestjs/common";

@Injectable()
export class StringHelper {
	public normzalizer(value: string, replace?: string): string {
		return value.toLowerCase().replace(/ /gm, replace ?? "-");
	}
}
