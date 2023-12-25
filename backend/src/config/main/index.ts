export const mainConfig = {
	BACKEND_PORT: Number(process.env.BACKEND_PORT),
	STORAGE_PATH: `${process.cwd()}${process.env.STORAGE_PATH}`,
};
