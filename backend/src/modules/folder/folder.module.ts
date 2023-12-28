import { Module } from "@nestjs/common";

import { FolderController } from "./folder.controller";
import { FolderService } from "./folder.service";

import { HelperModule } from "@/helpers/helper.module";

@Module({
	imports: [HelperModule],
	controllers: [FolderController],
	providers: [FolderService],
})
export class FolderModule {}
