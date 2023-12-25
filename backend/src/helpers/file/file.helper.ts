import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

import { mainConfig } from "@/config/main";

@Injectable()
export class FileHelper {
	public async mkdir(_path: string) {
		const splittedPath: string[] = _path.split("/");
		let currentPath: string = "";
		let absolutePath: string = "";

		for (const folder of splittedPath) {
			currentPath += "/" + folder;
			absolutePath = path.join(mainConfig.STORAGE_PATH, currentPath);
			if (folder == splittedPath[0]) continue;

			if (!fs.existsSync(absolutePath)) await fs.promises.mkdir(absolutePath);
		}
	}

	public async rm_rf(_path: string) {
		await fs.promises.rm(path.join(mainConfig.STORAGE_PATH, _path), {
			recursive: true,
			force: true,
		});
	}

	public async write(_path: string, name: string, buffer: Buffer) {
		await this.mkdir(_path);

		await fs.promises.writeFile(path.join(mainConfig.STORAGE_PATH, _path, name), buffer);
	}

	public async rm(_path: string) {
		await fs.promises.rm(path.join(mainConfig.STORAGE_PATH, _path));
	}

	public async readFile(_path: string) {
		return await fs.promises.readFile(path.join(mainConfig.STORAGE_PATH, _path));
	}
}
