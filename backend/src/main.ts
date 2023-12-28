import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { type NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

import { mainConfig } from "./config/main";
import { json, urlencoded } from "body-parser";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
		logger: ["debug", "error", "fatal", "log", "verbose", "warn"],
		cors: false,
	});
	// app.useBodyParser("json", {
	// 	extendent: true,
	// 	limit: "50mb",
	// 	parameterLimit: 50000,
	// });

	app.use(json({ limit: "50mb" }));
	app.use(urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 }));
	app.enableCors({
		origin: true,
	});
	app.setGlobalPrefix("/api/v1");
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(mainConfig.BACKEND_PORT);
}

bootstrap().then(() => {
	Logger.log(`Server is listening on port: ${mainConfig.BACKEND_PORT}`, "Application");
});
