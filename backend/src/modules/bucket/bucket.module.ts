import { Module } from "@nestjs/common";

import { BucketController } from "./bucket.controller";
import { BucketService } from "./bucket.service";

import { PrismaModule } from "@/modules/prisma/prisma.module";
import { HelperModule } from "@/helpers/helper.module";

@Module({
	imports: [PrismaModule, HelperModule],
	controllers: [BucketController],
	providers: [BucketService],
	exports: [BucketService],
})
export class BucketModule {}
