declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly NEXT_PUBLIC_FETCH_PREFIX: string;
			readonly NEXT_PUBLIC_COOKIES_PREFIX: string;
		}
	}
}

export {};
