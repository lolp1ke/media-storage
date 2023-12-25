import { Module } from "@nestjs/common";

import { StringHelper } from "./string/string.helper";
import { FileHelper } from "./file/file.helper";

@Module({
	providers: [StringHelper, FileHelper],
	exports: [StringHelper, FileHelper],
})
export class HelperModule {}
