import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { mainConfig } from "./config/main";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: true,
	});
	app.setGlobalPrefix("/api/v1");
	await app.listen(mainConfig.BACKEND_PORT);
}
bootstrap();
