import { Module } from "@nestjs/common";

import { ObjectService } from "./object.service";
import { ObjectController } from "./object.controller";

import { BucketModule } from "../bucket/bucket.module";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import { HelperModule } from "@/helpers/helper.module";

@Module({
	imports: [BucketModule, PrismaModule, HelperModule],
	controllers: [ObjectController],
	providers: [ObjectService],
})
export class ObjectModule {}
