import { Module } from "@nestjs/common";

import { BucketModule } from "@/modules/bucket/bucket.module";
import { FolderModule } from "@/modules/folder/folder.module";
import { ObjectModule } from "@/modules/object/object.module";
import { AuthModule } from "@/modules/auth/auth.module";

@Module({
	imports: [BucketModule, FolderModule, ObjectModule, AuthModule],
})
export class AppModule {}
