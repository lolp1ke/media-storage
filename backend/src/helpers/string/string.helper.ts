import { Injectable } from "@nestjs/common";
import { hashSync, compareSync } from "bcrypt";

@Injectable()
export class StringHelper {
	public normzalizer(value: string, replace?: string): string {
		return value.toLowerCase().replace(/ /gm, replace ?? "-");
	}

	public hash(value: string): string {
		return hashSync(value, 12);
	}

	public compare(hash: string, encrypted: string): boolean {
		return compareSync(hash, encrypted);
	}
}
