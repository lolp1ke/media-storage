import { Module } from "@nestjs/common";

import { BucketModule } from "@/modules/bucket/bucket.module";
import { ObjectModule } from "@/modules/object/object.module";

@Module({
	imports: [BucketModule, ObjectModule],
})
export class AppModule {}
