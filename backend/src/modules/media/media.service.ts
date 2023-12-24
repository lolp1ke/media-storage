import { Injectable } from "@nestjs/common";
import { type Response } from "express";
import * as path from "path";
import * as fs from "fs";

import { mainConfig } from "@/config/main";

import type { DeleteMediaDto, GetMediaDto, UploadMediaDto } from "./dto";

@Injectable()
export class MediaService {
	private readonly storagePath = `${process.cwd()}${mainConfig.STORAGE_PATH}`;

	public async upload(file: Express.Multer.File, dto: UploadMediaDto) {
		const filePath: string = path.join(
			this.storagePath,
			dto.bucketName,
			dto.path,
			`${dto.fileName}.${file.mimetype.substring(6)}`
		);
		await fs.promises.writeFile(filePath, file.buffer);

		return filePath;
	}

	public async get(dto: GetMediaDto, res: Response) {
		const filePath = path.join(this.storagePath, dto.bucketName, dto.path, dto.fileName);

		try {
			const fileBuffer = await fs.promises.readFile(filePath);
			return res.send(fileBuffer);
		} catch (error) {
			console.log(error);
			const logPath: string = path.join(
				process.cwd(),
				"logs",
				`log-${new Date().toDateString().replace(/ /gm, "-")}.txt`
			);
			await fs.promises.writeFile(logPath, error);

			return res.status(500).send("Internal server error");
		}
	}

	public async delete(dto: DeleteMediaDto) {
		const filePath: string = path.join(this.storagePath, dto.bucketName, dto.path, dto.fileName);
		return fs.promises.unlink(filePath);
	}
}
