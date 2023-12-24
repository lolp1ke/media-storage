import { Module } from "@nestjs/common";

import { MediaModule } from "@/modules/media/media.module";

@Module({
	imports: [MediaModule],
})
export class AppModule {}
