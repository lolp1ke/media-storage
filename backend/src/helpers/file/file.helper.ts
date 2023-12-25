import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

import { mainConfig } from "@/config/main";

@Injectable()
export class FileHelper {
	public async mkdir(_path: string) {
		await fs.promises.mkdir(path.join(mainConfig.STORAGE_PATH, _path));
	}

	public async rm_rf(_path: string) {
		await fs.promises.rm(path.join(mainConfig.STORAGE_PATH, _path), {
			recursive: true,
			force: true,
		});
	}

	public async write(_path: string, name: string, buffer: Buffer) {
		console.log(await fs.promises.readdir(path.join(mainConfig.STORAGE_PATH, _path)));

		await fs.promises.writeFile(path.join(mainConfig.STORAGE_PATH, _path, name), buffer);
	}

	public async rm(_path: string) {
		await fs.promises.rm(path.join(mainConfig.STORAGE_PATH, _path));
	}

	public async readFile(_path: string) {
		return await fs.promises.readFile(path.join(mainConfig.STORAGE_PATH, _path));
	}
}
