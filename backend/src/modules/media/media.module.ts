import { Module } from "@nestjs/common";

import { MediaContorller } from "./media.controller";
import { MediaService } from "./media.service";

@Module({
	controllers: [MediaContorller],
	providers: [MediaService],
})
export class MediaModule {}
