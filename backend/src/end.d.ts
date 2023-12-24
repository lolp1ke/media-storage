declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly BACKEND_PORT: string;
			readonly STORAGE_PATH: string;
		}
	}
}

export {};
